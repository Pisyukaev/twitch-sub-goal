export interface SelectorProps {
  label: string
  value: string
  property:
    | "color"
    | "background-color"
    | "border-color"
    | "border-width"
    | "border-radius"
    | "content"
    | "font-size"
    | "font-family"
  selector: string
  group?: string
  componentName: string
}

export interface StylesData {
  [key: string]: { [prop: string]: string }
}

export type UpdateStylesFn = (
  selector: string,
  prop: string,
  saveValue: string
) => void

export interface Font {
  value: string
  label: string
}

export type FontStyle = "normal" | "italic"

export type FontVariants = "400" | "500" | "800"

export type FontSubset = "latin" | "latin-ext" | "cyrillic" | "cyrillic-ext"

export type FontType = "ttf" | "woff" | "woff2"

export interface FontItem {
  category: string
  defSubset: string
  family: string
  id: string
  lastModified: string
  styles: FontStyle[]
  subsets: FontSubset[]
  type: string
  variable: boolean
  version: string
  weights: number[]
}

export type FontList = FontItem[]

export type FontVariant = {
  [key in FontVariants]: {
    [key in FontStyle]: {
      [key in FontSubset]: {
        url: {
          [key in FontType]: string
        }
      }
    }
  }
}

export interface FontData {
  id: string
  family: string
  subsets: FontSubset
  weights: number[]
  styles: string[]
  unicodeRange: {
    [key: string]: string
  }
  defSubset: string
  variable: boolean
  lastModified: string // like a "2020-09-10"
  category: string
  version: string
  type: string
  variants: FontVariant
}
