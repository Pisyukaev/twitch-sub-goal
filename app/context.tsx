import { createContext } from "react"

import type { StylesData } from "./types"

const StylesContext = createContext<{
  styles: StylesData
  updateStyles: (selector: string, prop: string, value: string) => void
  resetStyles: () => void
}>(null)

export default StylesContext
