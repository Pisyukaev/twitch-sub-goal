import { useEffect, useRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { loadFont } from "~app/api/fonts"
import { K_REM } from "~app/constants"
import type { StylesData } from "~app/types"
import { getMeasureValue } from "~app/utils"

import useDebounce from "./useDebounce"
import useDefaultStyles from "./useDefaultStyles"
import useElements from "./useElements"
import useFonts from "./useFonts"

const useStyles = () => {
  const elements = useElements()
  const defaultStyles = useDefaultStyles()

  const isUpdatedStyles = useRef(false)

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

export default useStyles
