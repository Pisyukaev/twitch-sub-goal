import type { FontData, FontVariant } from "~app/types"

export const getColorFormat = (color: string) => {
  // rgba(0, 0, 0, 0)
  const isRgb = color.startsWith("rgb")
  if (isRgb) {
    return "rgba"
  }

  // hsla(0, 0%, 0%, 0)
  const isHsl = color.startsWith("hsl")
  if (isHsl) {
    return "hsla"
  }

  // #00000000
  return "hexa"
};

export const getMeasureValue = (string: string) => {
  const regExp = /((?:\d*\.)?\d+)(\D+)/
  const [, numberValue, measureValue] = string.match(regExp)

  return {
    numberValue: Number(numberValue) || 0,
    measureValue: measureValue || ""
  }
}

const createFontFace = (fontFamily: string, url: string) => {
  const fontFace = new FontFace(fontFamily, `url(${url})`)
  document.fonts.add(fontFace)

  return fontFace
}

export const getFontStyle = (fontVariant: FontVariant["400"]) => {
  const style = Object.keys(fontVariant).includes("normal")
    ? "normal"
    : "italic"

  return style
}

export const getFontSubsetWithUrls = (fontData: FontData) => {
  const fontVariant = fontData.variants["400"]
  const style = getFontStyle(fontVariant)
  const subsets = Object.entries(fontVariant[style])

  return subsets
}

/**
 * Creates FontFace objects
 * @param font - Font data from Fontsource API
 * @returns Array of FontFace objects
 */
export const prepareFont = (font: FontData) => {
  const subsets = getFontSubsetWithUrls(font)
  const fontFaces = subsets.map(([, subsetUrls]) =>
    createFontFace(font.family, subsetUrls.url.woff2)
  )

  return fontFaces
}

/**
 * Creates CSS strings for @font-face rules
 * @param fontData - Font data from Fontsource API
 * @returns Array of CSS strings
 * @example createFontFacesCSS(fontData)
 * // [
 * //   "@font-face {
 * //     font-family: 'Inter';
 * //     font-style: normal;
 * //     font-weight: 400;
 * //     src: url(https://fonts.gstatic.com/../qwer.woff2) format('woff2');
 * //     unicode-range: U+0000-00FF, U+0131, ...;
 * //   }",
 * // ]
 *
 */
export const createFontFacesCSS = (fontData: FontData): string[] => {
  const fontVariant = fontData.variants["400"]
  const style = getFontStyle(fontVariant)
  const subsets = getFontSubsetWithUrls(fontData)

  const fontFaces = subsets.map(
    ([
      subset,
      {
        url: { woff2 }
      }
    ]) => `@font-face {
      font-family: '${fontData.family}';
      font-style: ${style};
      font-weight: 400;
      src: url(${woff2}) format('woff2');
      unicode-range: ${fontData.unicodeRange[subset]};
    }
    `
  )

  return fontFaces
}
