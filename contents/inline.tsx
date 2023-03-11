import {
  ColorSwatch,
  Group,
  Select,
  Stack,
  Text,
  createEmotionCache
} from "@mantine/core"
import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo"
import { forwardRef, useState } from "react"

import CopyBtn from "~app/components/CopyBtn"
import InputImage from "~app/components/InputImage"
import WidgetStyles from "~app/components/WidgetStyles"
import { DIALOG_CONTENT, GOAL_WIDGET } from "~app/constants"
import { useData } from "~app/hooks"
import { ThemeProvider } from "~theme"

export const config: PlasmoContentScript = {
  matches: ["https://dashboard.twitch.tv/u/*/stream-manager"]
}

const styleElement = document.createElement("style")

const styleCache = createEmotionCache({
  key: "plasmo-mantine-cache",
  prepend: true,
  container: styleElement
})

export const getStyle = () => styleElement

export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  const twitchSubGoal = document.querySelector(GOAL_WIDGET)

  if (!twitchSubGoal) {
    return
  }

  return document.querySelector(DIALOG_CONTENT)
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  color: string
  label: string
  value: string
  property: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ color, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ColorSwatch color={color} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
)

function PlasmoInline() {
  const selectorsData = useData()
  const [selectedId, setSelectedId] = useState(0)

  const selectChange = (value: string) => {
    const findSelectedId = selectorsData.findIndex(
      (item) => item.value === value
    )
    setSelectedId(findSelectedId)
  }

  return (
    <ThemeProvider emotionCache={styleCache}>
      <Stack align="stretch" w="100%" p="lg">
        <Select
          data={selectorsData}
          itemComponent={SelectItem}
          onChange={selectChange}
          value={selectorsData[selectedId].value}
        />
        <WidgetStyles selectedStyles={selectorsData[selectedId]} />
        <InputImage />
        <CopyBtn />
      </Stack>
    </ThemeProvider>
  )
}

export default PlasmoInline
