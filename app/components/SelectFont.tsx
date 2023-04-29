import { Select } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { loadFont } from "~app/api/fonts"
import useFonts from "~app/hooks/useFonts"
import type { Font, SelectorProps, UpdateStylesFn } from "~app/types"
import { createFontFacesCSS } from "~app/utils"

interface Props {
  onUpdate: UpdateStylesFn
  selectedStyles: SelectorProps
}

const SelectFont = ({ selectedStyles, onUpdate }: Props) => {
  const { fonts, setFont } = useFonts()
  const { label, selector, property, value } = selectedStyles

  const [currentFont, setCurrentFont] = useState<Font | null>(null)

  const handleChange = (newFont: string) => {
    const selectedFont = fonts.find((el) => el.value === newFont)

    setCurrentFont(selectedFont)
    onUpdate(selector, property, `'${selectedFont.label}'`)
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

    setCurrentFont(initFont)
  }, [value, fonts])

  return (
    <Select
      label={label}
      value={currentFont?.value}
      data={fonts}
      disabled={fonts.length === 0}
      placeholder="Select font"
      onChange={handleChange}
      searchable
    />
  )
}

export default SelectFont
