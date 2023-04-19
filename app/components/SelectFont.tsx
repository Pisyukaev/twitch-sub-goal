import { Select } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { fetchFontData } from "~app/api/fonts"
import { useFonts } from "~app/hooks"
import type { SelectorProps, UpdateStylesFn } from "~app/types"
import { createFontFacesCSS } from "~app/utils"

interface Props {
  onUpdate: UpdateStylesFn
  selectedStyles: SelectorProps
}

const SelectFont = ({ selectedStyles, onUpdate }: Props) => {
  const { fonts, setFont } = useFonts()
  const { label, selector, property, value } = selectedStyles

  const [currentFont, setCurrentFont] = useState<string | null>(null)

  const handleChange = (newFont: string) => {
    setCurrentFont(newFont)
    onUpdate(
      selector,
      property,
      `'${fonts.find(({ value }) => newFont === value).label}', sans-serif`
    )
  }

  useEffect(() => {
    if (!currentFont) {
      return
    }

    const request = async () => {
      try {
        const fontData = await fetchFontData(currentFont)
        const fontFaces = createFontFacesCSS(fontData)

        setFont(selector, {
          value: currentFont,
          fontFaces: fontFaces
        })
      } catch (err) {
        console.log(err)
      }
    }

    request()
  }, [currentFont])

  useEffect(() => {
    const fontName = value.match(/'([^']+)'/)[1]
    const initFont = fonts.find((el) => el.label === fontName)?.value

    setCurrentFont(initFont)
  }, [value, fonts])

  return (
    <Select
      label={label}
      value={currentFont}
      data={fonts}
      disabled={fonts.length === 0}
      placeholder="Select font"
      onChange={handleChange}
      searchable
    />
  )
}

export default SelectFont
