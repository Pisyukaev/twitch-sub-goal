import { Stack } from "@mantine/core"

import { StylesProvider } from "~app/context"
import { useData } from "~app/hooks/useData"
import { useStyles } from "~app/hooks/useStyles"

import { CopyBtn } from "./CopyBtn"
import { GoalTabs } from "./GoalTabs"
import { Reset } from "./Reset"

export const App = () => {
  const { styles, updateStyles, resetStyles } = useStyles()
  const data = useData()

  if (!styles) {
    return null
  }

  return (
    <StylesProvider value={{ styles, updateStyles, resetStyles }}>
      <Stack align="stretch" w="100%">
        <GoalTabs data={data} />
        <CopyBtn />
        <Reset />
      </Stack>
    </StylesProvider>
  )
}
