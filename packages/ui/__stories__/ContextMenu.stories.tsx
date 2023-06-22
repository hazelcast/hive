import React, { useState } from 'react'
import { Story } from '@storybook/react'

import { ContextMenu, ContextMenuProps } from '../src/ContextMenu'

const noOp = () => undefined

export default {
  title: 'Components/ContextMenu',
  component: ContextMenu,
}

const Template: Story<ContextMenuProps> = (args) => <ContextMenu {...args} />

export const Default: Story<ContextMenuProps> = (args) => {
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
