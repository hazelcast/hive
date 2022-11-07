import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Info, ChevronDown } from 'react-feather'
import cn from 'classnames'

import { Button, ButtonProps, ButtonTypeAnchorProps } from '../src/Button'

import styles from '../src/Button.module.scss'
import storyStyles from './Button.stories.module.scss'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=492%3A67',
    },
  },
  args: {
    children: 'Button',
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = ({ className, ...args }) => {
  const props = {
    ...args,
    className: cn(storyStyles.button, className),
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Button {...props} />
        <Button {...props} variant="outlined" />
        <Button {...props} color="secondary" />
        <Button {...props} variant="outlined" color="secondary" />
        <Button {...props} color="warning" />
        <Button {...props} variant="outlined" color="warning" />
        <Button {...props} color="brand" />
        <Button {...props} variant="outlined" color="brand" />
        <Button {...props} variant="text" />
      </div>
    </div>
  )
}

export const Default = Template.bind({})

export const Hovered = Template.bind({})
Hovered.args = {
  className: styles.hover,
}

export const Focused = Template.bind({})
Focused.args = {
  className: styles.focus,
}

export const Active = Template.bind({})
Active.args = {
  className: styles.active,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  disabledTooltip: 'This button is disabled',
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  iconLeft: Info,
  iconLeftAriaLabel: 'Additional information',
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  iconRight: ChevronDown,
  iconRightAriaLabel: 'Show additional information',
}

export const WithLeftAndRightIcons = Template.bind({})
WithLeftAndRightIcons.args = {
  iconLeft: Info,
  iconLeftAriaLabel: 'Additional information',
  iconRight: ChevronDown,
  iconRightAriaLabel: 'Show additional information',
}

export const WithLoader = Template.bind({})
WithLoader.args = {
  loading: true,
}

export const WithLoaderAndLeftIcon = Template.bind({})
WithLoaderAndLeftIcon.args = {
  loading: true,
  iconLeft: Info,
  iconLeftAriaLabel: 'Additional information',
}

export const WithLoaderAndRightIcon = Template.bind({})
WithLoaderAndRightIcon.args = {
  loading: true,
  iconRight: ChevronDown,
  iconRightAriaLabel: 'Show additional information',
}

export const WithLoaderAndBothIcons = Template.bind({})
WithLoaderAndBothIcons.args = {
  loading: true,
  iconLeft: Info,
  iconLeftAriaLabel: 'Additional information',
  iconRight: ChevronDown,
  iconRightAriaLabel: 'Show additional information',
}

export const WithLongLabel = Template.bind({})
WithLongLabel.args = {
  children: 'Looooooooooooooooooooooooooooooooong Label',
  className: storyStyles.block,
}

export const DisabledWithLongLabel = Template.bind({})
DisabledWithLongLabel.args = {
  disabled: true,
  disabledTooltip: 'This button is disabled',
  children: 'Looooooooooooooooooooooooooooooooong Label',
  className: storyStyles.block,
}

export const DisabledWithLongLabelShowingLabelInTooltip = Template.bind({})
DisabledWithLongLabelShowingLabelInTooltip.args = {
  ...DisabledWithLongLabel.args,
  disabledTooltipVisible: false,
}

export const NonCapitalized = Template.bind({})
NonCapitalized.args = {
  capitalize: false,
}

export const WithInsetOutline = Template.bind({})
WithInsetOutline.args = {
  outline: 'inset',
}

export const LinkSemantics = () => {
  const props: ButtonProps<ButtonTypeAnchorProps> = {
    className: storyStyles.button,
    component: 'a',
    href: '#',
    children: 'Link',
  }
  return (
    <>
      <Button {...props} />
      <Button {...props} variant="outlined" />
      <Button {...props} color="secondary" />
      <Button {...props} variant="outlined" color="secondary" />
      <Button {...props} variant="text" />
    </>
  )
}
