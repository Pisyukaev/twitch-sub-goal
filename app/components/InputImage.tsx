import { Input } from "@mantine/core"
import React from "react"
import type { ChangeEvent } from "react"

import { GW_IMAGE } from "~app/constants"
import { useStyles } from "~app/hooks"

const InputImage = () => {
  const { styles, updateStyle } = useStyles()
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateStyle(GW_IMAGE, "content", `url(${value})`)

  const src = styles[GW_IMAGE]["content"].replaceAll(/url\(|\)/g, "")

  return (
    <Input.Wrapper label="Image link">
      <Input value={src} onChange={handleChange} />
    </Input.Wrapper>
  )
}

export default InputImage
