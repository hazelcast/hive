import { renderHook } from '@testing-library/react'

import { useDeepEqual } from '../../src/hooks/useDeepEqual'

describe('useDeepEqual', () => {
  const defaultValue = { name: 'Mykola' }
  const value = { name: 'Mykola' }

  it('returns value if the args are deep equal', () => {
    const { result } = renderHook(() => useDeepEqual(value, defaultValue))

    expect(result.current).toEqual(value)
  })
})
