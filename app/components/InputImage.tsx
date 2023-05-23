import { Input } from "@mantine/core"
import React, { useContext } from "react"
import type { ChangeEvent } from "react"

import StylesContext from "~app/context"
import type { SelectorProps } from "~app/types"

interface Props {
  selectedStyles: SelectorProps
}

const InputImage = ({ selectedStyles }: Props) => {
  const { updateStyles } = useContext(StylesContext)
  const { value, selector, property } = selectedStyles

  const handleChange = ({
    target: { value: imgSrc }
  }: ChangeEvent<HTMLInputElement>) =>
    updateStyles(selector, property, `url(${imgSrc})`)

  const src = value.replaceAll(/url\(|\)/g, "")

  return (
    <Input.Wrapper label="Image link">
      <Input value={src} onChange={handleChange} />
    </Input.Wrapper>
  )
}

export default InputImage
