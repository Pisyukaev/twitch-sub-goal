import { FONTS_SOURCE_API, SUBSETS, WEIGHTS } from "~app/constants"
import type { Font, FontData, FontList } from "~app/types"
import { prepareFont } from "~app/utils"

export async function fetchFontData(fontFamily: string) {
  let fontData = {} as FontData
  try {
    const response = await fetch(`${FONTS_SOURCE_API}/${fontFamily}`)
    fontData = await response.json()
  } catch (e) {
    console.error("Error fetching font", e)
  } finally {
    return fontData
  }
}

export async function loadFont(fontFamily: string) {
  for (const fontFace of document.fonts.values()) {
    if (fontFace.family === fontFamily) {
      return
    }
  }

  const fontData = await fetchFontData(fontFamily)
  const fontFaces = prepareFont(fontData)

  try {
    await Promise.all(fontFaces.map((fontFace) => fontFace.load()))
  } catch (e) {
    console.error("Error loading fonts in document", e)
  }
}

export async function fetchFontList() {
  let fonts = [] as Font[]

  try {
    const response = await fetch(
      `${FONTS_SOURCE_API}?subsets=${SUBSETS.join(",")}&weights=${WEIGHTS.join(
        ","
      )}`
    )
    const list: FontList = await response.json()

    fonts = list.map(({ id, family }) => ({
      value: id,
      label: family
    }))
  } catch (e) {
    console.warn("Error fetching fonts", e)
  } finally {
    return fonts
  }
}
