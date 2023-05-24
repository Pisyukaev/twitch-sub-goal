import { Button } from "@mantine/core"

import { useStylesContext } from "~app/hooks/useStyles"

export const Reset = () => {
  const { resetStyles } = useStylesContext()

  return (
    <Button color="red" onClick={resetStyles}>
      Reset
    </Button>
  )
}
