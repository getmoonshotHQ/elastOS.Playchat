import * as React from "react"

const noOptions = {
  stateObserver: noop,
  localStorageName: undefined,
  controlled: false
}

/**
 * **useCheckInput hook:**
 *
 * a hook to be spread right into an input type="checkbox" element.
 * eg `<input type="checkbox" {...useCheckInput(false)}>`
 *
 * also exposes a `resetValue` to reset the value to initialvalue
 * also exposes a `setValue`  where you can manually set value... just in case
 * instead of passing defaultValue to your input, pass it to useCheckInput!
 *
 * */
export function useCheckInput(
  /** prop: set initial value */
  initialValue: boolean,
  options?: {
    /** prop: pass a callback if you want to know about changes */
    stateObserver?: (arg: boolean) => void
    /** if you want to persist to localstorage, pass a name for it! */
    localStorageName?: String
    /** pass true if you want a resetValue or setValue */
    controlled?: boolean
  }
) {
  const { stateObserver, localStorageName, controlled } = options || noOptions
  let _initialValue = initialValue
  // safely check localstorage and coerce the right types
  if (typeof window !== "undefined" && window.localStorage && typeof localStorageName === "string") {
    let v = localStorage.getItem(localStorageName)
    if (v) {
      _initialValue = v === "true" // dont cast strings with Boolean lol
      if (stateObserver) stateObserver(_initialValue)
    }
  }

  let [value, setValue] = React.useState<typeof _initialValue>(_initialValue)
  const onChange = (e: { target: { type: string; checked: boolean } }) => {
    if (e.target.type !== "checkbox") {
      throw new Error("useCheckInput error - no checkbox specified, this is likely a mistake by the developer")
    }
    const val = e.target.checked
    setValue(val)
    if (typeof window !== "undefined" && window.localStorage && typeof localStorageName === "string") {
      if (val !== initialValue) {
        localStorage.setItem(localStorageName, String(val))
      } else {
        localStorage.removeItem(localStorageName)
      }
    }
    if (stateObserver) stateObserver(val)
  }
  const resetValue = () => setValue(initialValue)
  if (controlled) {
    return { onChange, checked: value, setValue, resetValue }
  } else {
    return { onChange, checked: value }
  }
}

function noop() {}