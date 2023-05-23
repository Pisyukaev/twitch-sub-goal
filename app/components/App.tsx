import { Stack } from "@mantine/core"
import React from "react"

import StylesContext from "~app/context"
import useData from "~app/hooks/useData"
import useStyles from "~app/hooks/useStyles"

import CopyBtn from "./CopyBtn"
import GoalTabs from "./GoalTabs"
import Reset from "./Reset"

const App = () => {
  const { styles, updateStyles, resetStyles } = useStyles()
  const data = useData()

  if (!styles) {
    return null
  }

  return (
    <StylesContext.Provider value={{ styles, updateStyles, resetStyles }}>
      <Stack align="stretch" w="100%">
        <GoalTabs data={data} />
        <CopyBtn />
        <Reset />
      </Stack>
    </StylesContext.Provider>
  )
}

export default App
