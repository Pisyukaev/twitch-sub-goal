import { Button, CopyButton } from "@mantine/core"
import React from "react"

import { useCssStyles } from "~app/hooks/useCssStyles"

export const CopyBtn = () => {
  const cssStyles = useCssStyles()

  return (
    <CopyButton value={cssStyles}>
      {({ copied, copy }) => (
        <Button color={copied ? "teal" : "blue"} onClick={copy}>
          {copied ? "Copied CSS" : "Copy CSS"}
        </Button>
      )}
    </CopyButton>
  )
}
