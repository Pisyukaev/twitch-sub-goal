export interface SelectorProps {
  value: string
  label: string
  color: string
  property: "color" | "background-color"
}

export interface StylesData {
  [key: string]: { [prop: string]: string }
}
