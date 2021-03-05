import { useRef } from 'react'
import { dequal } from 'dequal'

export const useDeepEqual = <T>(value: T, defaultValue: T) => {
  const ref = useRef(defaultValue)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!dequal(ref.current, value)) {
    ref.current = value
  }

  return ref.current
}
