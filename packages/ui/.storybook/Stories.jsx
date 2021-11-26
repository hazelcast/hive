import React, { useContext } from 'react'
import { DocsContext, Heading } from '@storybook/addon-docs/blocks'
import { getDocsStories } from '@storybook/addon-docs/dist/modern/blocks/utils'

import { Story } from './Story'

// https://github.com/storybookjs/storybook/blob/next/addons/docs/src/blocks/Stories.tsx
export const Stories = () => {
  const context = useContext(DocsContext)
  const stories = getDocsStories(context)

  if (!stories || stories.length === 0) {
    return null
  }

  return (
    <>
      <Heading>States</Heading>
      {stories.map(
        (story) => story && <Story key={story.id} {...story} expanded />,
      )}
    </>
  )
}
