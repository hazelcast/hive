import React from 'react'
import { Database } from 'react-feather'
import { Meta, StoryObj } from '@storybook/react'

import { Alert, Card, IconButton } from '../src'

import styles from './Card.stories.module.scss'
import { CardProps } from '../src/components/Card'

type Story = StoryObj<typeof Card>

const Component = (args: CardProps) => {
  return (
    <>
      <Card {...args} />
      <Card variant="bordered" {...args} />
    </>
  )
}

export default {
  title: 'Components/Card',
  component: Component,
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

export const Simple: Story = {}

export const WithoutTitle: Story = {
  args: {
    title: undefined,
  },
}

export const WithoutContent: Story = {
  args: {
    children: undefined,
  },
}

export const WithSeparator: Story = {
  args: {
    separator: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10093%3A21',
    },
  },
}

export const WithIcon: Story = {
  args: {
    headingIcon: Database,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10181%3A15',
    },
  },
}

export const WithIconAndSeparator: Story = {
  args: {
    ...WithSeparator.args,
    ...WithIcon.args,
  },
}

export const WithHeadingContent: Story = {
  args: {
    headingContent: <IconButton kind="primary" ariaLabel="Check out the Database" icon={Database} component="a" href="#" />,
  },
}

export const WithCustomStyling: Story = {
  args: {
    ...WithIcon.args,
    iconClassName: styles.customIconClass,
    titleClassName: styles.customTitleClass,
  },
}

export const WithCaption: Story = {
  args: {
    caption: <Alert type="info" content="Only content" />,
  },
}
