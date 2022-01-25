import { canUseDOM } from './ssr'

export type PortalContainer = 'body' | 'referenceElement' | string | HTMLElement

export const getPortalContainer = (container: PortalContainer, referenceElement?: HTMLElement | null): HTMLElement | null => {
  if (container === 'body') {
    // There is no document is SSR environment
    return canUseDOM ? document.body : null
  }

  if (container === 'referenceElement') {
    return referenceElement ?? null
  }

  if (typeof container === 'string') {
    return canUseDOM ? document.getElementById(container) : null
  }

  return container
}
