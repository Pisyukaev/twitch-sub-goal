import { useMemo } from "react"

import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  LEFT_TEXT,
  RIGHT_TEXT
} from "../constants"
import type { SelectorProps } from "../types"
import useStyles from "./useStyles"

const useData = () => {
  const { styles } = useStyles()
  const data = useMemo<SelectorProps[]>(
    () => [
      {
        selector: GOAL_WIDGET,
        label: "Background",
        value: styles[GOAL_WIDGET]["background-color"],
        property: "background-color",
        group: "goalWidget",
        componentName: "WidgetStyles"
      },
      {
        selector: GOAL_WIDGET,
        label: "Border",
        value: styles[GOAL_WIDGET]["border-color"],
        property: "border-color",
        group: "border",
        componentName: "WidgetStyles"
      },
      {
        selector: GW_IMAGE,
        label: "Image link",
        value: styles[GW_IMAGE].content,
        property: "content",
        group: "image",
        componentName: "InputImage"
      },
      {
        selector: GOAL_WIDGET,
        label: "Border width",
        value: styles[GOAL_WIDGET]["border-width"],
        property: "border-width",
        group: "border",
        componentName: "NumberProp"
      },
      {
        selector: GOAL_WIDGET,
        label: "Border radius",
        value: styles[GOAL_WIDGET]["border-radius"],
        property: "border-radius",
        group: "border",
        componentName: "NumberProp"
      },
      {
        selector: GW_PROGRESS_BAR,
        label: "Progress bar",
        value: styles[GW_PROGRESS_BAR]["background-color"],
        property: "background-color",
        group: "progressBar",
        componentName: "WidgetStyles"
      },
      {
        selector: LEFT_TEXT,
        label: "Left text",
        value: styles[LEFT_TEXT]["color"],
        property: "color",
        group: "leftText",
        componentName: "WidgetStyles"
      },
      {
        selector: LEFT_TEXT,
        label: "Font family",
        value: styles[LEFT_TEXT]["font-family"],
        property: "font-family",
        group: "leftText",
        componentName: "SelectFont"
      },
      {
        selector: LEFT_TEXT,
        label: "Text size",
        value: styles[LEFT_TEXT]["font-size"],
        property: "font-size",
        group: "leftText",
        componentName: "NumberProp"
      },
      {
        selector: RIGHT_TEXT,
        label: "Right text",
        value: styles[RIGHT_TEXT]["color"],
        property: "color",
        group: "rightText",
        componentName: "WidgetStyles"
      },
      {
        selector: RIGHT_TEXT,
        label: "Font family",
        value: styles[RIGHT_TEXT]["font-family"],
        property: "font-family",
        group: "rightText",
        componentName: "SelectFont"
      },
      {
        selector: RIGHT_TEXT,
        label: "Text size",
        value: styles[RIGHT_TEXT]["font-size"],
        property: "font-size",
        group: "rightText",
        componentName: "NumberProp"
      }
    ],
    [styles]
  )

  return data
}

export default useData