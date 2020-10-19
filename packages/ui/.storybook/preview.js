import React from 'react'
import { withDesign } from 'storybook-addon-designs'

import { CustomDocsPage } from './CustomDocsPage'

import './preview.scss'

export const decorators = [
  (Story) => (
    <div style={{ margin: 50 }}>
      <Story />
    </div>
  ),
  withDesign,
]

export const parameters = {
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  viewMode: 'docs',
  docs: {
    page: CustomDocsPage,
  },
}
