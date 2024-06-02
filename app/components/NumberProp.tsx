import { NumberInput } from "@mantine/core"

import { useStylesContext } from "~app/hooks/useStyles"
import type { OptionPops } from "~app/types"
import { getMeasureValue } from "~app/utils"

interface Props {
  selectedStyles: OptionPops
}

export const NumberProp = ({
  selectedStyles: { value, label, property, selector }
}: Props) => {
  const { updateStyles } = useStylesContext()
  const { numberValue, measureValue } = getMeasureValue(value)

  const handleChange = (newNumber?: number) => {
    if (!newNumber) {
      return
    }

    updateStyles(selector, property, `${newNumber}${measureValue}`)
  }

  return (
    <NumberInput
      defaultValue={numberValue}
      value={numberValue}
      placeholder={label}
      label={label}
      onChange={handleChange}
      min={0}
    />
  )
}
