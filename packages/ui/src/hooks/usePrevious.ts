import { useRef, useEffect } from 'react'

export const usePrevious = <T extends never>(value: T) => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
