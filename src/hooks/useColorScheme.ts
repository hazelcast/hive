import { useEffect } from 'react'

import { createPersistedState } from './usePersistedState'

export type ColorScheme = 'light' | 'dark'

export const COLOR_SCHEME_STORAGE_KEY = 'hive-color-scheme'

const usePersistedColorScheme = createPersistedState<ColorScheme>(COLOR_SCHEME_STORAGE_KEY)

export const getSystemColorScheme = (): ColorScheme =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/** First visit follows the OS; once the user picks a scheme it is stored and wins from then on. */
export const useColorScheme = () => {
  const [stored, setScheme] = usePersistedColorScheme(getSystemColorScheme())
  const scheme: ColorScheme = stored === 'light' || stored === 'dark' ? stored : getSystemColorScheme()

  useEffect(() => {
    document.documentElement.style.colorScheme = scheme
  }, [scheme])

  return [scheme, setScheme] as const
}
