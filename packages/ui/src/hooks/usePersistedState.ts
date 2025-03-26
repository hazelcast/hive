import { Dispatch, SetStateAction, useCallback, useState } from 'react'

const readValue = <T>(key: string): T | undefined => {
  try {
    return JSON.parse(<string>window.localStorage.getItem(key)) as T
  } catch (e) {
    return undefined
  }
}

export const createPersistedState = <T>(key: string): ((state: T) => [T, Dispatch<SetStateAction<T>>]) => {
  return (initialState: T) => {
    const [value, setValue] = useState<T>(readValue(key) || initialState)

    const updateValue = useCallback((value: SetStateAction<T>) => {
      setValue((currentValue) => {
        let newValue: T

        if (typeof value === 'function') {
          newValue = (value as (prev: T) => T)(currentValue)
        } else {
          newValue = value
        }

        try {
          const storageValue = JSON.stringify(newValue)

          window.localStorage.setItem(key, storageValue)
        } catch (e) {
          console.error(e)
        }

        return newValue
      })
    }, [])

    return [value, updateValue]
  }
}
