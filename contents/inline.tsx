import {
  Button,
  ColorPicker,
  ColorSwatch,
  CopyButton,
  Group,
  Input,
  Select,
  Stack,
  Text,
  createEmotionCache
} from "@mantine/core"
import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo"
import { forwardRef, useMemo, useState } from "react"

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
import { ThemeProvider } from "~theme"

export const config: PlasmoContentScript = {
  matches: [
    "https://dashboard.twitch.tv/u/*/stream-manager"
    // "https://example.com/"
  ]
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
  const styles = useStyles()
  const data = useMemo(
    () => [
      {
        value: GOAL_WIDGET,
        label: "Goal widget background",
        color: styles[GOAL_WIDGET].backgroundColor,
        property: "backgroundColor"
      },
      {
        value: GW_PROGRESS_BAR,
        label: "Progress bar",
        color: styles[GW_PROGRESS_BAR].backgroundColor,
        property: "backgroundColor"
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
  const [imgSrc, setImgSrc] = useState(styles[GW_IMAGE])
  const [currItem, setCurrItem] = useState(data[0])

  const selectChange = (value: string) =>
    setCurrItem(data.find((item) => item.value === value))

  return (
    <ThemeProvider emotionCache={styleCache}>
      <Stack miw={240} p="lg">
        <Select
          data={data}
          itemComponent={SelectItem}
          onChange={selectChange}
          value={currItem.value}
        />
        <WidgetStyles
          selector={currItem.value}
          property={currItem.property}
          color={currItem.color}
        />

        <Input.Wrapper label="Image link">
          <Input value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} />
        </Input.Wrapper>
        <CopyButton value="css of the twitch sub goal">
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              {copied ? "Copied CSS" : "Copy CSS"}
            </Button>
          )}
        </CopyButton>
      </Stack>
    </ThemeProvider>
  )
}

export default PlasmoInline
