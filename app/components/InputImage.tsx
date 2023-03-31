import { Input } from "@mantine/core"
import React from "react"
import type { ChangeEvent } from "react"

import type { SelectorProps, UpdateStylesFn } from "~app/types"

interface Props {
  selectedStyles: SelectorProps
  onUpdate: UpdateStylesFn
}

const InputImage = ({ selectedStyles, onUpdate }: Props) => {
  const { value, selector, property } = selectedStyles

  const handleChange = ({
    target: { value: imgSrc }
  }: ChangeEvent<HTMLInputElement>) =>
    onUpdate(selector, property, `url(${imgSrc})`)

  const src = value.replaceAll(/url\(|\)/g, "")

  return (
    <Input.Wrapper label="Image link">
      <Input value={src} onChange={handleChange} />
    </Input.Wrapper>
  )
}

export default InputImage
