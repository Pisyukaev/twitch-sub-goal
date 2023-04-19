import { useEffect, useMemo, useRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { getMeasureValue } from "~app/utils"

import { loadFont } from "./api/fonts"
import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  K_REM,
  LEFT_TEXT,
  RIGHT_TEXT
} from "./constants"
import useDebounce from "./hooks/useDebounce"
import useDefaultStyles from "./hooks/useDefaultStyles"
import useElements from "./hooks/useElements"
import useFonts from "./hooks/useFonts"
import type { SelectorProps, StylesData } from "./types"

export const useStyles = () => {
  const elements = useElements()
  const defaultStyles = useDefaultStyles()

  const isUpdatedStyles = useRef(false)

  const { selectedFont } = useFonts()

  useEffect(() => {
    async function loadFonts() {
      const fonts = Object.values(selectedFont)
        .flatMap(({ value }) => value)
        .filter(Boolean)

      await Promise.all(fonts.map((font) => loadFont(font)))
    }

    if (selectedFont) {
      loadFonts()
    }
  }, [selectedFont])

  const [styles, setStyles] = useStorage("customStyles", (value?: StylesData) =>
    value
      ? Object.keys(defaultStyles).reduce(
          (accum, selector) => ({
            ...accum,
            [selector]: { ...defaultStyles[selector], ...value[selector] }
          }),
          defaultStyles
        )
      : defaultStyles
  )

  const debouncedSetStyles = useDebounce(setStyles, 200)

  const updElementStyles = (selector: string, prop: string, value: string) => {
    let newValue = value
    if (value.match("rem")) {
      const { numberValue, measureValue } = getMeasureValue(value)

      newValue = `${numberValue / K_REM}${measureValue}`
    }

    elements[selector].style[prop] = newValue
  }

  const updateStyles = (selector: string, prop: string, value: string) => {
    debouncedSetStyles({
      ...styles,
      [selector]: { ...styles[selector], [prop]: value }
    })

    updElementStyles(selector, prop, value)
  }

  useEffect(() => {
    if (isUpdatedStyles.current) {
      return
    }

    for (const selector in styles) {
      for (const prop in styles[selector]) {
        updElementStyles(selector, prop, styles[selector][prop])
      }
    }

    isUpdatedStyles.current = styles !== defaultStyles
  }, [styles])

  const resetStyles = () => {
    setStyles(defaultStyles)
    isUpdatedStyles.current = false
  }

  return {
    styles,
    resetStyles,
    updateStyles
  }
}

export const useData = () => {
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
