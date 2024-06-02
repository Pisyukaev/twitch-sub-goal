import { createEmotionCache } from "@mantine/core"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost
} from "plasmo"

import { App } from "~app/components/App"
import { DIALOG_CONTENT, GOAL_WIDGET } from "~app/constants"
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
  document.querySelector(GOAL_WIDGET)

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor,
  mountState
}) => {
  if (!anchor.element) {
    mountState.observer.disconnect()
    return
  }

  const dialogContent = document.querySelector(DIALOG_CONTENT)
  if (!dialogContent) {
    console.error(
      "No modal window element was found. Most likely the element class has changed." +
        "Contact support in discord - https://discord.gg/hWR5Y37NaC or " +
        "on github - https://github.com/Pisyukaev/twitch-sub-goal/issues."
    )

    return
  }

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
