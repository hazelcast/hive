import React, { ReactNode } from 'react'
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

const DarkBackground = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'inline-block', background: '#000', padding: 4 }}>{children}</span>
)

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
        <Button {...props} variant="text" />
        <Button {...props} color="secondary" />
        <Button {...props} variant="outlined" color="secondary" />
        <Button {...props} variant="text" color="secondary" />
        <Button {...props} color="warning" />
        <Button {...props} variant="outlined" color="warning" />
        <Button {...props} variant="text" color="warning" />
        <Button {...props} color="brand" />
        <Button {...props} variant="outlined" color="brand" />
        <Button {...props} variant="text" color="brand" />
        <Button {...props} color="authPrimary" />
        <Button {...props} variant="outlined" color="authPrimary" />
        <Button {...props} variant="text" color="authPrimary" />
        <Button {...props} color="authSecondary" />
        <Button {...props} color="authSecondary" disabled />
        <Button {...props} variant="outlined" color="authSecondary" />
        <Button {...props} variant="text" color="authSecondary" />
        <Button {...props} size="medium" />
        <Button {...props} variant="outlined" size="medium" />
        <Button {...props} variant="text" size="medium" />
        <Button {...props} color="secondary" size="medium" />
        <Button {...props} variant="outlined" color="secondary" size="medium" />
        <Button {...props} variant="text" color="secondary" size="medium" />
        <Button {...props} color="warning" size="medium" />
        <Button {...props} variant="outlined" color="warning" size="medium" />
        <Button {...props} variant="text" color="warning" size="medium" />
        <Button {...props} color="brand" size="medium" />
        <Button {...props} variant="outlined" color="brand" size="medium" />
        <Button {...props} variant="text" color="brand" size="medium" />
        <Button {...props} color="authPrimary" size="medium" />
        <Button {...props} variant="outlined" color="authPrimary" size="medium" />
        <Button {...props} variant="text" color="authPrimary" size="medium" />
        <Button {...props} color="authSecondary" size="medium" />
        <Button {...props} color="authSecondary" disabled size="medium" />
        <Button {...props} variant="outlined" color="authSecondary" size="medium" />
        <Button {...props} variant="text" color="authSecondary" size="medium" />
        <DarkBackground>
          <Button {...props} color="light" />
        </DarkBackground>
        <DarkBackground>
          <Button {...props} variant="outlined" color="light" />
        </DarkBackground>
        <DarkBackground>
          <Button {...props} variant="text" color="light" />
        </DarkBackground>
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
  active: true,
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
