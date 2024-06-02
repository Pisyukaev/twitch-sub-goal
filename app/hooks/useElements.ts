import { useRef } from "react"

import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  GW_PROGRESS_BAR_BG,
  LEFT_TEXT,
  PROGRESS_BAR_DOT,
  RIGHT_TEXT
} from "~app/constants"

export const useElements = () => {
  const widgetBody = useRef(document.querySelector<HTMLDivElement>(GOAL_WIDGET))
  const image = useRef(document.querySelector<HTMLImageElement>(GW_IMAGE))
  const leftText = useRef(document.querySelector<HTMLDivElement>(LEFT_TEXT))
  const rightText = useRef(document.querySelector<HTMLDivElement>(RIGHT_TEXT))
  const progressBar = useRef(
    widgetBody.current?.querySelector<HTMLDivElement>(GW_PROGRESS_BAR)
  )
  const progressBarBg = useRef(
    widgetBody.current?.querySelector<HTMLDivElement>(GW_PROGRESS_BAR_BG)
  )
  const progressBarDots = useRef(
    Array.from(
      widgetBody.current?.querySelectorAll<HTMLDivElement>(PROGRESS_BAR_DOT)
    )
  )

  return {
    [GOAL_WIDGET]: widgetBody.current,
    [GW_IMAGE]: image.current,
    [LEFT_TEXT]: leftText.current,
    [RIGHT_TEXT]: rightText.current,
    [GW_PROGRESS_BAR]: progressBar.current,
    [GW_PROGRESS_BAR_BG]: progressBarBg.current,
    [PROGRESS_BAR_DOT]: progressBarDots.current
  }
}
