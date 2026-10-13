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
let lastAppliedScheme: ColorScheme | undefined
let currentScheme = initialScheme

window.addEventListener('message', (event: MessageEvent<{ type?: string; scheme?: ColorScheme }>) => {
  if (event.source !== window.parent || event.origin !== window.location.origin) return
  if (event.data?.type !== 'hive/color-scheme' || (event.data.scheme !== 'light' && event.data.scheme !== 'dark')) return

  currentScheme = event.data.scheme
  localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify(currentScheme))
  applyColorScheme(currentScheme)
  lastAppliedScheme = currentScheme
})

const preview: Preview = {
  decorators: [
    (Story) => {
      // Set on <html> so portalled content (modals, tooltips) follows the scheme too
      if (currentScheme !== lastAppliedScheme) {
        applyColorScheme(currentScheme)
        lastAppliedScheme = currentScheme
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
