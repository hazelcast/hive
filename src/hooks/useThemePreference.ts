import { useEffect, useRef, useState } from 'react'

import { COLOR_SCHEME_STORAGE_KEY, getSystemColorScheme, getThemePreference, type ThemePreference } from '../utils/colorScheme'

export const useThemePreference = () => {
  const [preference, setPreferenceState] = useState(getThemePreference)
  const [systemScheme, setSystemScheme] = useState(getSystemColorScheme)
  const currentPreference = useRef(preference)
  const scheme = preference === 'system' ? systemScheme : preference

  const setPreference = (nextPreference: ThemePreference) => {
    currentPreference.current = nextPreference
    const nextSystemScheme = getSystemColorScheme()
    document.documentElement.style.colorScheme = nextPreference === 'system' ? nextSystemScheme : nextPreference
    setSystemScheme(nextSystemScheme)
    setPreferenceState(nextPreference)
    try {
      window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify(nextPreference))
    } catch {
      return
    }
  }

  useEffect(() => {
    document.documentElement.style.colorScheme = scheme
  }, [scheme])

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return
    const updateSystemScheme = () => {
      const nextScheme = media.matches ? 'dark' : 'light'
      setSystemScheme(nextScheme)
      if (currentPreference.current === 'system') document.documentElement.style.colorScheme = nextScheme
    }
    updateSystemScheme()
    media.addEventListener?.('change', updateSystemScheme)
    return () => media.removeEventListener?.('change', updateSystemScheme)
  }, [])

  return { preference, scheme, setPreference } as const
}
