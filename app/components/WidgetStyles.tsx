import { ColorInput } from "@mantine/core"
import React, { useCallback, useEffect, useState } from "react"

import type { SelectorProps, UpdateStylesFn } from "~app/types"

interface Props {
  selectedStyles: SelectorProps
  onUpdate: UpdateStylesFn
}

const WidgetStyles = ({ selectedStyles, onUpdate }: Props) => {
  const { selector, label, property, value } = selectedStyles

  const [localColor, setLocalColor] = useState(value)

  const handleChange = useCallback((newColor: string | null) => {
    if (!newColor) return
    onUpdate(selector, property, newColor)
    setLocalColor(newColor)
  }, [])

  useEffect(() => {
    setLocalColor(value)
  }, [value])

  return (
    <ColorInput
      /**
       * TOOD: Add select color format
       * @see https://mantine.dev/core/color-input/#formats
       */
      format="rgba"
      label={label}
      value={localColor}
      onChange={handleChange}
      withinPortal={false}
    />
  )
}

export default WidgetStyles
