import { Select } from "@mantine/core"
import { useEffect, useState } from "react"

import { loadFont } from "~app/api/fonts"
import { useFontsContext } from "~app/hooks/useFonts"
import { useStylesContext } from "~app/hooks/useStyles"
import type { Font, SelectorProps } from "~app/types"
import { createFontFacesCSS } from "~app/utils"

interface Props {
  selectedStyles: SelectorProps
}

export const SelectFont = ({ selectedStyles }: Props) => {
  const { updateStyles } = useStylesContext()
  const { fonts, setFont } = useFontsContext()
  const { label, selector, property, value } = selectedStyles

  const [currentFont, setCurrentFont] = useState<Font | null>(null)

  const handleChange = (newFont: string) => {
    const selectedFont = fonts.find((el) => el.value === newFont)
    if (!selectedFont) return

    setCurrentFont(selectedFont)
    updateStyles(selector, property, `'${selectedFont.label}'`)
  }

  useEffect(() => {
    if (!currentFont) {
      return
    }

    const abortController = new AbortController()
    const request = async () => {
      try {
        const fontData = await loadFont(currentFont, abortController.signal)
        if (!fontData) {
          return
        }

        const fontFaces = createFontFacesCSS(fontData)

        setFont(selector, {
          font: currentFont,
          fontFaces: fontFaces
        })
      } catch (err) {
        console.log(err)
      }
    }

    request()

    return () => abortController.abort()
  }, [currentFont])

  useEffect(() => {
    const fontName = value.match(/'([^']+)'/)?.[1]
    const initFont = fonts.find((el) => el.label === fontName)

    setCurrentFont(initFont ?? null)
  }, [value, fonts])

  return (
    <Select
      label={label}
      value={currentFont ? currentFont.value : null}
      data={fonts}
      disabled={fonts.length === 0}
      placeholder="Select font"
      onChange={handleChange}
      searchable
    />
  )
}
