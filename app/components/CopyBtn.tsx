import { Button, CopyButton } from "@mantine/core"
import cssBeauty from "cssbeautify"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

const CopyBtn = () => {
  const [css] = useStorage("subGoalStyles", (value) => value || {})

  const cssText = Object.entries(css).reduce((accum, [selector, styles]) => {
    const stylesText = Object.entries(styles).reduce(
      (ac, [property, value]) => {
        ac.push(`${property}: ${value} !important`)
        return ac
      },
      []
    )

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
