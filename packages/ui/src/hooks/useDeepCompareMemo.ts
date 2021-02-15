import { DependencyList, useMemo } from 'react'

import { useDeepEqual } from './useDeepEqual'

export const useDeepCompareMemo = <T>(fn: () => T, deps: DependencyList) => {
  const depsMemoized = useDeepEqual(deps, [])
  return useMemo(fn, depsMemoized)
}
