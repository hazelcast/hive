import React, { useContext } from 'react'
import { DocsContext } from '@storybook/addon-docs/blocks'

import { Story } from './Story'

// https://github.com/storybookjs/storybook/blob/next/addons/docs/src/blocks/Primary.tsx
export const Primary = () => {
  const { componentStories } = useContext(DocsContext);
  let stories = componentStories();
  const story = stories[0]
  return story ? <Story {...story} expanded={false} withToolbar /> : null
}
