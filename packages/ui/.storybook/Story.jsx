import React, { useState, useMemo } from 'react'
import {
  Subheading,
  Anchor,
  Description,
  Canvas,
  Story as StoryOriginal,
} from '@storybook/addon-docs/blocks'
import { Design } from 'storybook-addon-designs/blocks'

const designStyleOpen = {
  visibility: 'visible',
}
const designStyleHidden = {
  visibility: 'hidden',
  position: 'absolute',
  zIndex: -1,
  pointerEvents: 'none',
}

// https://github.com/storybookjs/storybook/blob/next/addons/docs/src/blocks/DocsStory.tsx
export const Story = ({
  id,
  name,
  expanded = true,
  withToolbar = false,
  parameters = {},
}) => {
  let description
  const { docs } = parameters
  if (expanded && docs) {
    description = docs.description?.story
  }

  const subheading = expanded && name

  const [designOpen, setDesignOpen] = useState(false)

  const designURL = parameters.design?.url

  const additionalActions = useMemo(
    () => [
      {
        title: designOpen ? 'Hide design' : 'Show design',
        onClick: () => setDesignOpen((prev) => !prev),
        disabled: !designURL,
      },
    ],
    [designOpen, designURL],
  )

  return (
    <Anchor storyId={id}>
      {subheading && <Subheading>{subheading}</Subheading>}
      {description && <Description markdown={description} />}
      <Canvas withToolbar={withToolbar} additionalActions={additionalActions}>
        <StoryOriginal id={id} />
      </Canvas>
      <Design
        storyId={id}
        style={designOpen ? designStyleOpen : designStyleHidden}
        aria-hidden={!designOpen}
        height={250}
        collapsable={false}
      />
    </Anchor>
  )
}
