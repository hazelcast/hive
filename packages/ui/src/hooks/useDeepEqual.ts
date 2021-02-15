import { useRef } from 'react'
import deepEqual from 'dequal'

export const useDeepEqual = <T>(value: T, defaultValue: T) => {
  const ref = useRef(defaultValue)

  if (!deepEqual(ref.current, value)) {
    ref.current = value
  }

  return ref.current
}
