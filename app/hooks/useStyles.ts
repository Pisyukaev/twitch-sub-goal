import { useContext, useEffect, useMemo } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { K_REM, STORAGE_KEYS } from "~app/constants"
import { stylesContext } from "~app/context"
import type { StylesData } from "~app/types"
import { deepMerge, getMeasureValue } from "~app/utils"

import { useDebounce } from "./useDebounce"
import { useDefaultStyles } from "./useDefaultStyles"
import { useElements } from "./useElements"

export const useStyles = () => {
  const elements = useElements()
  const defaultStyles = useDefaultStyles()
  const [savedStyles, setSavedStyles, { remove }] = useStorage<
    StylesData | undefined
  >(STORAGE_KEYS.CUSTOM_STYLES)

  const actualSavedStyles = useMemo(() => savedStyles || {}, [savedStyles])
  const styles = useMemo(
    () => deepMerge(defaultStyles, actualSavedStyles),
    [defaultStyles, actualSavedStyles]
  )

  const debouncedSetStyles = useDebounce(setSavedStyles, 200)

  const updElementStyles = (selector: string, prop: string, value: string) => {
    let newValue = value

    if (value.match("rem")) {
      const { numberValue, measureValue } = getMeasureValue(value)
      newValue = `${numberValue / K_REM}${measureValue}`
    }

    if (Array.isArray(elements[selector])) {
      elements[selector].forEach((element) => {
        element.style[prop] = newValue
      })
    } else {
      elements[selector].style[prop] = newValue
    }
  }

  const updateStyles = (selector: string, prop: string, value: string) => {
    debouncedSetStyles({
      ...actualSavedStyles,
      [selector]: { ...(actualSavedStyles[selector] || {}), [prop]: value }
    })

    updElementStyles(selector, prop, value)
  }

  useEffect(() => {
    for (const selector in styles) {
      for (const prop in styles[selector]) {
        updElementStyles(selector, prop, styles[selector][prop])
      }
    }
  }, [styles])

  return {
    styles,
    resetStyles: remove,
    updateStyles
  }
}

export const useStylesContext = () => {
  return useContext(stylesContext)
}
