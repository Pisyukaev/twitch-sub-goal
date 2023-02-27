import { ColorPicker } from "@mantine/core"
import React from "react"

import { useUpdateStyles } from "~app/hooks"
import type { SelectorProps } from "~app/types"

interface Props {
  selectedStyles: SelectorProps
  handleChangeEnd: (property: string, value: string) => void
}

const WidgetStyles = ({ selectedStyles, handleChangeEnd }: Props) => {
  const { value, color, label, property } = selectedStyles
  const updStyle = useUpdateStyles(value)

  const handleChange = (newColor: string) => updStyle(property, newColor)

  const changeEnd = (newColor: string) => {
    handleChangeEnd(property, newColor)
  }

  return (
    <ColorPicker
      format="rgba"
      hueLabel={label}
      value={color}
      onChange={handleChange}
      onChangeEnd={changeEnd}
    />
  )
}

export default WidgetStyles
