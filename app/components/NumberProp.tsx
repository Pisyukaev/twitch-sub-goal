import { NumberInput } from "@mantine/core"
import React, { useContext, useState } from "react"

import StylesContext from "~app/context"
import type { SelectorProps } from "~app/types"
import { getMeasureValue } from "~app/utils"

interface Props {
  selectedStyles: SelectorProps
}

function NumberProp({ selectedStyles }: Props) {
  const { updateStyles } = useContext(StylesContext)
  const { value, label, property, selector } = selectedStyles
  const { numberValue, measureValue } = getMeasureValue(value)
  const [number, setNumber] = useState(numberValue)

  const handleChange = (newNumber: number) => {
    updateStyles(selector, property, `${newNumber}${measureValue}`)

    setNumber(newNumber)
  }

  return (
    <NumberInput
      defaultValue={number}
      value={number}
      placeholder={label}
      label={label}
      onChange={handleChange}
      min={0}
    />
  )
}

export default NumberProp
