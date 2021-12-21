import { getHookRes, testHook } from '@hazelcast/test-helpers'
import { useDeepEqual } from '../../src/hooks/useDeepEqual'

describe('useDeepEqual', () => {
  const defaultValue = { name: 'Mykola' }
  const value = { name: 'Mykola' }

  it('returns value if the args are deep equal', () => {
    const { spyHookRes } = testHook(() => useDeepEqual(value, defaultValue))
    const result = getHookRes(spyHookRes)
    expect(result).toEqual(value)
  })
})
