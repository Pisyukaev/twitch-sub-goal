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
