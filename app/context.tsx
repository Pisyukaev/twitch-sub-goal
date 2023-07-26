import { createContext } from "react"
import type {PropsWithChildren} from 'react'

import { useFonts } from "./hooks/useFonts"
import { useStyles } from "./hooks/useStyles"
import type { Font, SelectedFonts, StylesData } from "./types"

export const stylesContext = createContext<{
  styles: StylesData
  updateStyles: (selector: string, prop: string, value: string) => void
  resetStyles: () => void
}>(null)

export const fontContext = createContext<{
  fonts: Font[]
  setFont: (
    selector: string,
    fontData: {
      font: Font
      fontFaces: string[]
    }
  ) => void
  selectedFont: SelectedFonts
  resetSelectedFont: () => void
}>(null)

const StylesProvider = stylesContext.Provider
const FontProvider = fontContext.Provider

export const WidgetProvider = ({ children }: PropsWithChildren) => {
  const stylesValue = useStyles()
  const fontValue = useFonts()

  if (!stylesValue.styles) {
    return null
  }

  return (
    <FontProvider value={fontValue}>
      <StylesProvider value={stylesValue}>{children}</StylesProvider>
    </FontProvider>
  )
}
