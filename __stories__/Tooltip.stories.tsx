import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Tooltip, TooltipProps } from '../src/components/Tooltip'
import { Button } from '../src/components/Button'

import styles from './Tooltip.stories.module.scss'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kaC3jgqMSgqMEgnv7TIse1/%F0%9F%93%90Sign-in-flow?node-id=118%3A2349',
    },
  },
  args: {
    id: 'tooltip-story-auto',
    side: 'bottom',
    content: 'This is a nice tooltip!',
  },
  argTypes: {
    // children is the trigger element — managed by the story template, not controls
    children: { control: false, table: { disable: true } },
  },
} as Meta<TooltipProps>

const Template: StoryFn<TooltipProps> = ({ children: _trigger, ...args }) => (
  <>
    <div className={styles.wrapper}>
      <Tooltip {...args}>
        <Button aria-labelledby={args.id} style={{ height: 80 }}>
          This button has a tooltip
        </Button>
      </Tooltip>
      <Tooltip color="dark" {...args}>
        <Button aria-labelledby={args.id} style={{ height: 80 }}>
          This button has a tooltip
        </Button>
      </Tooltip>
    </div>
    <div className={styles.wrapper}>
      <Tooltip color="secondary" {...args}>
        <Button aria-labelledby={args.id} style={{ height: 80 }}>
          This button has a tooltip
        </Button>
      </Tooltip>
    </div>
  </>
)

export const Default = Template.bind({})
Default.args = {
  side: 'top',
  avoidCollisions: true,
  id: 'tooltip-story-default',
}

export const TopSide = Template.bind({})
TopSide.args = {
  side: 'top',
  id: 'tooltip-story-top',
}

export const TopStart = Template.bind({})
TopStart.args = {
  side: 'top',
  align: 'start',
  id: 'tooltip-story-top-start',
}

export const TopEnd = Template.bind({})
TopEnd.args = {
  side: 'top',
  align: 'end',
  id: 'tooltip-story-top-end',
}

export const BottomSide = Template.bind({})
BottomSide.args = {
  side: 'bottom',
  id: 'tooltip-story-bottom',
}

export const BottomStart = Template.bind({})
BottomStart.args = {
  side: 'bottom',
  align: 'start',
  id: 'tooltip-story-bottom-start',
}

export const BottomEnd = Template.bind({})
BottomEnd.args = {
  side: 'bottom',
  align: 'end',
  id: 'tooltip-story-bottom-end',
}

export const RightSide = Template.bind({})
RightSide.args = {
  side: 'right',
  id: 'tooltip-story-right',
}

export const RightStart = Template.bind({})
RightStart.args = {
  side: 'right',
  align: 'start',
  id: 'tooltip-story-right-start',
}

export const RightEnd = Template.bind({})
RightEnd.args = {
  side: 'right',
  align: 'end',
  id: 'tooltip-story-right-end',
}

export const LeftSide = Template.bind({})
LeftSide.args = {
  side: 'left',
  id: 'tooltip-story-left',
}

export const LeftStart = Template.bind({})
LeftStart.args = {
  side: 'left',
  align: 'start',
  id: 'tooltip-story-left-start',
}

export const LeftEnd = Template.bind({})
LeftEnd.args = {
  side: 'left',
  align: 'end',
  id: 'tooltip-story-left-end',
}

export const WithInteractiveContent = Template.bind({})
WithInteractiveContent.args = {
  side: 'top',
  id: 'tooltip-story-with-interactive-content',
  content: (
    <>
      <p>
        Parley come about mutiny swing the lead to go on account run a shot across the bow schooner fathom bounty carouser. Maroon killick
        keel driver scourge of the seven seas Jolly Roger hands spyglass Brethren of the Coast booty. Boom rigging gally Plate Fleet pink
        dance the hempen jig bilge water measured fer yer chains take a caulk tender.
      </p>

      <Button>Aye Captain!</Button>
    </>
  ),
}

export const Invisible = Template.bind({})
Invisible.args = {
  open: false,
  id: 'tooltip-story-invisible',
}

export const Visible = Template.bind({})
Visible.args = {
  open: true,
  id: 'tooltip-story-visible',
}

export const Nested: StoryFn<TooltipProps> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <Tooltip
      content={
        <Tooltip content="internal tooltip2" id="root_tooltip">
          <span>tooltip2</span>
        </Tooltip>
      }
      id="root"
    >
      <div style={{ height: 80 }}>
        This element has a{' '}
        <Tooltip content="internal tooltip" id="internal">
          <span>tooltip</span>
        </Tooltip>
      </div>
    </Tooltip>
  </div>
)
