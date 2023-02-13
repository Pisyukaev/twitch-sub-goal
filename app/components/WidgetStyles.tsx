import { ColorPicker } from "@mantine/core"
import React, { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { useUpdateStyles } from "~app/hooks"

interface Props {
  selector: string
  property: "color" | "backgroundColor"
  color: string
}

const WidgetStyles = ({ selector, property, color }: Props) => {
  const [styles, _, { setRenderValue, setStoreValue }] = useStorage(selector)

  const updStyle = useUpdateStyles(selector)

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
      value={styles?.[property] || color}
      onChange={handleChange}
      onChangeEnd={handleChangeEnd}
    />
  )
}

export default WidgetStyles
