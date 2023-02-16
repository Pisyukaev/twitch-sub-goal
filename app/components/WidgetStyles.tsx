import { ColorPicker } from "@mantine/core"
import React, { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { useUpdateStyles } from "~app/hooks"
import type { SelectorProps } from "~app/types"

interface Props {
  selectedStyles: SelectorProps
}

const WidgetStyles = ({ selectedStyles }: Props) => {
  const { value, color, label, property } = selectedStyles
  const [styles, _, { setRenderValue, setStoreValue }] = useStorage(value)

  const updStyle = useUpdateStyles(value)

  const handleChange = (color: string) => {
    setRenderValue({ ...styles, [property]: color })
  }
  const handleChangeEnd = (color: string) => {
    setStoreValue({ ...styles, [property]: color })
  }

  useEffect(() => {
    updStyle(property, styles?.[property] || color)
  }, [color, updStyle, property])

  return (
    <ColorPicker
      format="rgba"
      hueLabel={label}
      value={styles?.[property] || color}
      onChange={handleChange}
      onChangeEnd={handleChangeEnd}
    />
  )
}

export default WidgetStyles
