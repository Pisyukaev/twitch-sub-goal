import { ColorInput as ColorPicker, Flex, Select } from "@mantine/core"
import React, { useCallback, useEffect, useState } from "react"

import type { ColorInputProps } from "@mantine/core"
import type { SelectorProps, UpdateStylesFn } from "~app/types"

type ColorFormat = ColorInputProps['format']

interface Props {
  selectedStyles: SelectorProps
  onUpdate: UpdateStylesFn
}

const ColorInput = ({ selectedStyles, onUpdate }: Props) => {
  const { selector, label, property, value } = selectedStyles

  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex')
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
    <Flex gap="md">
      <ColorPicker
        format={colorFormat}
        label={label}
        value={localColor}
        onChange={handleChange}
        withinPortal={false}
      />
      <Select
        label="Color format"
        defaultValue={colorFormat}
        onChange={(value: ColorFormat) => setColorFormat(value)}
        data={[
          { value: 'hex', label: 'HEX' },
          { value: 'hexa', label: 'HEXA' },
          { value: 'rgb', label: 'RGB' },
          { value: 'rgba', label: 'RGBA' },
          { value: 'hsl', label: 'HSL' },
          { value: 'hsla', label: 'HSLA' }
        ]}
      />
    </Flex>
  )
}

export default ColorInput
