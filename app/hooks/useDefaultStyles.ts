import { useRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  LEFT_TEXT,
  RIGHT_TEXT
} from "~app/constants"
import type { StylesData } from "~app/types"

import useElements from "./useElements"

const useDefaultStyles = () => {
  const elements = useElements()

  const styles = useRef({
    [GOAL_WIDGET]: {
      "background-color": elements[GOAL_WIDGET].style.backgroundColor,
      "border-color": elements[GOAL_WIDGET].style.borderColor,
      "border-width": elements[GOAL_WIDGET].style.borderWidth,
      "border-radius": elements[GOAL_WIDGET].style.borderRadius || "1rem"
    },
    [GW_PROGRESS_BAR]: {
      "background-color": elements[GW_PROGRESS_BAR].style.backgroundColor
    },
    [LEFT_TEXT]: {
      color: elements[LEFT_TEXT].style.color,
      "font-size": elements[LEFT_TEXT].style.fontSize || "18px",
      "font-family": elements[LEFT_TEXT].style.fontFamily || "Inter"
    },
    [RIGHT_TEXT]: {
      color: elements[RIGHT_TEXT].style.color,
      "font-size": elements[RIGHT_TEXT].style.fontSize || "18px",
      "font-family": elements[RIGHT_TEXT].style.fontFamily || "Inter"
    },
    [GW_IMAGE]: {
      content: `url(${elements[GW_IMAGE].src})`
    }
  } as StylesData)

  const [defaultStyles] = useStorage(
    "defaultStyles",
    (value?: StylesData) => value ?? styles.current
  )

  return defaultStyles
}

export default useDefaultStyles
