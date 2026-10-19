import { Dispatch, SetStateAction, useRef } from 'react'

import { useThemePreference } from './useThemePreference'
import { type ColorScheme } from '../utils/colorScheme'

export { COLOR_SCHEME_STORAGE_KEY, getColorSchemeBootstrapScript, getSystemColorScheme, initializeColorScheme } from '../utils/colorScheme'
export type { ColorScheme } from '../utils/colorScheme'

export const applyColorScheme = (scheme: ColorScheme) => {
  document.documentElement.style.colorScheme = scheme
}

/** First visit follows the OS; once the user picks a scheme it is stored and wins from then on. */
export const useColorScheme = () => {
  const { scheme, setPreference } = useThemePreference()
  const currentScheme = useRef(scheme)
  currentScheme.current = scheme

  const setScheme: Dispatch<SetStateAction<ColorScheme>> = (nextScheme) => {
    const nextValue = typeof nextScheme === 'function' ? nextScheme(currentScheme.current) : nextScheme
    currentScheme.current = nextValue
    setPreference(nextValue)
  }

  return [scheme, setScheme] as const
}
