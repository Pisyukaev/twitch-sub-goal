import { Button, CopyButton } from "@mantine/core"
import cssBeauty from "cssbeautify"
import React, { useEffect, useState } from "react"

import { useFontsContext } from "~app/hooks/useFonts"
import { useStylesContext } from "~app/hooks/useStyles"

export const CopyBtn = () => {
  const { selectedFont } = useFontsContext()
  const { styles } = useStylesContext()

  const [fontsCss, setFontsCss] = useState<string>("")

  useEffect(() => {
    if (!selectedFont) {
      return
    }

    const fontToCss = Object.values(selectedFont)
      .flatMap(({ fontFaces }) => fontFaces)
      .filter(Boolean)
      .join("\n")

    setFontsCss(fontToCss)
  }, [selectedFont])

  const cssText = Object.entries(styles).reduce((accum, [selector, st]) => {
    const stylesText = Object.entries(st).reduce((ac, [property, value]) => {
      ac.push(`${property}: ${value} !important`)
      return ac
    }, [])

    accum.push(`${selector} {${stylesText.join(";")}}`)
    return accum
  }, [])

  return (
    <CopyButton value={cssBeauty(fontsCss.concat(cssText.join(" ")))}>
      {({ copied, copy }) => (
        <Button color={copied ? "teal" : "blue"} onClick={copy}>
          {copied ? "Copied CSS" : "Copy CSS"}
        </Button>
      )}
    </CopyButton>
  )
}
