import React from 'react'
import { Clipboard, FolderPlus } from 'react-feather'
import { Meta, Story } from '@storybook/react'

import { Icon, IconProps } from '../src/Icon'

import styleConsts from '../styles/constants/export.module.scss'

export default {
  title: 'Components/Icon',
  component: Icon,
  args: {
    icon: Clipboard,
    ariaLabel: 'Icon Story',
  },
} as Meta<IconProps>

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

export const SmallMedium = Template.bind({})
SmallMedium.args = {
  size: 'smallMedium',
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  size: 'xlarge',
}

export const Bold = Template.bind({})
Bold.args = {
  bold: true,
}

export const CustomColor = Template.bind({})
CustomColor.args = {
  color: styleConsts.colorSuccess,
}

export const FeatherIcon = Template.bind({})
FeatherIcon.args = {
  icon: FolderPlus,
}
