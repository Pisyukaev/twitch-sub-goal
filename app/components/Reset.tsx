import { Button } from "@mantine/core"

import { useFontsContext } from "~app/hooks/useFonts"
import { useStylesContext } from "~app/hooks/useStyles"

export const Reset = () => {
  const { resetStyles } = useStylesContext()
  const { resetSelectedFont } = useFontsContext()

  const handleReset = () => {
    resetStyles()
    resetSelectedFont()
  }

  return (
    <Button color="red" onClick={handleReset}>
      Reset
    </Button>
  )
}
