import React, { FC, useState } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { Meta, StoryObj } from '@storybook/react'

import { Toast, ToastVariant } from '../src/components/Toast'
import { Button } from '../src'

const withViewport = (Story: FC) => (
  <ToastPrimitive.Provider>
    <Story />
    <ToastPrimitive.Viewport
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 8,
        width: 360,
        maxWidth: '100vw',
        margin: 0,
        listStyle: 'none',
        outline: 'none',
        zIndex: 999,
      }}
    />
  </ToastPrimitive.Provider>
)

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [withViewport],
  parameters: {
    docs: {
      page: null,
    },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['success', 'error', 'warn', 'info'] satisfies ToastVariant[],
    },
    content: { control: 'text' },
    duration: {
      control: { type: 'number', min: 1000, step: 1000 },
      description: 'Auto-dismiss delay in ms. Use `Infinity` for persistent toasts.',
    },
    open: { control: 'boolean' },
    onOpenChange: { control: false },
    id: { control: false },
  },
}
export default meta

type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: {
    variant: 'success',
    content: 'Your changes have been saved successfully.',
    duration: 2147483647,
    open: true,
  },
}

export const Success: Story = {
  tags: ['!dev'],
  args: {
    variant: 'success',
    content: 'Cluster created successfully.',
    open: true,
    duration: 2147483647,
  },
}

export const Error: Story = {
  tags: ['!dev'],
  args: {
    variant: 'error',
    content: 'Unable to connect to the cluster. Please try again.',
    open: true,
    duration: 2147483647,
  },
}

export const Warn: Story = {
  name: 'Warning',
  tags: ['!dev'],
  args: {
    variant: 'warn',
    content: 'Your session expires in 5 minutes.',
    open: true,
    duration: 2147483647,
  },
}

export const Info: Story = {
  tags: ['!dev'],
  args: {
    variant: 'info',
    content: 'A new version of Hazelcast Cloud is available.',
    open: true,
    duration: 2147483647,
  },
}

export const LongContent: Story = {
  tags: ['!dev'],
  args: {
    variant: 'error',
    content:
      'Could not complete the operation because the cluster is currently paused. Resume the cluster first and then retry your request.',
    open: true,
    duration: 2147483647,
  },
}

export const Persistent: Story = {
  tags: ['!dev'],
  args: {
    variant: 'warn',
    content: 'Service is in maintenance mode. Some features may be unavailable.',
    open: true,
    duration: Infinity,
  },
}

const InteractiveRender: FC = () => {
  const variants: ToastVariant[] = ['success', 'error', 'warn', 'info']
  const messages: Record<ToastVariant, string> = {
    success: 'Changes saved successfully.',
    error: 'Something went wrong. Please try again.',
    warn: 'This action may affect cluster performance.',
    info: 'Cluster upgrade is scheduled for tonight.',
  }

  const [toasts, setToasts] = useState<Array<{ id: string; variant: ToastVariant; open: boolean }>>([])

  const trigger = (variant: ToastVariant) => {
    setToasts((prev) => [...prev, { id: `${variant}-${Date.now()}`, variant, open: true }])
  }

  const handleOpenChange = (id: string, open: boolean) => {
    if (!open) setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <Button key={variant} variant="outlined" color="secondary" size="small" onClick={() => trigger(variant)}>
            {`Show ${variant}`}
          </Button>
        ))}
      </div>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          id={t.id}
          variant={t.variant}
          content={messages[t.variant]}
          duration={5000}
          open={t.open}
          onOpenChange={(open) => handleOpenChange(t.id, open)}
        />
      ))}
    </>
  )
}

export const Interactive: Story = {
  tags: ['!dev'],
  render: () => <InteractiveRender />,
}
