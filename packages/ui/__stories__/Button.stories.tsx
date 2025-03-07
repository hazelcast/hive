import React, { ReactNode } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Info, ChevronDown } from 'react-feather'
import cn from 'classnames'

import { Button, ButtonProps, ButtonTypeAnchorProps } from '../src/Button'

import styles from '../src/Button.module.scss'
import storyStyles from './Button.stories.module.scss'

type Story = StoryObj<typeof Button>

const Component = ({ className, ...args }: ButtonProps) => {
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

export default {
  title: 'Components/Button',
  component: Component,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=492%3A67',
    },
  },
  args: {
    children: 'Button',
  },
} as Meta<typeof Button>

const DarkBackground = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'inline-block', background: '#000', padding: 4 }}>{children}</span>
)

export const Default: Story = {}

export const Hovered: Story = {
  args: {
    className: styles.hover,
  },
}

export const Focused: Story = {
  args: {
    className: styles.focus,
  },
}

export const Active: Story = {
  args: {
    active: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    disabledTooltip: 'This button is disabled',
  },
}

export const WithLeftIcon: Story = {
  args: {
    iconLeft: Info,
    iconLeftAriaLabel: 'Additional information',
  },
}

export const WithRightIcon: Story = {
  args: {
    iconRight: ChevronDown,
    iconRightAriaLabel: 'Show additional information',
  },
}

export const WithLeftAndRightIcons: Story = {
  args: {
    iconLeft: Info,
    iconLeftAriaLabel: 'Additional information',
    iconRight: ChevronDown,
    iconRightAriaLabel: 'Show additional information',
  },
}

export const WithLoader: Story = {
  args: {
    loading: true,
  },
}

export const WithLoaderAndLeftIcon: Story = {
  args: {
    loading: true,
    iconLeft: Info,
    iconLeftAriaLabel: 'Additional information',
  },
}

export const WithLoaderAndRightIcon: Story = {
  args: {
    loading: true,
    iconRight: ChevronDown,
    iconRightAriaLabel: 'Show additional information',
  },
}

export const WithLoaderAndBothIcons: Story = {
  args: {
    loading: true,
    iconLeft: Info,
    iconLeftAriaLabel: 'Additional information',
    iconRight: ChevronDown,
    iconRightAriaLabel: 'Show additional information',
  },
}

export const WithLongLabel: Story = {
  args: {
    children: 'Looooooooooooooooooooooooooooooooong Label',
    className: storyStyles.block,
  },
}

export const DisabledWithLongLabel: Story = {
  args: {
    disabled: true,
    disabledTooltip: 'This button is disabled',
    children: 'Looooooooooooooooooooooooooooooooong Label',
    className: storyStyles.block,
  },
}

export const DisabledWithLongLabelShowingLabelInTooltip: Story = {
  args: {
    ...DisabledWithLongLabel.args,
    disabledTooltipVisible: false,
  },
}

export const NonCapitalized: Story = {
  args: {
    capitalize: false,
  },
}

export const WithInsetOutline: Story = {
  args: {
    outline: 'inset',
  },
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
