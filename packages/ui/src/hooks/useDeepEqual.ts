import { useRef } from 'react'
import { dequal } from 'dequal'

export const useDeepEqual = <T>(value: T, defaultValue: T) => {
  const ref = useRef(defaultValue)

  if (!dequal(ref.current, value)) {
    ref.current = value
  }

  return ref.current
}
