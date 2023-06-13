import { useContext, useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { K_REM, LEFT_TEXT, RIGHT_TEXT, STORAGE_KEYS } from "~app/constants"
import { stylesContext } from "~app/context"
import type { StylesData } from "~app/types"
import { getMeasureValue } from "~app/utils"

import { useDebounce } from "./useDebounce"
import { useDefaultStyles } from "./useDefaultStyles"
import { useElements } from "./useElements"

/**
 * @description This hook is used to initialize the styles of the elements
 * @param initialStyles - The initial styles of the elements
 * @returns The initial styles of the elements, the actual styles of the elements and a function to
 * update the actual styles of the elements
 */
const useInitStyles = (initialStyles?: StylesData) => {
  // By the first render, the initial styles of the elements are stored
  useStorage<StylesData>(STORAGE_KEYS.CUSTOM_STYLES, (value) => {
    if (!value) {
      return initialStyles
    }

    // backward compatibility px => rem
    // TODO: remove this in the next version
    const newValue = {
      ...value,
      [LEFT_TEXT]: {
        ...value[LEFT_TEXT],
        "font-size": value[LEFT_TEXT]["font-size"].endsWith("px")
          ? "4rem"
          : value[LEFT_TEXT]["font-size"]
      },
      [RIGHT_TEXT]: {
        ...value[RIGHT_TEXT],
        "font-size": value[RIGHT_TEXT]["font-size"].endsWith("px")
          ? "4rem"
          : value[RIGHT_TEXT]["font-size"]
      }
    }

    return newValue
  })

  // However, the actual state of the styles of the elements is undefined in the storage
  const [actualStyles, setActualStyles] = useStorage<StylesData | undefined>(
    STORAGE_KEYS.CUSTOM_STYLES
  )

  return {
    actualStyles,
    setActualStyles
  }
}

export const useStyles = () => {
  const elements = useElements()
  const defaultStyles = useDefaultStyles()
  const { actualStyles, setActualStyles } = useInitStyles(defaultStyles)

  const debouncedSetStyles = useDebounce(setActualStyles, 200)

  const updElementStyles = (selector: string, prop: string, value: string) => {
    let newValue = value

    if (value.match("rem")) {
      const { numberValue, measureValue } = getMeasureValue(value)
      newValue = `${numberValue / K_REM}${measureValue}`
    }

    elements[selector].style[prop] = newValue
  }

  const updateStyles = (selector: string, prop: string, value: string) => {
    if (!actualStyles) {
      return
    }

    debouncedSetStyles({
      ...actualStyles,
      [selector]: { ...actualStyles[selector], [prop]: value }
    })

    updElementStyles(selector, prop, value)
  }

  useEffect(() => {
    if (!actualStyles) {
      return
    }

    for (const selector in actualStyles) {
      for (const prop in actualStyles[selector]) {
        updElementStyles(selector, prop, actualStyles[selector][prop])
      }
    }
  }, [actualStyles])

  const resetStyles = () => setActualStyles(defaultStyles)

  return {
    styles: actualStyles,
    resetStyles,
    updateStyles
  }
}

export const useStylesContext = () => {
  return useContext(stylesContext)
}
