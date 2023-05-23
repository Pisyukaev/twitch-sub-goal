import { ColorInput as ColorPicker, Flex, Select } from "@mantine/core"
import type { ColorInputProps } from "@mantine/core"
import React, { useCallback, useContext, useState } from "react"

import { COLOR_FORMATS } from "~app/constants"
import StylesContext from "~app/context"
import type { SelectorProps } from "~app/types"
import { getColorFormat } from "~app/utils"

type ColorFormat = ColorInputProps["format"]

interface Props {
  selectedStyles: SelectorProps
}

const ColorInput = ({ selectedStyles }: Props) => {
  const { updateStyles } = useContext(StylesContext)
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

export default ColorInput
