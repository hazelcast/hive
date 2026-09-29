import { act, renderHook } from '@testing-library/react'

import { COLOR_SCHEME_STORAGE_KEY, useColorScheme } from '../../src/hooks/useColorScheme'

const mockSystemScheme = (dark: boolean) => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: dark && query === '(prefers-color-scheme: dark)',
    media: query,
  }))
}

describe('useColorScheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.style.colorScheme = ''
  })

  it('uses the system scheme on first visit without persisting it', () => {
    mockSystemScheme(true)
    const { result } = renderHook(() => useColorScheme())

    expect(result.current[0]).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBeNull()
  })

  it('persists the user choice and applies it', () => {
    mockSystemScheme(true)
    const { result } = renderHook(() => useColorScheme())

    act(() => result.current[1]('light'))

    expect(result.current[0]).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBe('"light"')
  })

  it('prefers the stored choice over the system scheme', () => {
    mockSystemScheme(true)
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, '"light"')
    const { result } = renderHook(() => useColorScheme())

    expect(result.current[0]).toBe('light')
  })

  it('falls back to the system scheme when the stored value is invalid', () => {
    mockSystemScheme(false)
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, '"blue"')
    const { result } = renderHook(() => useColorScheme())

    expect(result.current[0]).toBe('light')
  })
})
