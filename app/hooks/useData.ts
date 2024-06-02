import { useMemo } from "react"

import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  GW_PROGRESS_BAR_BG,
  LEFT_TEXT,
  PROGRESS_BAR_DOT,
  RIGHT_TEXT
} from "../constants"
import type { DataProps } from "../types"
import { useStylesContext } from "./useStyles"

export const useData = () => {
  const { styles } = useStylesContext()

  const data = useMemo<DataProps>(() => {
    if (!styles) {
      return {}
    }

    return {
      goalWidget: [
        {
          selector: GOAL_WIDGET,
          label: "Background",
          value: styles[GOAL_WIDGET]["background-color"],
          property: "background-color",
          componentName: "ColorInput"
        }
      ],
      border: [
        {
          selector: GOAL_WIDGET,
          label: "Border",
          value: styles[GOAL_WIDGET]["border-color"],
          property: "border-color",
          componentName: "ColorInput"
        },
        {
          selector: GOAL_WIDGET,
          label: "Border style",
          value: styles[GOAL_WIDGET]["border-style"],
          property: "border-style",
          componentName: "BorderStyle"
        },
        {
          selector: GOAL_WIDGET,
          label: "Border width",
          value: styles[GOAL_WIDGET]["border-width"],
          property: "border-width",
          componentName: "NumberProp"
        },
        {
          selector: GOAL_WIDGET,
          label: "Border radius",
          value: styles[GOAL_WIDGET]["border-radius"],
          property: "border-radius",
          componentName: "NumberProp"
        }
      ],
      image: [
        {
          selector: GW_IMAGE,
          label: "Image link",
          value: styles[GW_IMAGE].content,
          property: "content",
          componentName: "InputImage"
        }
      ],
      progressBar: [
        {
          selector: GW_PROGRESS_BAR,
          label: "Progress bar",
          value: styles[GW_PROGRESS_BAR]["background-color"],
          property: "background-color",
          componentName: "ColorInput"
        },
        {
          selector: GW_PROGRESS_BAR_BG,
          label: "Progress bar background",
          value: styles[GW_PROGRESS_BAR_BG]["background-color"],
          property: "background-color",
          componentName: "ColorInput"
        },
        {
          selector: PROGRESS_BAR_DOT,
          label: "Progress bar dot",
          value: styles[PROGRESS_BAR_DOT]["background-color"],
          property: "background-color",
          componentName: "ColorInput"
        }
      ],
      leftText: [
        {
          selector: LEFT_TEXT,
          label: "Left text",
          value: styles[LEFT_TEXT]["color"],
          property: "color",
          componentName: "ColorInput"
        },
        {
          selector: LEFT_TEXT,
          label: "Font family",
          value: styles[LEFT_TEXT]["font-family"],
          property: "font-family",
          componentName: "SelectFont"
        },
        {
          selector: LEFT_TEXT,
          label: "Text size",
          value: styles[LEFT_TEXT]["font-size"],
          property: "font-size",
          componentName: "NumberProp"
        }
      ],
      rightText: [
        {
          selector: RIGHT_TEXT,
          label: "Right text",
          value: styles[RIGHT_TEXT]["color"],
          property: "color",
          componentName: "ColorInput"
        },
        {
          selector: RIGHT_TEXT,
          label: "Font family",
          value: styles[RIGHT_TEXT]["font-family"],
          property: "font-family",
          componentName: "SelectFont"
        },
        {
          selector: RIGHT_TEXT,
          label: "Text size",
          value: styles[RIGHT_TEXT]["font-size"],
          property: "font-size",
          componentName: "NumberProp"
        }
      ]
    }
  }, [styles])

  return data
}
