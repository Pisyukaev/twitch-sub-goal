import {
  ColorSwatch,
  Group,
  Select,
  Stack,
  Text,
  createEmotionCache
} from "@mantine/core"
import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo"
import { forwardRef, useMemo, useState } from "react"

import CopyBtn from "~app/components/CopyBtn"
import InputImage from "~app/components/InputImage"
import WidgetStyles from "~app/components/WidgetStyles"
import {
  DIALOG_CONTENT,
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  LEFT_TEXT,
  RIGHT_TEXT
} from "~app/constants"
import { useStyles } from "~app/hooks"
import type { SelectorProps } from "~app/types"
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
  const { styles, setStyles } = useStyles()
  const selectorsData = useMemo<SelectorProps[]>(
    () => [
      {
        value: GOAL_WIDGET,
        label: "Goal widget background",
        color: styles[GOAL_WIDGET]["background-color"],
        property: "background-color"
      },
      {
        value: GW_PROGRESS_BAR,
        label: "Progress bar",
        color: styles[GW_PROGRESS_BAR]["background-color"],
        property: "background-color"
      },
      {
        value: LEFT_TEXT,
        label: "Left text",
        color: styles[LEFT_TEXT].color,
        property: "color"
      },
      {
        value: RIGHT_TEXT,
        label: "Right text",
        color: styles[RIGHT_TEXT].color,
        property: "color"
      }
    ],
    [styles]
  )
  const [selectedId, setSelectedId] = useState(0)

  const selectChange = (value: string) => {
    const findSelectedId = selectorsData.findIndex(
      (item) => item.value === value
    )
    setSelectedId(findSelectedId)
  }

  const imgData = styles[GW_IMAGE]

  const handleChangeImg = setStyles(GW_IMAGE)
  const handleChange = setStyles(selectorsData[selectedId].value)

  return (
    <ThemeProvider emotionCache={styleCache}>
      <Stack align="stretch" w="100%" p="lg">
        <Select
          data={selectorsData}
          itemComponent={SelectItem}
          onChange={selectChange}
          value={selectorsData[selectedId].value}
        />
        <WidgetStyles
          selectedStyles={selectorsData[selectedId]}
          handleChangeEnd={handleChange}
        />
        <InputImage imgData={imgData} onChange={handleChangeImg} />
        <CopyBtn />
      </Stack>
    </ThemeProvider>
  )
}

export default PlasmoInline
