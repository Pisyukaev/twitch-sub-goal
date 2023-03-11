import { ColorInput, ColorPicker } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { useStyles } from "~app/hooks"
import type { SelectorProps } from "~app/types"

const DisabledIcon = () => null

interface Props {
  selectedStyles: SelectorProps
}

const WidgetStyles = ({ selectedStyles }: Props) => {
  const { updElementStyles, updateStyle } = useStyles()
  const { value, label, property, color } = selectedStyles

  const [localColor, setLocalColor] = useState(color)

  const handleChange = (newColor: string | null) => {
    if (!newColor) {
      return
    }

    updElementStyles(value, property, newColor)
    setLocalColor(newColor)
  }

  const changeEnd = (newColor: string | null) => {
    if (!newColor) {
      return
    }

    updateStyle(value, property, newColor)
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
