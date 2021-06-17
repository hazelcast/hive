import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Tooltip, TooltipProps } from '../src/Tooltip'
import { Button } from '../src/Button'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  arameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kaC3jgqMSgqMEgnv7TIse1/%F0%9F%93%90Sign-in-flow?node-id=118%3A2349',
    },
  },
  args: {
    id: 'tooltip-story-auto',
    placement: 'auto',
    content: 'This is a nice tooltip!',
    visible: true,
  },
} as Meta<TooltipProps>

const Template: Story<TooltipProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <Tooltip {...args}>
      {(ref) => (
        <Button ref={ref} aria-labelledby={args.id} style={{ height: 80 }}>
          This button has a tooltip
        </Button>
      )}
    </Tooltip>
  </div>
)

export const AutoPlacement = Template.bind({})

export const AutoStartPlacement = Template.bind({})
AutoStartPlacement.args = {
  placement: 'auto-start',
  id: 'tooltip-story-auto-start',
}

export const AutoEndPlacement = Template.bind({})
AutoEndPlacement.args = {
  placement: 'auto-end',
  id: 'tooltip-story-auto-end',
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
