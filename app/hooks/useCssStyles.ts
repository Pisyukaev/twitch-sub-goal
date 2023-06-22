import cssBeauty from "cssbeautify"
import { useContext } from "react"

import { fontContext, stylesContext } from "~app/context"

export const useCssStyles = () => {
  const { styles } = useContext(stylesContext)
  const { selectedFont } = useContext(fontContext)

  const fontsCss = selectedFont
    ? Object.values(selectedFont)
        .flatMap(({ fontFaces }) => fontFaces)
        .filter(Boolean)
        .join("\n")
    : ""

  const cssText = Object.entries(styles).reduce<string[]>(
    (accum, [selector, st]) => {
      const stylesText = Object.entries(st).reduce<string[]>(
        (ac, [property, value]) => {
          ac.push(`${property}: ${value} !important`)
          return ac
        },
        []
      )

      accum.push(`${selector} {${stylesText.join(";")}}`)
      return accum
    },
    []
  )

  const cssTextString = cssBeauty(fontsCss.concat(cssText.join(" ")))

  return cssTextString
}
