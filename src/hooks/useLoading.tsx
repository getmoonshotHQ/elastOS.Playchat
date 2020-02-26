import * as React from "react"

export function useLoading() {
  const [isLoading, setState] = React.useState(false)
  const mount = React.useRef(false)
  React.useEffect(() => {
    mount.current = true
    return () => void (mount.current = false)
  }, [])
  const load = (aPromise: Promise<any>) => {
    setState(true)
    return aPromise.finally(() => {
      if (mount.current) setState(false)
    })
  }
  return [isLoading, load] as const
}