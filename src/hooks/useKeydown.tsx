import * as React from "react"

export function useKeydown(key: string, handler: Function) {
  React.useEffect(() => {
    const cb = (e: KeyboardEvent) => e.key === key && handler(e)
    document.body.addEventListener("keydown", cb)
    return () => {
      document.body.removeEventListener("keydown", cb)
    }
  }, [key, handler])
}