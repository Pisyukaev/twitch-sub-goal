import { ColorInput as ColorPicker, Flex, Select } from "@mantine/core"
import type { ColorInputProps } from "@mantine/core"
import React, { useCallback, useState } from "react"

import { COLOR_FORMATS } from "~app/constants"
import { useStylesContext } from "~app/hooks/useStyles"
import type { SelectorProps } from "~app/types"
import { getColorFormat } from "~app/utils"

type ColorFormat = ColorInputProps["format"]

interface Props {
  selectedStyles: SelectorProps
}

export const ColorInput = ({ selectedStyles }: Props) => {
  const { updateStyles } = useStylesContext()
  const { selector, label, property, value } = selectedStyles
  const [colorFormat, setColorFormat] = useState<ColorFormat>(
    getColorFormat(value)
  )
  const [localColor, setLocalColor] = useState(value)

  const handleChange = useCallback((newColor: string | null) => {
    if (!newColor) {
      return
    }

    updateStyles(selector, property, newColor)
    setLocalColor(newColor)
  }, [])

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
        data={COLOR_FORMATS}
      />
    </Flex>
  )
}
