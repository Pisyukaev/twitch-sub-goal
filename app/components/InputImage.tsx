import { Input } from "@mantine/core"
import type { ChangeEvent } from "react"

import { useStylesContext } from "~app/hooks/useStyles"
import type { SelectorProps } from "~app/types"

interface Props {
  selectedStyles: SelectorProps
}

export const InputImage = ({ selectedStyles }: Props) => {
  const { updateStyles } = useStylesContext()
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
