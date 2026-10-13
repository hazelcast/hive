import type { Preview } from '@storybook/react'

import './preview.scss'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/variables.css'
import { applyColorScheme, COLOR_SCHEME_STORAGE_KEY, ColorScheme, getSystemColorScheme } from '../src/hooks/useColorScheme'

const readStoredScheme = (): ColorScheme | undefined => {
  try {
    const value = JSON.parse(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) ?? 'null') as unknown
    return value === 'light' || value === 'dark' ? value : undefined
  } catch {
    return undefined
  }
}

const initialScheme = readStoredScheme() ?? getSystemColorScheme()
let lastScheme = initialScheme
let lastAppliedScheme: ColorScheme | undefined

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Color scheme',
    },
  },
  initialGlobals: {
    colorScheme: initialScheme,
  },
  decorators: [
    (Story, { globals }) => {
      const scheme = (globals.colorScheme as ColorScheme | undefined) ?? initialScheme
      // Set on <html> so portalled content (modals, tooltips) follows the scheme too
      if (scheme !== lastAppliedScheme) {
        applyColorScheme(scheme)
        lastAppliedScheme = scheme
      }
      // Same rule as useColorScheme: persist only an explicit user change
      if (scheme !== lastScheme) {
        localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify(scheme))
        lastScheme = scheme
      }
      return Story()
    },
  ],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Visual Style', 'Getting Started', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
