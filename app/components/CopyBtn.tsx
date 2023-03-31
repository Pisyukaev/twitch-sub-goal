import { Button, CopyButton } from "@mantine/core"
import cssBeauty from "cssbeautify"
import React from "react"

import type { StylesData } from "~app/types"

interface Props {
  styles: StylesData
}

const CopyBtn = ({ styles }: Props) => {
  const cssText = Object.entries(styles).reduce((accum, [selector, st]) => {
    const stylesText = Object.entries(st).reduce((ac, [property, value]) => {
      ac.push(`${property}: ${value} !important`)
      return ac
    }, [])

    accum.push(`${selector} {${stylesText.join(";")}}`)
    return accum
  }, [])

  return (
    <CopyButton value={cssBeauty(cssText.join(" "))}>
      {({ copied, copy }) => (
        <Button color={copied ? "teal" : "blue"} onClick={copy}>
          {copied ? "Copied CSS" : "Copy CSS"}
        </Button>
      )}
    </CopyButton>
  )
}

export default CopyBtn
