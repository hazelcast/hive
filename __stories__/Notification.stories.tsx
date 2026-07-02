import React, { ReactNode } from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Notification } from '../src'
import { Notification as LegacyNotification } from '../src/old'

import s from './Button.stories.module.scss'

type Story = StoryObj<typeof Notification>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Stack = ({ children }: { children: ReactNode }) => <div className={s.fullWidthDemo}>{children}</div>

const text = 'Your changes have been saved successfully.'
const longText =
  'This cluster is running an older version. Upgrade during the next maintenance window to receive the latest security patches and performance improvements.'

const noOp = () => undefined

export default {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'padded',
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      include: ['type', 'children'],
    },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['success', 'info', 'warning', 'error'],
      description: 'Visual and semantic intent of the notification.',
      table: { category: 'Content', defaultValue: { summary: 'success' } },
    },
    children: {
      control: 'text',
      description: 'The message. Keep it to a single, scannable line where possible.',
      table: { category: 'Content' },
    },
    link: { control: false, table: { category: 'Content' } },
    linkHref: { control: false, table: { category: 'Content' } },
    onClose: { control: false, table: { category: 'Behavior' } },
  },
  args: {
    type: 'success',
    children: text,
  },
} as Meta<typeof Notification>

export const Playground: Story = {
  render: (args) => (
    <div className={s.playgroundContainer}>
      <Notification {...args} />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Switch **type** and edit the message in the Controls panel to preview each intent.',
      },
    },
  },
}

export const Variants = () => (
  <div className={s.section}>
    <Caption>
      A compact, single-line banner in four intents, tinted with the matching <strong>Toast</strong> colour.
    </Caption>
    <Stack>
      <Notification type="success">Your changes have been saved successfully.</Notification>
      <Notification type="info">A new version of Hazelcast Cloud is available.</Notification>
      <Notification type="warning">Please review your settings before continuing.</Notification>
      <Notification type="error">Unable to connect to the cluster. Please try again.</Notification>
    </Stack>
  </div>
)
Variants.tags = ['!dev']

export const WithLink = () => (
  <div className={s.section}>
    <Caption>
      Pass <strong>link</strong> and <strong>linkHref</strong> to add a trailing call-to-action.
    </Caption>
    <Stack>
      <Notification type="info" link="View details" linkHref="#">
        A scheduled maintenance window starts tonight at 22:00 UTC.
      </Notification>
    </Stack>
  </div>
)
WithLink.tags = ['!dev']

export const WithCloseButton = () => (
  <div className={s.section}>
    <Caption>
      Provide <strong>onClose</strong> to render a dismiss button.
    </Caption>
    <Stack>
      <Notification type="warning" onClose={noOp}>
        Your session expires in 5 minutes.
      </Notification>
      <Notification type="warning" link="Extend" linkHref="#" onClose={noOp}>
        Your session expires in 5 minutes.
      </Notification>
    </Stack>
  </div>
)
WithCloseButton.tags = ['!dev']

export const LongText = () => (
  <div className={s.section}>
    <Caption>Content wraps gracefully; the icon and trailing link stay aligned to the top.</Caption>
    <Stack>
      <Notification type="info" link="Upgrade" linkHref="#">
        {longText}
      </Notification>
    </Stack>
  </div>
)
LongText.tags = ['!dev']

export const LegacyV3 = () => (
  <div className={s.section}>
    <Caption>
      The pre-v4 notification, still available via <code>@hazelcast/ui/old</code> for gradual migration.
    </Caption>
    <Stack>
      <LegacyNotification type="success" link="Link" linkHref="/">
        Lorem ipsum dolor sit amet
      </LegacyNotification>
    </Stack>
  </div>
)
LegacyV3.tags = ['!dev']
