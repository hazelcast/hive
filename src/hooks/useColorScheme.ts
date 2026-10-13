import { Dispatch, SetStateAction, useEffect } from 'react'

import { createPersistedState } from './usePersistedState'
import { COLOR_SCHEME_STORAGE_KEY, getSystemColorScheme, type ColorScheme } from '../utils/colorScheme'

export { COLOR_SCHEME_STORAGE_KEY, getColorSchemeBootstrapScript, getSystemColorScheme, initializeColorScheme } from '../utils/colorScheme'
export type { ColorScheme } from '../utils/colorScheme'
const THEME_CHANGE_ATTRIBUTE = 'data-hive-theme-changing'
let themeChangeId = 0

const usePersistedColorScheme = createPersistedState<ColorScheme>(COLOR_SCHEME_STORAGE_KEY)

export const applyColorScheme = (scheme: ColorScheme) => {
  const root = document.documentElement
  const currentChangeId = ++themeChangeId

  root.setAttribute(THEME_CHANGE_ATTRIBUTE, '')
  root.style.colorScheme = scheme

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (currentChangeId === themeChangeId) root.removeAttribute(THEME_CHANGE_ATTRIBUTE)
    })
  })
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
