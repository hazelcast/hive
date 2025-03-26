import type { Preview } from '@storybook/react'

import './preview.scss'
import 'react-datepicker/dist/react-datepicker.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
