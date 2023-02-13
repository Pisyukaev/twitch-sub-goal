import { useStorage } from "@plasmohq/storage/hook"

import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  LEFT_TEXT,
  RIGHT_TEXT
} from "./constants"

export const useDefaultStyles = () => {
  const widgetBody = document.querySelector<HTMLDivElement>(GOAL_WIDGET)
  const image = document.querySelector<HTMLImageElement>(GW_IMAGE)
  const leftText = document.querySelector<HTMLDivElement>(LEFT_TEXT)
  const rightText = document.querySelector<HTMLDivElement>(RIGHT_TEXT)
  const progressBar = document.querySelector<HTMLDivElement>(GW_PROGRESS_BAR)

  return {
    [GOAL_WIDGET]: { backgroundColor: widgetBody.style.backgroundColor },
    [GW_IMAGE]: image.src,
    [GW_PROGRESS_BAR]: { backgroundColor: progressBar.style.backgroundColor },
    [LEFT_TEXT]: { color: leftText.style.color },
    [RIGHT_TEXT]: { color: rightText.style.color }
  }
}

export const useStyles = () => {
  const defaultStyles = useDefaultStyles()

  const [widgetBody] = useStorage(GOAL_WIDGET, (value) =>
    value === undefined
      ? defaultStyles[GOAL_WIDGET]
      : { ...defaultStyles[GOAL_WIDGET], ...value }
  )
  const [image] = useStorage(GW_IMAGE, (value) =>
    value === undefined ? defaultStyles[GW_IMAGE] : value
  )
  const [leftText] = useStorage(LEFT_TEXT, (value) =>
    value === defaultStyles[LEFT_TEXT]
      ? defaultStyles[LEFT_TEXT]
      : { ...defaultStyles[LEFT_TEXT], ...value }
  )
  const [rightText] = useStorage(RIGHT_TEXT, (value) =>
    value === defaultStyles[RIGHT_TEXT]
      ? defaultStyles[RIGHT_TEXT]
      : { ...defaultStyles[RIGHT_TEXT], ...value }
  )
  const [progressBar] = useStorage(GW_PROGRESS_BAR, (value) =>
    value === defaultStyles[GW_PROGRESS_BAR]
      ? defaultStyles[GW_PROGRESS_BAR]
      : { ...defaultStyles[GW_PROGRESS_BAR], ...value }
  )

  return {
    [GOAL_WIDGET]: widgetBody,
    [GW_IMAGE]: image,
    [GW_PROGRESS_BAR]: progressBar,
    [LEFT_TEXT]: leftText,
    [RIGHT_TEXT]: rightText
  }
}

export const useUpdateStyles = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector)

  const updateStyle = (path: string, value: string) => {
    element.style[path] = value
  }

  return updateStyle
}
