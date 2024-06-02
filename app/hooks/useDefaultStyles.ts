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
import type { StylesData } from "~app/types"
import { getPropertyValue } from "~app/utils"

import { useElements } from "./useElements"

export const useDefaultStyles = () => {
  const elements = useElements()

  const styles = useRef<StylesData>({
    [GOAL_WIDGET]: {
      "background-color": getPropertyValue(
        elements[GOAL_WIDGET],
        "background-color"
      ),
      "border-color": getPropertyValue(elements[GOAL_WIDGET], "border-color"),
      "border-width": getPropertyValue(elements[GOAL_WIDGET], "border-width"),
      "border-radius":
        getPropertyValue(elements[GOAL_WIDGET], "border-radius") || "1rem",
      "border-style":
        getPropertyValue(elements[GOAL_WIDGET], "border-style") || "solid"
    },
    [GW_PROGRESS_BAR]: {
      "background-color": getPropertyValue(
        elements[GW_PROGRESS_BAR],
        "background-color"
      )
    },
    [GW_PROGRESS_BAR_BG]: {
      "background-color": getPropertyValue(
        elements[GW_PROGRESS_BAR_BG],
        "background-color"
      )
    },
    [PROGRESS_BAR_DOT]: {
      "background-color": getPropertyValue(
        elements[PROGRESS_BAR_DOT][0],
        "background-color"
      )
    },
    [LEFT_TEXT]: {
      color: getPropertyValue(elements[LEFT_TEXT], "color"),
      "font-size": getPropertyValue(elements[LEFT_TEXT], "font-size") || "4rem",
      "font-family":
        getPropertyValue(elements[LEFT_TEXT], "font-family") || "Inter"
    },
    [RIGHT_TEXT]: {
      color: getPropertyValue(elements[RIGHT_TEXT], "color"),
      "font-size":
        getPropertyValue(elements[RIGHT_TEXT], "font-size") || "4rem",
      "font-family":
        getPropertyValue(elements[RIGHT_TEXT], "font-family") || "Inter"
    },
    [GW_IMAGE]: {
      content: getPropertyValue(elements[GW_IMAGE], "content")
    }
  })

  return styles.current
}
