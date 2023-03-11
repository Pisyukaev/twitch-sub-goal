import { Button } from "@mantine/core"
import React from "react"

import { useStyles } from "~app/hooks"

const Reset = () => {
  const { resetStyles } = useStyles()

  return (
    <Button color="red" onClick={resetStyles}>
      Reset
    </Button>
  )
}

export default Reset
