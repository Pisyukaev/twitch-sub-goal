import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { fetchFontList } from "~app/api/fonts"
import { STORAGE_KEYS } from "~app/constants"
import type { Font } from "~app/types"

export const useFonts = () => {
  const [fonts, setFonts] = useState<Font[]>([])
  const [selectedFont, setSelectedFont] = useStorage(STORAGE_KEYS.SELECTED_FONT)

  useEffect(() => {
    const abortController = new AbortController()

    const load = async () => {
      const fontList = await fetchFontList(abortController.signal)
      setFonts(fontList)
    }

    load()

    return () => abortController.abort()
  }, [])

  const setFont = (
    selector: string,
    fontData: { font: Font; fontFaces: string[] }
  ) => {
    setSelectedFont((prev) => ({
      ...prev,
      [selector]: fontData
    }))
  }

  return { fonts, setFont, selectedFont }
}
