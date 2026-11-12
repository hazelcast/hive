import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

const subscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const readValue = <T>(key: string, preserveFalsyValues: boolean): T | undefined => {
  try {
    const storedValue = window.localStorage.getItem(key)
    if (storedValue === null) return undefined
    const value = JSON.parse(storedValue) as T
    return preserveFalsyValues || value ? value : undefined
  } catch (e) {
    return undefined
  }
}

export const createPersistedState = <T>(
  key: string,
  options?: { preserveFalsyValues?: boolean },
): ((state: T) => [T, Dispatch<SetStateAction<T>>]) => {
  return (initialState: T) => {
    const preserveFalsyValues = options?.preserveFalsyValues ?? false
    const stateKey = key
    const isClientRender = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
    const updated = useRef(false)
    const hydrating = useRef(!isClientRender)
    const initialStateRef = useRef(initialState)
    initialStateRef.current = initialState
    const [state, setState] = useState<{ key: string; value: T }>(() => {
      if (!isClientRender) return { key: stateKey, value: initialState }
      const storedValue = readValue<T>(stateKey, preserveFalsyValues)
      return { key: stateKey, value: storedValue === undefined ? initialState : storedValue }
    })

    if (state.key !== stateKey) {
      const storedValue = isClientRender ? readValue<T>(stateKey, preserveFalsyValues) : undefined
      updated.current = false
      hydrating.current = !isClientRender
      setState({ key: stateKey, value: storedValue === undefined ? initialState : storedValue })
    }

    useEffect(() => {
      if (!isClientRender && !updated.current) {
        const storedValue = readValue<T>(stateKey, preserveFalsyValues)
        if (storedValue !== undefined) setState({ key: stateKey, value: storedValue })
      }
      hydrating.current = false
    }, [isClientRender, stateKey, preserveFalsyValues])

    const updateValue = useCallback(
      (value: SetStateAction<T>) => {
        const storedValue = hydrating.current && !updated.current ? readValue<T>(stateKey, preserveFalsyValues) : undefined
        updated.current = true
        setState((currentState) => {
          const currentValue = currentState.key === stateKey ? currentState.value : initialStateRef.current
          let newValue: T

          if (typeof value === 'function') {
            newValue = (value as (prev: T) => T)(storedValue === undefined ? currentValue : storedValue)
          } else {
            newValue = value
          }

          try {
            const storageValue = JSON.stringify(newValue)

            window.localStorage.setItem(stateKey, storageValue)
          } catch (e) {
            console.error(e)
          }

          return { key: stateKey, value: newValue }
        })
      },
      [stateKey, preserveFalsyValues],
    )

    return [state.value, updateValue]
  }
}
