import { createEmotionCache } from "@mantine/core"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost
} from "plasmo"

import { App } from "~app/components/App"
import { DIALOG_CONTENT, WIDGET_LINK } from "~app/constants"
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

const PlasmoInline = () => {
  return (
    <ThemeProvider emotionCache={styleCache}>
      <App />
    </ThemeProvider>
  )
}

export default PlasmoInline
