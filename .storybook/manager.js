import React from 'react'
import { addons, types, useGlobals } from '@storybook/manager-api'
import { IconButton } from '@storybook/components'
import { MoonIcon, SunIcon } from '@storybook/icons'

import { customTheme } from './theme'

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: false,
  },
})

const ColorSchemeTool = () => {
  const [{ colorScheme }, updateGlobals] = useGlobals()
  const isDark = colorScheme === 'dark'

  return React.createElement(
    IconButton,
    {
      title: `Switch to ${isDark ? 'light' : 'dark'} mode`,
      onClick: () => updateGlobals({ colorScheme: isDark ? 'light' : 'dark' }),
    },
    React.createElement(isDark ? SunIcon : MoonIcon),
  )
}

addons.register('hive/color-scheme', () => {
  addons.add('hive/color-scheme/tool', {
    type: types.TOOL,
    title: 'Color scheme',
    match: ({ viewMode, tabId }) => !!viewMode && /^(story|docs)$/.test(viewMode) && !tabId,
    render: () => React.createElement(ColorSchemeTool),
  })
})
