import React, { useContext } from 'react'
import { DocsContext, Heading } from '@storybook/addon-docs/blocks'

import { Story } from './Story'

// https://github.com/storybookjs/storybook/blob/next/addons/docs/src/blocks/Stories.tsx
export const Stories = () => {
  const { componentStories } = useContext(DocsContext);

  let stories = componentStories();

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
