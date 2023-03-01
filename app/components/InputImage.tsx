import { Input } from "@mantine/core"
import React from "react"
import type { ChangeEvent } from "react"

interface Props {
  onChange: (cssProp: string, val: string) => void
  imgData: { content: string }
}

const InputImage = ({ onChange, imgData }: Props) => {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange("content", `url(${value})`)

  const src = imgData["content"].replaceAll(/url\(|\)/g, "")

  return (
    <Input.Wrapper label="Image link">
      <Input value={src} onChange={handleChange} />
    </Input.Wrapper>
  )
}

export default InputImage
