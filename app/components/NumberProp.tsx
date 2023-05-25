import { NumberInput } from "@mantine/core"
import { useEffect, useState } from "react"

import { useStylesContext } from "~app/hooks/useStyles"
import type { SelectorProps } from "~app/types"
import { getMeasureValue } from "~app/utils"

interface Props {
  selectedStyles: SelectorProps
}

export const NumberProp = ({
  selectedStyles: { value, label, property, selector }
}: Props) => {
  const { updateStyles } = useStylesContext()
  const { numberValue, measureValue } = getMeasureValue(value)
  const [number, setNumber] = useState(numberValue)

  const handleChange = (newNumber: number) => {
    updateStyles(selector, property, `${newNumber}${measureValue}`)
    setNumber(newNumber)
  }

  useEffect(() => {
    const { numberValue } = getMeasureValue(value)

    setNumber(numberValue)
  }, [value])

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
