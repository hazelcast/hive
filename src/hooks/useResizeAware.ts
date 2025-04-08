import { useMemo, useEffect } from 'react'
import debounce from 'lodash/debounce'

import { useRefValue } from './useRefValue'

export const useResizeAware = (el: HTMLElement | undefined | null, callback: () => void, options = { delay: 200 }) => {
  const getOnResize = useRefValue(callback)
  const onResize = useMemo(
    () =>
      debounce(() => {
        const cb = getOnResize()

        if (cb) {
          cb()
        }
      }, options.delay),
    [getOnResize, options.delay],
  )
  const observer = useMemo(() => new ResizeObserver(onResize), [onResize])

  useEffect(() => {
    if (el) {
      observer.observe(el)
    }

    return () => {
      onResize.cancel()
      if (el) {
        observer.unobserve(el)
      }
    }
  }, [el, observer, onResize])
}
