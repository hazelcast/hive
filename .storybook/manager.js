import React from 'react'
import { addons, types } from '@storybook/manager-api'
import { IconButton } from '@storybook/components'
import { MoonIcon, SunIcon } from '@storybook/icons'

import { customTheme } from './theme'

const COLOR_SCHEME_STORAGE_KEY = 'hive-color-scheme'

const getSystemColorScheme = () => (globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const getInitialColorScheme = () => {
  try {
    const stored = JSON.parse(globalThis.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) ?? 'null')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    return getSystemColorScheme()
  }

  return getSystemColorScheme()
}

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: false,
  },
})

const ColorSchemeTool = () => {
  const [scheme, setScheme] = React.useState(getInitialColorScheme)
  const isDark = scheme === 'dark'

  const toggle = () => {
    const nextScheme = isDark ? 'light' : 'dark'
    globalThis.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify(nextScheme))
    setScheme(nextScheme)
    globalThis.document
      .getElementById('storybook-preview-iframe')
      ?.contentWindow?.postMessage({ type: 'hive/color-scheme', scheme: nextScheme }, globalThis.window.location.origin)
  }

  return React.createElement(
    IconButton,
    {
      title: `Switch to ${isDark ? 'light' : 'dark'} mode`,
      onClick: toggle,
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
