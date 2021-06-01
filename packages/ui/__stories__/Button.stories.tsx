import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Info, ChevronDown } from 'react-feather'
import cn from 'classnames'

import { Button, ButtonProps, ButtonTypeAnchorProps, ButtonTypeButtonProps } from '../src/Button'

import styles from '../src/Button.module.scss'
import storyStyles from './Button.stories.module.scss'

type Args = ButtonProps<ButtonTypeButtonProps>

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=492%3A67',
  },
  args: {
    children: 'Button',
  },
} as Meta<Args>

const Template: Story<Args> = ({ className, ...args }) => {
  const props = {
    ...args,
    className: cn(storyStyles.button, className),
  }
  return (
    <>
      <Button {...props} kind="primary" />
      <Button {...props} kind="secondary" />
      <Button {...props} kind="danger" />
      <Button {...props} kind="transparent" />
    </>
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

export const Small = Template.bind({})
Small.args = {
  size: 'small',
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
  ...WithLeftIcon.args,
  ...WithRightIcon.args,
}

export const WithLoader = Template.bind({})
WithLoader.args = {
  loading: true,
}

export const WithLoaderAndRightIcon = Template.bind({})
WithLoaderAndRightIcon.args = {
  ...WithLoader.args,
  ...WithRightIcon.args,
}

export const WithLongLabel = Template.bind({})
WithLongLabel.args = {
  children: 'Looooooooooooooooooooooooooooooooong Label',
  className: storyStyles.block,
}

export const DisabledWithLongLabel = Template.bind({})
DisabledWithLongLabel.args = {
  ...Disabled.args,
  ...WithLongLabel.args,
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
      <Button {...props} kind="primary" />
      <Button {...props} kind="secondary" />
      <Button {...props} kind="danger" />
      <Button {...props} kind="transparent" />
    </>
  )
}
