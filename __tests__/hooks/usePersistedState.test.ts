import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server.node'

import { createPersistedState } from '../../src/hooks/usePersistedState'

describe('createPersistedState', () => {
  beforeEach(() => localStorage.clear())

  it.each(['stored', false, 0])('hydrates server markup before restoring %p', async (storedValue) => {
    const usePersistedState = createPersistedState<string | boolean | number>('persisted-test', { preserveFalsyValues: true })
    const Component = () => {
      const [value] = usePersistedState('initial')
      return React.createElement('span', null, String(value))
    }
    const container = document.createElement('div')
    container.innerHTML = renderToString(React.createElement(Component))
    localStorage.setItem('persisted-test', JSON.stringify(storedValue))
    const onRecoverableError = jest.fn()
    let root: ReturnType<typeof hydrateRoot>

    await act(async () => {
      root = hydrateRoot(container, React.createElement(Component), { onRecoverableError })
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(container.textContent).toBe(String(storedValue))
    await act(async () => root.unmount())
  })

  it('applies an update during hydration to the stored value without overwriting it later', async () => {
    const usePersistedState = createPersistedState<number>('persisted-test')
    const Child = ({ update }: { update: React.Dispatch<React.SetStateAction<number>> }) => {
      React.useLayoutEffect(() => update((value) => value + 1), [update])
      return null
    }
    const Component = () => {
      const [value, update] = usePersistedState(0)
      return React.createElement(React.Fragment, null, React.createElement('span', null, value), React.createElement(Child, { update }))
    }
    const container = document.createElement('div')
    container.innerHTML = renderToString(React.createElement(Component))
    localStorage.setItem('persisted-test', '5')
    const onRecoverableError = jest.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, React.createElement(Component), { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(container.textContent).toBe('6')
    expect(localStorage.getItem('persisted-test')).toBe('6')
    await act(async () => root.unmount())
  })

  it('uses the initial value for stored false during default hydration', async () => {
    const usePersistedState = createPersistedState<boolean>('persisted-test')
    const Component = () => React.createElement('span', null, String(usePersistedState(true)[0]))
    const container = document.createElement('div')
    container.innerHTML = renderToString(React.createElement(Component))
    localStorage.setItem('persisted-test', 'false')
    const onRecoverableError = jest.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, React.createElement(Component), { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(container.textContent).toBe('true')
    await act(async () => root.unmount())
  })

  it.each([false, 0, '', null])('restores stored %p after remount', (storedValue) => {
    const usePersistedState = createPersistedState<unknown>('persisted-test', { preserveFalsyValues: true })
    const { result, unmount } = renderHook(() => usePersistedState('initial'))

    act(() => result.current[1](storedValue))
    unmount()

    const restored = renderHook(() => usePersistedState('initial'))
    expect(restored.result.current[0]).toBe(storedValue)
  })

  it.each([false, 0, '', null])('defaults to the initial value for stored %p', (storedValue) => {
    localStorage.setItem('persisted-test', JSON.stringify(storedValue))
    const usePersistedState = createPersistedState<unknown>('persisted-test')
    const { result } = renderHook(() => usePersistedState('initial'))
    expect(result.current[0]).toBe('initial')
  })

  it.each([null, 'invalid json'])('uses the initial value for missing or invalid storage: %p', (storedValue) => {
    if (storedValue !== null) localStorage.setItem('persisted-test', storedValue)
    const usePersistedState = createPersistedState('persisted-test')

    const { result } = renderHook(() => usePersistedState('initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('switches keys without writing the previous key value to the new key', () => {
    localStorage.setItem('first', '5')
    localStorage.setItem('second', '10')
    const { result, rerender } = renderHook(({ key }) => createPersistedState<number>(key)(0), { initialProps: { key: 'first' } })

    expect(result.current[0]).toBe(5)
    rerender({ key: 'second' })
    expect(result.current[0]).toBe(10)
    act(() => result.current[1]((value) => value + 1))
    expect(localStorage.getItem('second')).toBe('11')
    expect(localStorage.getItem('first')).toBe('5')
    rerender({ key: 'missing' })
    expect(result.current[0]).toBe(0)
    act(() => result.current[1]((value) => value + 1))
    expect(localStorage.getItem('missing')).toBe('1')
  })

  it('updates the new key from its stored value in a layout effect', () => {
    localStorage.setItem('first', '5')
    localStorage.setItem('second', '10')
    const Component = ({ storageKey }: { storageKey: string }) => {
      const [value, update] = createPersistedState<number>(storageKey)(0)
      React.useLayoutEffect(() => update((previous) => previous + 1), [update])
      return React.createElement('span', null, value)
    }
    const { rerender } = renderHook(({ storageKey }) => Component({ storageKey }), { initialProps: { storageKey: 'first' } })
    expect(localStorage.getItem('first')).toBe('6')
    rerender({ storageKey: 'second' })
    expect(localStorage.getItem('first')).toBe('6')
    expect(localStorage.getItem('second')).toBe('11')
  })
})
