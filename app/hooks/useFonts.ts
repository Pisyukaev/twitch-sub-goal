import { useContext, useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { loadFont } from "~app/api/fonts"
import { fetchFontList } from "~app/api/fonts"
import { STORAGE_KEYS } from "~app/constants"
import { fontContext } from "~app/context"
import type { Font, SelectedFonts } from "~app/types"

export const useFonts = () => {
  const [fonts, setFonts] = useState<Font[]>([])
  const [selectedFont, setSelectedFont, { remove }] = useStorage<SelectedFonts>(
    STORAGE_KEYS.SELECTED_FONT
  )

  useEffect(() => {
    const abortController = new AbortController()

    const load = async () => {
      const fontList = await fetchFontList(abortController.signal)
      setFonts(fontList)
    }

    load()

    return () => abortController.abort()
  }, [])

  useEffect(() => {
    async function loadFonts() {
      const fonts = Object.values(selectedFont)
        .flatMap(({ font }) => font)
        .filter(Boolean)

      try {
        await Promise.all(fonts.map((font) => loadFont(font)))
      } catch (err) {
        console.error("Error loading fonts", err)
      }
    }

    if (selectedFont) {
      loadFonts()
    }
  }, [selectedFont])

  const setFont = (
    selector: string,
    fontData: { font: Font; fontFaces: string[] }
  ) => {
    setSelectedFont((prev) => ({
      ...prev,
      [selector]: fontData
    }))
  }

  return { fonts, setFont, selectedFont, resetSelectedFont: remove }
}

export const useFontsContext = () => {
  return useContext(fontContext)
}
