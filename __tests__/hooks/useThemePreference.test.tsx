import { act, renderHook } from '@testing-library/react'

import { useThemePreference } from '../../src/hooks/useThemePreference'
import { COLOR_SCHEME_STORAGE_KEY } from '../../src/utils/colorScheme'

describe('useThemePreference', () => {
  let media: { matches: boolean; addEventListener: jest.Mock; removeEventListener: jest.Mock }
  let listener: () => void

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.style.colorScheme = ''
    media = {
      matches: false,
      addEventListener: jest.fn((event, callback) => {
        listener = callback
      }),
      removeEventListener: jest.fn(),
    }
    window.matchMedia = jest.fn().mockReturnValue(media)
  })

  it('defaults to System without saving an implicit preference', () => {
    const { result } = renderHook(useThemePreference)
    expect(result.current.preference).toBe('system')
    expect(result.current.scheme).toBe('light')
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBeNull()
  })

  it('follows OS changes only when System is selected', () => {
    const { result } = renderHook(useThemePreference)
    act(() => {
      media.matches = true
      listener()
    })
    expect(result.current.scheme).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    act(() => result.current.setPreference('light'))
    act(() => {
      media.matches = true
      listener()
    })
    expect(result.current.scheme).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    act(() => result.current.setPreference('system'))
    expect(result.current.scheme).toBe('dark')
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBe('"system"')
  })

  it.each(['light', 'dark', 'system'] as const)('restores a saved %s preference', (preference) => {
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify(preference))
    const { result } = renderHook(useThemePreference)
    expect(result.current.preference).toBe(preference)
  })

  it('unsubscribes from OS changes on unmount', () => {
    const { unmount } = renderHook(useThemePreference)
    unmount()
    expect(media.removeEventListener).toHaveBeenCalledWith('change', listener)
  })

  it('still applies changes when localStorage is unavailable', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const { result } = renderHook(useThemePreference)
    act(() => result.current.setPreference('dark'))
    expect(result.current.scheme).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    spy.mockRestore()
  })
})
