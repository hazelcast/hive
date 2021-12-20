import { useCallback, useEffect, useRef } from 'react'

export const useRefValue = <T extends never>(value: T) => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return useCallback(() => ref.current, [])
}
