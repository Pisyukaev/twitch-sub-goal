import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { loadFont } from "~app/api/fonts"
import { K_REM } from "~app/constants"
import type { StylesData } from "~app/types"
import { getMeasureValue } from "~app/utils"

import useDebounce from "./useDebounce"
import useDefaultStyles from "./useDefaultStyles"
import useElements from "./useElements"
import useFonts from "./useFonts"

/**
 * @description This hook is used to initialize the styles of the elements
 * @param initialStyles - The initial styles of the elements
 * @returns The initial styles of the elements, the actual styles of the elements and a function to
 * update the actual styles of the elements
 */
const useInitStyles = (initialStyles?: StylesData) => {
  // By the first render, the initial styles of the elements are stored
  useStorage("customStyles", (value?: StylesData) => value ?? initialStyles)

  // However, the actual state of the styles of the elements is undefined in the storage
  const [actualStyles, setActualStyles] = useStorage("customStyles")

  return {
    actualStyles,
    setActualStyles
  }
}

const useStyles = (): {
  styles?: StylesData
  resetStyles: () => void
  updateStyles: (selector: string, prop: string, value: string) => void
} => {
  const elements = useElements()
  const defaultStyles = useDefaultStyles()
  const { actualStyles, setActualStyles } = useInitStyles(defaultStyles)
  const { selectedFont } = useFonts()

  useEffect(() => {
    async function loadFonts() {
      const fonts = Object.values(selectedFont)
        .flatMap(({ font }) => font)
        .filter(Boolean)

      try {
        await Promise.all(fonts.map((font) => loadFont(font)))
      } catch (e) {
        console.error("Error loading fonts", e)
      }
    }

    if (selectedFont) {
      loadFonts()
    }
  }, [selectedFont])

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

export default useStyles
