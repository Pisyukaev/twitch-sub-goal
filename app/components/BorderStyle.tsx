import { Select } from "@mantine/core"
import { useEffect, useState } from "react"

import { BORDER_STYLES } from "~app/constants"
import { useStylesContext } from "~app/hooks/useStyles"
import type { SelectorProps } from "~app/types"

interface Props {
  selectedStyles: SelectorProps
}

export const BorderStyle = ({
  selectedStyles: { value, label, property, selector }
}: Props) => {
  const { updateStyles } = useStylesContext()
  const [borderStyle, setBorderStyle] = useState(value)

  const handleChange = (newBorderStyle: string) => {
    updateStyles(selector, property, newBorderStyle)
    setBorderStyle(newBorderStyle)
  }

  useEffect(() => {
    setBorderStyle(value)
  }, [value])

  return (
    <Select
      label={label}
      data={BORDER_STYLES}
      defaultValue="solid"
      value={borderStyle}
      onChange={handleChange}
    />
  )
}
