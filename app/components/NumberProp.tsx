import { NumberInput } from "@mantine/core"
import React, { useState } from "react"

import type { SelectorProps, UpdateStylesFn } from "~app/types"
import { getMeasureValue } from "~app/utils"

interface Props {
  selectedStyles: SelectorProps
  onUpdate: UpdateStylesFn
}

function NumberProp({ selectedStyles, onUpdate }: Props) {
  const { value, label, property, selector } = selectedStyles
  const { numberValue, measureValue } = getMeasureValue(value)
  const [number, setNumber] = useState(numberValue)

  const handleChange = (newNumber: number) => {
    onUpdate(selector, property, `${newNumber}${measureValue}`)

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
