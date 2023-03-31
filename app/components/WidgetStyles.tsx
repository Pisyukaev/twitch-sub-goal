import { ColorInput, ColorPicker } from "@mantine/core"
import React, { useEffect, useState } from "react"

import type { SelectorProps, UpdateStylesFn } from "~app/types"

const DisabledIcon = () => null

interface Props {
  selectedStyles: SelectorProps
  onUpdate: UpdateStylesFn
}

const WidgetStyles = ({ selectedStyles, onUpdate }: Props) => {
  const { selector, label, property, value } = selectedStyles

  const [localColor, setLocalColor] = useState(value)

  const handleChange = (newColor: string | null) => {
    if (!newColor) {
      return
    }

    onUpdate(selector, property, newColor)
    setLocalColor(newColor)
  }

  useEffect(() => {
    setLocalColor(value)
  }, [value])

  return (
    <>
      <ColorPicker
        format="rgba"
        hueLabel={label}
        value={localColor}
        onChange={handleChange}
      />
      <ColorInput
        format="rgba"
        value={localColor}
        onChange={handleChange}
        rightSection={<DisabledIcon />}
        withPicker={false}
        withPreview={false}
      />
    </>
  )
}

export default WidgetStyles
