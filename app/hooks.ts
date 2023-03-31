import { useEffect, useMemo, useRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { getMeasureValue } from "./components/utils"
import {
  GOAL_WIDGET,
  GW_IMAGE,
  GW_PROGRESS_BAR,
  K_REM,
  LEFT_TEXT,
  RIGHT_TEXT
} from "./constants"
import type { SelectorProps, StylesData } from "./types"

const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const timeout = useRef<NodeJS.Timeout>()

  return (...args: Parameters<T>) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => callback(...args), delay)
  }
}

export const useElements = () => {
  const widgetBody = useRef(document.querySelector<HTMLDivElement>(GOAL_WIDGET))
  const image = useRef(document.querySelector<HTMLImageElement>(GW_IMAGE))
  const leftText = useRef(document.querySelector<HTMLDivElement>(LEFT_TEXT))
  const rightText = useRef(document.querySelector<HTMLDivElement>(RIGHT_TEXT))
  const progressBar = useRef(
    document.querySelector<HTMLDivElement>(GW_PROGRESS_BAR)
  )

  return {
    [GOAL_WIDGET]: widgetBody.current,
    [GW_IMAGE]: image.current,
    [LEFT_TEXT]: leftText.current,
    [RIGHT_TEXT]: rightText.current,
    [GW_PROGRESS_BAR]: progressBar.current
  }
}

export const useDefaultStyles = () => {
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
    [LEFT_TEXT]: { color: elements[LEFT_TEXT].style.color },
    [RIGHT_TEXT]: { color: elements[RIGHT_TEXT].style.color },
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

export const useStyles = () => {
  const elements = useElements()
  const defaultStyles = useDefaultStyles()

  const isUpdatedStyles = useRef(false)

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
        value: GOAL_WIDGET,
        label: "Goal widget background",
        color: styles[GOAL_WIDGET]["background-color"],
        property: "background-color"
      },
      {
        value: GW_PROGRESS_BAR,
        label: "Progress bar",
        color: styles[GW_PROGRESS_BAR]["background-color"],
        property: "background-color"
      },
      {
        value: LEFT_TEXT,
        label: "Left text",
        color: styles[LEFT_TEXT]["color"],
        property: "color"
      },
      {
        value: RIGHT_TEXT,
        label: "Right text",
        color: styles[RIGHT_TEXT]["color"],
        property: "color"
      }
    ],
    [styles]
  )

  return data
}
