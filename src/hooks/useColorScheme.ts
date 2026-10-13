import { Dispatch, SetStateAction, useEffect } from 'react'

import { createPersistedState } from './usePersistedState'
import { COLOR_SCHEME_STORAGE_KEY, getSystemColorScheme, type ColorScheme } from '../utils/colorScheme'

export { COLOR_SCHEME_STORAGE_KEY, getColorSchemeBootstrapScript, getSystemColorScheme, initializeColorScheme } from '../utils/colorScheme'
export type { ColorScheme } from '../utils/colorScheme'

const usePersistedColorScheme = createPersistedState<ColorScheme>(COLOR_SCHEME_STORAGE_KEY)

export const applyColorScheme = (scheme: ColorScheme) => {
  document.documentElement.style.colorScheme = scheme
}

/** First visit follows the OS; once the user picks a scheme it is stored and wins from then on. */
export const useColorScheme = () => {
  const [stored, setStoredScheme] = usePersistedColorScheme(getSystemColorScheme())
  const scheme: ColorScheme = stored === 'light' || stored === 'dark' ? stored : getSystemColorScheme()

  const setScheme: Dispatch<SetStateAction<ColorScheme>> = (nextScheme) => {
    const nextValue = typeof nextScheme === 'function' ? nextScheme(scheme) : nextScheme
    applyColorScheme(nextValue)
    setStoredScheme(nextValue)
  }

  useEffect(() => {
    applyColorScheme(scheme)
  }, [scheme])

  return [scheme, setScheme] as const
}
