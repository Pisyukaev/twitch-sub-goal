import { useRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  LEFT_TEXT,
  RIGHT_TEXT
} from "./constants"

export const useElements = () => {
  const widgetBody = useRef(document.querySelector<HTMLDivElement>(GOAL_WIDGET))
  const image = useRef(document.querySelector<HTMLImageElement>(GW_IMAGE))
  const leftText = useRef(document.querySelector<HTMLDivElement>(LEFT_TEXT))
  const rightText = useRef(document.querySelector<HTMLDivElement>(RIGHT_TEXT))
  const progressBar = useRef(
    document.querySelector<HTMLDivElement>(GW_PROGRESS_BAR)
  )

  return {
    widgetBody: widgetBody.current,
    image: image.current,
    leftText: leftText.current,
    rightText: rightText.current,
    progressBar: progressBar.current
  }
}

export const useDefaultStyles = () => {
  const { leftText, progressBar, rightText, widgetBody, image } = useElements()

  return {
    [GOAL_WIDGET]: { "background-color": widgetBody.style.backgroundColor },
    [GW_PROGRESS_BAR]: {
      "background-color": progressBar.style.backgroundColor
    },
    [LEFT_TEXT]: { color: leftText.style.color },
    [RIGHT_TEXT]: { color: rightText.style.color },
    [GW_IMAGE]: {
      content: `url(${image.src})`
    }
  }
}

export const useStyles = () => {
  const defaultStyles = useDefaultStyles()

  const [styles, _, { setStoreValue }] = useStorage("subGoalStyles", (value) =>
    value
      ? {
          [GOAL_WIDGET]: {
            ...defaultStyles[GOAL_WIDGET],
            ...value[GOAL_WIDGET]
          },
          [GW_PROGRESS_BAR]: {
            ...defaultStyles[GW_PROGRESS_BAR],
            ...value[GW_PROGRESS_BAR]
          },
          [LEFT_TEXT]: {
            ...defaultStyles[LEFT_TEXT],
            ...value[LEFT_TEXT]
          },
          [RIGHT_TEXT]: {
            ...defaultStyles[RIGHT_TEXT],
            ...value[RIGHT_TEXT]
          },
          [GW_IMAGE]: {
            ...defaultStyles[GW_IMAGE],
            ...value[GW_IMAGE]
          }
        }
      : defaultStyles
  )

  for (const selector in styles) {
    if (typeof styles[selector] !== "string") {
      const updateStyle = useUpdateStyles(selector)
      for (const prop in styles[selector]) {
        updateStyle(prop, styles[selector][prop])
      }
    }
  }

  const setStyles = (selector: string) => (property: string, value: string) =>
    setStoreValue({
      ...styles,
      [selector]: { ...styles[selector], [property]: value }
    })

  return { styles, setStyles }
}

export const useUpdateStyles = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector)

  const updateStyle = (path: string, value: string) => {
    element.style[path] = value
  }

  return updateStyle
}
