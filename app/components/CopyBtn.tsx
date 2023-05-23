import { Button, CopyButton } from "@mantine/core"
import cssBeauty from "cssbeautify"
import React, { useContext, useEffect, useState } from "react"

import StylesContext from "~app/context"
import useFonts from "~app/hooks/useFonts"

const CopyBtn = () => {
  const { selectedFont } = useFonts()
  const { styles } = useContext(StylesContext)

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

export default CopyBtn
