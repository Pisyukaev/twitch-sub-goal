import { useRef } from "react"

const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const timeout = useRef<NodeJS.Timeout>()

  return (...args: Parameters<T>) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => callback(...args), delay)
  }
}

export default useDebounce
