import { ColorInput as ColorPicker, Flex, Select } from "@mantine/core"
import type { ColorInputProps } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { COLOR_FORMATS } from "~app/constants"
import { useStylesContext } from "~app/hooks/useStyles"
import type { OptionPops } from "~app/types"
import { getColorFormat } from "~app/utils"

type ColorFormat = ColorInputProps["format"]

interface Props {
  selectedStyles: OptionPops
}

export const ColorInput = ({ selectedStyles }: Props) => {
  const { updateStyles } = useStylesContext()
  const { selector, label, property, value } = selectedStyles
  const [colorFormat, setColorFormat] = useState<ColorFormat>(
    getColorFormat(value)
  )
  const [localColor, setLocalColor] = useState(value)

  const handleChange = (newColor: string | null) => {
    if (!newColor) {
      return
    }

    updateStyles(selector, property, newColor)
    setLocalColor(newColor)
  }

  // Update color format when we reset styles to default
  useEffect(() => {
    setColorFormat(getColorFormat(value))
    setLocalColor(value)
  }, [value])

  return (
    <Flex gap="md">
      <ColorPicker
        format={colorFormat}
        label={label}
        defaultValue={localColor}
        value={localColor}
        onChange={handleChange}
        withinPortal={false}
      />
      <Select
        label="Color format"
        defaultValue={colorFormat}
        value={colorFormat}
        onChange={(value: ColorFormat) => setColorFormat(value)}
        data={COLOR_FORMATS}
      />
    </Flex>
  )
}
