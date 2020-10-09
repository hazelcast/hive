import React, { useContext } from 'react'
import { DocsContext } from '@storybook/addon-docs/blocks'
import { getDocsStories } from '@storybook/addon-docs/dist/blocks/utils'

import { Story } from './Story'

// https://github.com/storybookjs/storybook/blob/next/addons/docs/src/blocks/Primary.tsx
export const Primary = () => {
  const context = useContext(DocsContext)
  const componentStories = getDocsStories(context)
  const story = componentStories[0]
  return story ? <Story {...story} expanded={false} withToolbar /> : null
}
