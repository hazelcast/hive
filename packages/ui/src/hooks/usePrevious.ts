import { useRef, useEffect } from 'react'

export const usePrevious = <T extends unknown>(value: T) => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
