import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { SimpleTooltip, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, type SimpleTooltipProps } from '../src/components/Tooltip'
import { Button } from '../src/components/Button'

export default {
  title: 'Components/Tooltip',
  component: SimpleTooltip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kaC3jgqMSgqMEgnv7TIse1/%F0%9F%93%90Sign-in-flow?node-id=118%3A2349',
    },
  },
  args: {
    placement: 'bottom',
    content: 'This is a nice tooltip!',
  },
  argTypes: {
    children: { control: false },
    open: { control: false },
  },
} as Meta<SimpleTooltipProps>

const Template: StoryFn<SimpleTooltipProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320, gap: 16 }}>
    <SimpleTooltip {...args}>
      <Button style={{ height: 80 }}>This button has a tooltip</Button>
    </SimpleTooltip>
  </div>
)

export const AutoPlacement = Template.bind({})
AutoPlacement.args = { placement: 'top' }

export const TopPlacement = Template.bind({})
TopPlacement.args = { placement: 'top' }

export const TopStartPlacement = Template.bind({})
TopStartPlacement.args = { placement: 'top-start' }

export const TopEndPlacement = Template.bind({})
TopEndPlacement.args = { placement: 'top-end' }

export const BottomPlacement = Template.bind({})
BottomPlacement.args = { placement: 'bottom' }

export const BottomStartPlacement = Template.bind({})
BottomStartPlacement.args = { placement: 'bottom-start' }

export const BottomEndPlacement = Template.bind({})
BottomEndPlacement.args = { placement: 'bottom-end' }

export const RightPlacement = Template.bind({})
RightPlacement.args = { placement: 'right' }

export const RightStartPlacement = Template.bind({})
RightStartPlacement.args = { placement: 'right-start' }

export const RightEndPlacement = Template.bind({})
RightEndPlacement.args = { placement: 'right-end' }

export const LeftPlacement = Template.bind({})
LeftPlacement.args = { placement: 'left' }

export const LeftStartPlacement = Template.bind({})
LeftStartPlacement.args = { placement: 'left-start' }

export const LeftEndPlacement = Template.bind({})
LeftEndPlacement.args = { placement: 'left-end' }

export const WithInteractiveContent: StoryFn<SimpleTooltipProps> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <SimpleTooltip
      placement="top"
      content={
        <div>
          <p style={{ margin: '0 0 8px' }}>This tooltip has interactive content:</p>
          <Button onClick={() => alert('Clicked inside tooltip!')}>Click me</Button>
        </div>
      }
    >
      <Button style={{ height: 80 }}>Hover for interactive tooltip</Button>
    </SimpleTooltip>
  </div>
)

export const LongContent: StoryFn<SimpleTooltipProps> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <SimpleTooltip
      placement="top"
      content="Parley come about mutiny swing the lead to go on account run a shot across the bow schooner fathom bounty carouser. Maroon killick keel driver scourge of the seven seas Jolly Roger hands spyglass Brethren of the Coast booty."
    >
      <Button style={{ height: 80 }}>Hover for long tooltip</Button>
    </SimpleTooltip>
  </div>
)

export const Visible: StoryFn<SimpleTooltipProps> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <SimpleTooltip content="This tooltip is always visible" open>
      <Button style={{ height: 80 }}>Tooltip always visible</Button>
    </SimpleTooltip>
  </div>
)

export const NoArrow: StoryFn<SimpleTooltipProps> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <SimpleTooltip content="No arrow here" arrow={false}>
      <Button style={{ height: 80 }}>Tooltip without arrow</Button>
    </SimpleTooltip>
  </div>
)

export const Open: StoryFn<SimpleTooltipProps> = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
    <SimpleTooltip content="Always open" open>
      <Button style={{ height: 80 }}>Tooltip without arrow</Button>
    </SimpleTooltip>
  </div>
)

// Nested: outer tooltip is controlled so it stays open while hovering either the button or the tooltip
// content itself (using a grace-period timer). Hovering "hover here" inside also opens a second tooltip.
const NestedExample = () => {
  const [outerOpen, setOuterOpen] = React.useState(false)
  const closeTimer = React.useRef<number | undefined>(undefined)

  const openOuter = () => {
    clearTimeout(closeTimer.current)
    setOuterOpen(true)
  }
  const closeOuter = () => {
    closeTimer.current = window.setTimeout(() => setOuterOpen(false), 200)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
      <TooltipProvider>
        <Tooltip open={outerOpen}>
          <TooltipTrigger asChild>
            <div style={{ display: 'inline-flex' }} onMouseEnter={openOuter} onMouseLeave={closeOuter}>
              <Button style={{ height: 80 }}>Hover me</Button>
            </div>
          </TooltipTrigger>
          <TooltipContent placement="top" onMouseEnter={openOuter} onMouseLeave={closeOuter}>
            First tooltip —{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <span style={{ textDecoration: 'underline', cursor: 'help' }}>hover here</span>
              </TooltipTrigger>
              <TooltipContent placement="top">Second tooltip, above the first</TooltipContent>
            </Tooltip>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export const Nested: StoryFn<SimpleTooltipProps> = () => <NestedExample />
