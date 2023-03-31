import { Button } from "@mantine/core"
import React from "react"

interface Props {
  onClick: () => void
}

const Reset = ({ onClick }: Props) => {
  return (
    <Button color="red" onClick={onClick}>
      Reset
    </Button>
  )
}

export default Reset
