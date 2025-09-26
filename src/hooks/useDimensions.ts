import { RefObject, useCallback, useEffect, useState } from 'react'
import useEvent from 'react-use/lib/useEvent'

export type Dimensions = {
  width: number
  height: number
}

export const useDimensions = (ref: RefObject<HTMLElement | null>): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  const handleResize = useCallback(() => {
    if (ref.current) {
      setDimensions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight })
    }
  }, [ref])

  useEvent('resize', handleResize)

  useEffect(() => {
    handleResize()
  }, [handleResize, ref])

  return dimensions
}
