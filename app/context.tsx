import { createContext } from "react"

import type { StylesData } from "./types"

export const stylesContext = createContext<{
  styles: StylesData
  updateStyles: (selector: string, prop: string, value: string) => void
  resetStyles: () => void
}>(null)

export const StylesProvider = stylesContext.Provider
