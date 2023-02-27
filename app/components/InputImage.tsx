import { Input } from "@mantine/core"
import React from "react"
import type { ChangeEvent } from "react"

const InputImage = ({ onChange, imgData }) => {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange("background-image", `url(${value})`)

  return (
    <Input.Wrapper label="Image link">
      <Input value={imgData["background-image"]} onChange={handleChange} />
    </Input.Wrapper>
  )
}

export default InputImage
