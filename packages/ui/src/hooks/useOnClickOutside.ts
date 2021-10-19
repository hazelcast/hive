import { useCallback, useEffect } from 'react'
import { useRefValue } from './useRefValue'

type RefElement = HTMLElement | null | undefined

export const containsElement = (target: RefElement, element: Node) => target?.contains(element)

export const useOnClickOutside = (
  active: boolean,
  opts: { target: RefElement; handler: (event: Event) => void; excludeElement?: RefElement },
) => {
  const { target, handler, excludeElement } = opts
  const getOutsideClickHandler = useRefValue(handler)

  const listener = useCallback(
    (event: Event) => {
      const element = event.target as Node

      if (!containsElement(target, element) && !containsElement(excludeElement, element)) {
        getOutsideClickHandler()(event)
      }
    },
    [target, excludeElement, getOutsideClickHandler],
  )

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
    }

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [listener, active])
}
