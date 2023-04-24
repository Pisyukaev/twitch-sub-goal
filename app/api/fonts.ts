import { FONTS_SOURCE_API, SUBSETS, WEIGHTS } from "~app/constants"
import type { Font, FontData, FontList } from "~app/types"
import { prepareFont } from "~app/utils"

export async function fetchFontData(
  fontFamily: string,
  signal?: AbortSignal
): Promise<FontData> | undefined {
  try {
    const url = new URL(`${FONTS_SOURCE_API}/${fontFamily}`)
    const response = await fetch(url, { signal })

    return await response.json()
  } catch (e) {
    console.error("Error fetching font", e)

    return
  }
}

export async function loadFont(font: Font, signal?: AbortSignal) {
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
  } catch (e) {
    console.error("Error loading font", e)

    return
  }
}

export async function fetchFontList(signal?: AbortSignal) {
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
  } catch (e) {
    console.warn("Error fetching fonts", e)
  } finally {
    return fonts
  }
}
