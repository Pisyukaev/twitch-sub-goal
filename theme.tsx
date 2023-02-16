import { MantineProvider } from "@mantine/core"
import type { ColorScheme } from "@mantine/core"
import type { EmotionCache } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import type { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  emotionCache?: EmotionCache
}

export function ThemeProvider({ emotionCache, children }: Props) {
  const [theme] = useLocalStorage<ColorScheme>({
    key: "twilight.theme",
    deserialize(value) {
      return Number(value) ? "dark" : "light"
    }
  })

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: theme }}
      emotionCache={emotionCache}>
      {children}
    </MantineProvider>
  )
}
