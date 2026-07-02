import React, { ReactNode } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Clipboard } from 'react-feather'

import { Alert } from '../src'
import { Alert as LegacyAlert } from '../src/old'
import { AlertAction, AlertActionButton, AlertActionLink } from '../src/components/Alert'

import s from './Button.stories.module.scss'

type Story = StoryObj<typeof Alert>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Stack = ({ children }: { children: ReactNode }) => <div className={s.fullWidthDemo}>{children}</div>

const noOp = () => undefined

const copyAction: AlertActionButton = {
  text: 'Copy',
  onClick: noOp,
  icon: Clipboard,
  ariaLabel: 'Icon copy to clipboard',
}

const linkAction: AlertActionLink = {
  text: 'Learn more',
  href: '#',
}

const bothActions: AlertAction[] = [copyAction, linkAction]

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      include: ['type', 'title', 'content', 'dismissableByEscKey'],
    },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['success', 'info', 'warning', 'critical'],
      description: 'Visual and semantic intent of the alert.',
      table: { category: 'Content', defaultValue: { summary: 'success' } },
    },
    title: {
      control: 'text',
      description: 'Bold heading shown next to the icon.',
      table: { category: 'Content' },
    },
    content: {
      control: 'text',
      description: 'Body message. Keep it short and actionable.',
      table: { category: 'Content' },
    },
    actions: { control: false, table: { category: 'Content' } },
    closeToast: { control: false, table: { category: 'Behavior' } },
    dismissableByEscKey: {
      control: 'boolean',
      description: 'Allow closing the alert with the Escape key.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
  },
  args: {
    type: 'success',
    title: 'Success',
    content: 'Your changes have been saved successfully.',
  },
} as Meta<typeof Alert>

export const Playground: Story = {
  render: (args) => (
    <div className={s.playgroundContainer}>
      <Alert {...args} closeToast={noOp} />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Tweak **type**, **title**, and **content** in the Controls panel to preview every intent.',
      },
    },
  },
}

export const Variants = () => (
  <div className={s.section}>
    <Caption>
      Four intents, each tinted with the matching <strong>Toast</strong> colour: <strong>success</strong>, <strong>info</strong>,{' '}
      <strong>warning</strong>, and <strong>critical</strong>.
    </Caption>
    <Stack>
      <Alert type="success" title="Success" content="Your changes have been saved successfully." closeToast={noOp} />
      <Alert type="info" title="Heads up" content="A new version of Hazelcast Cloud is available." closeToast={noOp} />
      <Alert type="warning" title="Warning" content="Please review your settings before continuing." closeToast={noOp} />
      <Alert type="critical" title="Something went wrong" content="Unable to connect to the cluster. Please try again." closeToast={noOp} />
    </Stack>
  </div>
)
Variants.tags = ['!dev']

export const WithActions = () => (
  <div className={s.section}>
    <Caption>
      Add an optional <strong>actions</strong> row with a button, a link, or both.
    </Caption>
    <Stack>
      <Alert
        type="success"
        title="Backup complete"
        content="Your snapshot is ready to download."
        actions={[copyAction]}
        closeToast={noOp}
      />
      <Alert
        type="info"
        title="Scheduled maintenance"
        content="Some features may be unavailable tonight."
        actions={[linkAction]}
        closeToast={noOp}
      />
      <Alert
        type="warning"
        title="Session expiring"
        content="You will be signed out in 5 minutes."
        actions={bothActions}
        closeToast={noOp}
      />
    </Stack>
  </div>
)
WithActions.tags = ['!dev']

export const WithoutCloseButton = () => (
  <div className={s.section}>
    <Caption>
      Omit <strong>closeToast</strong> for persistent, non-dismissable alerts embedded in a page.
    </Caption>
    <Stack>
      <Alert type="info" title="Read-only mode" content="You have viewer access to this cluster." />
    </Stack>
  </div>
)
WithoutCloseButton.tags = ['!dev']

export const LegacyV3 = () => (
  <div className={s.section}>
    <Caption>
      The pre-v4 alert, still available via <code>@hazelcast/ui/old</code> for gradual migration.
    </Caption>
    <LegacyAlert type="success" title="Title of message" content="Alert Description - make it short and clear" closeToast={noOp} />
  </div>
)
LegacyV3.tags = ['!dev']
