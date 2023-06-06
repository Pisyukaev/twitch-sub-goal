import { Stack } from "@mantine/core"

import { WidgetProvider } from "~app/context"

import { CopyBtn } from "./CopyBtn"
import { GoalTabs } from "./GoalTabs"
import { Reset } from "./Reset"

export const App = () => {
  return (
    <WidgetProvider>
      <Stack align="stretch" w="100%">
        <GoalTabs />
        <CopyBtn />
        <Reset />
      </Stack>
    </WidgetProvider>
  )
}
