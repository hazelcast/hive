import type { Preview } from '@storybook/react'

import './preview.scss'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/variables.css'

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Color scheme',
        icon: 'mirror',
        items: [
          { value: 'light dark', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorScheme: 'light dark',
  },
  decorators: [
    (Story, { globals }) => {
      // Set on <html> so portalled content (modals, tooltips) follows the scheme too
      document.documentElement.style.colorScheme = globals.colorScheme ?? 'light dark'
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
