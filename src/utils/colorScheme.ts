export type ColorScheme = 'light' | 'dark'
export type ThemePreference = ColorScheme | 'system'

export const COLOR_SCHEME_STORAGE_KEY = 'hive-color-scheme'

export const getSystemColorScheme = (): ColorScheme =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const getThemePreference = (): ThemePreference => {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) ?? 'null')
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    return 'system'
  }
  return 'system'
}

const initializeColorSchemeForKey = (storageKey: string): ColorScheme => {
  let storedScheme: unknown

  try {
    storedScheme = JSON.parse(window.localStorage.getItem(storageKey) ?? 'null') as unknown
  } catch {
    storedScheme = undefined
  }

  let scheme: ColorScheme = 'light'
  if (storedScheme === 'light' || storedScheme === 'dark') {
    scheme = storedScheme
  } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    scheme = 'dark'
  }

  document.documentElement.style.colorScheme = scheme
  return scheme
}

export const initializeColorScheme = (): ColorScheme => initializeColorSchemeForKey(COLOR_SCHEME_STORAGE_KEY)

export const getColorSchemeBootstrapScript = (): string =>
  `(${initializeColorSchemeForKey.toString()})(${JSON.stringify(COLOR_SCHEME_STORAGE_KEY)});`
