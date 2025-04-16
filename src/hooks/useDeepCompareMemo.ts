import { DependencyList, useMemo } from 'react'

import { useDeepEqual } from './useDeepEqual'

export const useDeepCompareMemo = <T>(fn: () => T, deps: DependencyList) => {
  const depsMemoized = useDeepEqual(deps, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, depsMemoized)
}
