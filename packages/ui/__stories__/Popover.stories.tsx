import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import { Popover, PopoverProps } from '../src/Popover'
import { Button } from '../src/Button'

export default {
  title: 'Components/Popover',
  component: Popover,
  args: {
    placement: 'auto',
    open: false,
  },
} as Meta<PopoverProps>

export const Default = (args: PopoverProps) => {
  const [open, setOpen] = useState(false)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>()

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
      <Button ref={setAnchorElement} onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
      <Popover {...args} onClose={() => setOpen(false)} open={open} anchorElement={anchorElement}>
        <div>Content</div>
        <div>Content</div>
        <Button>Click</Button>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </Popover>
    </div>
  )
}

export const Menu = (args: PopoverProps) => {
  const [open, setOpen] = useState(false)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>()

  const handleClose = () => setOpen(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
      <Button ref={setAnchorElement} onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
      <Popover {...args} onClose={handleClose} open={open} anchorElement={anchorElement}>
        <button onClick={handleClose}>Item</button>
        <button onClick={handleClose}>Item1</button>
        <button onClick={handleClose}>Item2</button>
        <button onClick={handleClose}>Item2</button>
        <button onClick={handleClose}>Item3</button>
      </Popover>
    </div>
  )
}
