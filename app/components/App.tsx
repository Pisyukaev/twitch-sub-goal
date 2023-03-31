import { Stack } from "@mantine/core"
import React from "react"

import { useData, useStyles } from "~app/hooks"

import CopyBtn from "./CopyBtn"
import GoalTabs from "./GoalTabs"
import Reset from "./Reset"

const App = () => {
  const { styles, updateStyles, resetStyles } = useStyles()
  const data = useData()

  return (
    <Stack align="stretch" w="100%">
      <GoalTabs onUpdate={updateStyles} data={data} />
      <CopyBtn styles={styles} />
      <Reset onClick={resetStyles} />
    </Stack>
  )
}

export default App
