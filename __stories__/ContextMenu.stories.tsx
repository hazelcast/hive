import React, { useState } from 'react'
import { StoryFn } from '@storybook/react'

import { ContextMenu, ContextMenuProps } from '../src/components/ContextMenu'

const noOp = () => undefined

export default {
  title: 'Components/ContextMenu',
  component: ContextMenu,
}

const Template: StoryFn<ContextMenuProps> = (args) => <ContextMenu {...args} />

export const Default: StoryFn<ContextMenuProps> = (args) => {
  const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null)

  return (
    <>
      <div ref={setAnchorElement} style={{ height: 50 }}>
        Right click
      </div>
      <Template {...args} anchorElement={anchorElement} />
    </>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
Default.args = {
  items: [
    { content: 'Item 1', onClick: noOp },
    {
      content: (
        <span>
          <b>HTML</b> content
        </span>
      ),
      onClick: noOp,
    },
  ],
}
