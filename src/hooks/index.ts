/* export only hooks for external usage */
export { useOnClickOutside, containsElement } from './useOnClickOutside'
export { useIsMounted } from './useIsMounted'
export { useRefValue } from './useRefValue'
export { useOpenCloseState } from './useOpenCloseState'
export * from './usePersistedState'
export {
  applyColorScheme,
  COLOR_SCHEME_STORAGE_KEY,
  getColorSchemeBootstrapScript,
  getSystemColorScheme,
  initializeColorScheme,
  useColorScheme,
} from './useColorScheme'
export type { ColorScheme } from './useColorScheme'
export { useThemePreference } from './useThemePreference'
export type { ThemePreference } from '../utils/colorScheme'
