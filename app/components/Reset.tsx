import { Button } from "@mantine/core"
import React, { useContext } from "react"

import StylesContext from "~app/context"

const Reset = () => {
  const { resetStyles } = useContext(StylesContext)

  return (
    <Button color="red" onClick={resetStyles}>
      Reset
    </Button>
  )
}

export default Reset
