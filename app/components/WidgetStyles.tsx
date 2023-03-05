import { ColorInput, ColorPicker } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { useUpdateStyles } from "~app/hooks"
import type { SelectorProps } from "~app/types"

const DisabledIcon = () => null

interface Props {
  selectedStyles: SelectorProps
  handleChangeEnd: (property: string, value: string) => void
}

const WidgetStyles = ({ selectedStyles, handleChangeEnd }: Props) => {
  const { value, color, label, property } = selectedStyles

  const updStyle = useUpdateStyles(value)
  const [localColor, setLocalColor] = useState(color)

  const handleChange = (newColor: string) => {
    updStyle(property, newColor)
    setLocalColor(newColor)
  }

  const changeEnd = (newColor: string) => {
    handleChangeEnd(property, newColor)
  }

  useEffect(() => {
    setLocalColor(color)
  }, [color])

  return (
    <>
      <ColorPicker
        format="rgba"
        hueLabel={label}
        value={localColor}
        onChange={handleChange}
        onChangeEnd={changeEnd}
      />
      <ColorInput
        format="rgba"
        value={localColor}
        onChange={handleChange}
        onChangeEnd={changeEnd}
        rightSection={<DisabledIcon />}
        withPicker={false}
        withPreview={false}
      />
    </>
  )
}

export default WidgetStyles
