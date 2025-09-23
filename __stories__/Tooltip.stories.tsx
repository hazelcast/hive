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
    placement: 'bottom',
    content: 'This is a nice tooltip!',
    visible: true,
  },
} as Meta<TooltipProps>

const Template: StoryFn<TooltipProps> = (args) => (
  <>
    <div className={styles.wrapper}>
      <Tooltip {...args}>
        {(ref) => (
          <Button ref={ref} aria-labelledby={args.id} style={{ height: 80 }}>
            This button has a tooltip
          </Button>
        )}
      </Tooltip>
      <Tooltip color="dark" {...args}>
        {(ref) => (
          <Button ref={ref} aria-labelledby={args.id} style={{ height: 80 }}>
            This button has a tooltip
          </Button>
        )}
      </Tooltip>
    </div>
    <div className={styles.wrapper}>
      <Tooltip color="secondary" {...args}>
        {(ref) => (
          <Button ref={ref} aria-labelledby={args.id} style={{ height: 80 }}>
            This button has a tooltip
          </Button>
        )}
      </Tooltip>
    </div>
  </>
)

export const AutoPlacement = Template.bind({})
AutoPlacement.args = {
  placement: 'top',
  autoPlacement: true,
  id: 'tooltip-story-auto',
}

export const TopPlacement = Template.bind({})
TopPlacement.args = {
  placement: 'top',
  id: 'tooltip-story-top',
}

export const TopStartPlacement = Template.bind({})
TopStartPlacement.args = {
  placement: 'top-start',
  id: 'tooltip-story-top-start',
}

export const TopEndPlacement = Template.bind({})
TopEndPlacement.args = {
  placement: 'top-end',
  id: 'tooltip-story-top-end',
}

export const BottomPlacement = Template.bind({})
BottomPlacement.args = {
  placement: 'bottom',
  id: 'tooltip-story-bottom',
}

export const BottomStartPlacement = Template.bind({})
BottomStartPlacement.args = {
  placement: 'bottom-start',
  id: 'tooltip-story-bottom-start',
}

export const BottomEndPlacement = Template.bind({})
BottomEndPlacement.args = {
  placement: 'bottom-end',
  id: 'tooltip-story-bottom-end',
}

export const RightPlacement = Template.bind({})
RightPlacement.args = {
  placement: 'right',
  id: 'tooltip-story-right',
}

export const RightStartPlacement = Template.bind({})
RightStartPlacement.args = {
  placement: 'right-start',
  id: 'tooltip-story-right-start',
}

export const RightEndPlacement = Template.bind({})
RightEndPlacement.args = {
  placement: 'right-end',
  id: 'tooltip-story-right-end',
}

export const LeftPlacement = Template.bind({})
LeftPlacement.args = {
  placement: 'left',
  id: 'tooltip-story-left',
}

export const LeftStartPlacement = Template.bind({})
LeftStartPlacement.args = {
  placement: 'left-start',
  id: 'tooltip-story-left-start',
}

export const LeftEndPlacement = Template.bind({})
LeftEndPlacement.args = {
  placement: 'left-end',
  id: 'tooltip-story-left-end',
}

export const WithInteractiveContent = Template.bind({})
WithInteractiveContent.args = {
  placement: 'top',
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
  visible: false,
  id: 'tooltip-story-invisible',
}

export const Visible = Template.bind({})
Visible.args = {
  visible: true,
  id: 'tooltip-story-visible',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  visible: undefined,
  id: 'tooltip-story-disabled',
}

export const WithTooltip: StoryFn<TooltipProps> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <Tooltip
      content={
        <Tooltip content="internal tooltip2" id="root_tooltip">
          {(internalRef) => <span ref={internalRef}>tooltip2</span>}
        </Tooltip>
      }
      id="root"
    >
      {(ref) => (
        <div ref={ref} style={{ height: 80 }}>
          This element has a{' '}
          <Tooltip content="internal tooltip" id="internal">
            {(internalRef) => <span ref={internalRef}>tooltip</span>}
          </Tooltip>
        </div>
      )}
    </Tooltip>
  </div>
)
