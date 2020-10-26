import { addons } from '@storybook/addons'

import { customTheme } from './theme'
import '../styles/fonts.css'

addons.setConfig({
  theme: customTheme,
})
