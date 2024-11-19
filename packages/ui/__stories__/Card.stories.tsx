import React from 'react'
import { Database } from 'react-feather'
import { Meta, Story } from '@storybook/react'

import { Alert, Card, IconButton } from '../src'

import styles from './Card.stories.module.scss'
import { CardProps } from '../src/Card'

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=492%3A67',
    },
  },
  args: {
    title: 'Card title',
    children:
      'Hogshead topsail draft careen mizzen fluke gaff cog aye Buccaneer. To go on account topgallant Jolly Roger maroon overhaul ho landlubber or just lubber prow pillage clap of thunder. Holystone jack black jack sloop bowsprit Sea Legs matey aft fluke brigantine.',
  },
} as Meta<CardProps>

const Template: Story<CardProps> = (args) => {
  return (
    <>
      <Card {...args} />
      <Card variant="bordered" {...args} />
    </>
  )
}

export const Simple = Template.bind({})

export const WithoutTitle = Template.bind({})
WithoutTitle.args = {
  title: undefined,
}

export const WithoutContent = Template.bind({})
WithoutContent.args = {
  children: undefined,
}

export const WithSeparator = Template.bind({})
WithSeparator.args = {
  separator: true,
}
WithSeparator.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10093%3A21',
  },
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  headingIcon: Database,
}
WithIcon.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10181%3A15',
  },
}

export const WithIconAndSeparator = Template.bind({})
WithIconAndSeparator.args = {
  ...WithSeparator.args,
  ...WithIcon.args,
}

export const WithHeadingContent = Template.bind({})
WithHeadingContent.args = {
  headingContent: <IconButton kind="primary" ariaLabel="Check out the Database" icon={Database} component="a" href="#" />,
}

export const WithCustomStyling = Template.bind({})
WithCustomStyling.args = {
  ...WithIcon.args,
  iconClassName: styles.customIconClass,
  titleClassName: styles.customTitleClass,
}

export const WithCaption = Template.bind({})
WithCaption.args = {
  caption: <Alert type="info" content="Only content" />,
}
