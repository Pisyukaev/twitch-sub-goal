import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { fetchFontList } from "~app/api/fonts"
import type { Font } from "~app/types"

const useFonts = () => {
  const [fonts, setFonts] = useState<Font[]>([])
  const [selectedFont, setSelectedFont] = useStorage("selectedFont")

  useEffect(() => {
    async function loadFonts() {
      const fontList = await fetchFontList()

      setFonts(fontList)
    }

    loadFonts()
  }, [])

  const setFont = (
    selector: string,
    fontData: { value: string; fontFaces: string[] }
  ) => {
    setSelectedFont((prev) => ({
      ...prev,
      [selector]: fontData
    }))
  }

  return { fonts, setFont, selectedFont }
}

export default useFonts
