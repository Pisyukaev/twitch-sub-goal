import {
  ColorSwatch,
  Group,
  Select,
  Stack,
  Text,
  createEmotionCache
} from "@mantine/core"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost
} from "plasmo"
import { forwardRef, useState } from "react"

import CopyBtn from "~app/components/CopyBtn"
import InputImage from "~app/components/InputImage"
import Reset from "~app/components/Reset"
import WidgetStyles from "~app/components/WidgetStyles"
import { DIALOG_CONTENT, WIDGET_LINK } from "~app/constants"
import { useData } from "~app/hooks"
import { ThemeProvider } from "~theme"

export const config: PlasmoCSConfig = {
  matches: ["https://dashboard.twitch.tv/*"]
}

const styleElement = document.createElement("style")

const styleCache = createEmotionCache({
  key: "plasmo-mantine-cache",
  prepend: true,
  container: styleElement,
  speedy: false
})

export const getStyle = () => styleElement

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(WIDGET_LINK)

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor,
  observer
}) => {
  if (!anchor.element) {
    observer.disconnect()

    return
  }

  const dialogContent = document.querySelector(DIALOG_CONTENT)

  dialogContent.appendChild(shadowHost)
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
      <Stack align="stretch" w="100%">
        <Select
          data={selectorsData}
          itemComponent={SelectItem}
          onChange={selectChange}
          value={selectorsData[selectedId].value}
        />
        <WidgetStyles selectedStyles={selectorsData[selectedId]} />
        <InputImage />
        <CopyBtn />
        <Reset />
      </Stack>
    </ThemeProvider>
  )
}

export default PlasmoInline
