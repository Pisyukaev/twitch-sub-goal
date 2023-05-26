import { FONTS_SOURCE_API, SUBSETS, WEIGHTS } from "~app/constants"
import type { Font, FontData, FontList } from "~app/types"
import { prepareFont } from "~app/utils"

export const fetchFontData = async (
  fontFamily: string,
  signal?: AbortSignal
): Promise<FontData | undefined> => {
  try {
    const url = new URL(`${FONTS_SOURCE_API}/${fontFamily}`)
    const response = await fetch(url, { signal })

    return await response.json()
  } catch (err) {
    console.error("Error fetching font", err)
  }
}

export const loadFont = async (
  font: Font,
  signal?: AbortSignal
): Promise<FontData | undefined> => {
  for (const fontFace of document.fonts.values()) {
    if (fontFace.family === font.label) {
      return
    }
  }

  try {
    const fontData = await fetchFontData(font.value, signal)

    if (!fontData) {
      return
    }

    const fontFaces = prepareFont(fontData)

    await Promise.all(fontFaces.map((fontFace) => fontFace.load()))

    return fontData
  } catch (err) {
    console.error("Error loading font", err)
  }
}

export const fetchFontList = async (signal?: AbortSignal) => {
  const fonts: Font[] = []

  try {
    const url = new URL(FONTS_SOURCE_API)
    url.searchParams.append("subsets", SUBSETS.join(","))
    url.searchParams.append("weights", WEIGHTS.join(","))

    const response = await fetch(url, { signal })
    const list: FontList = await response.json()

    fonts.push(
      ...list.map<Font>(({ id, family }) => ({
        value: id,
        label: family
      }))
    )
  } catch (err) {
    console.warn("Error fetching fonts", err)
  } finally {
    return fonts
  }
}
