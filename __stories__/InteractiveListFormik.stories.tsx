import React, { ReactNode, useRef } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'

import { Button } from '../src'
import { InteractiveListInputRef } from '../src/components/InteractiveList'
import { InteractiveListFormik } from '../src/components/InteractiveListFormik'
import s from './Button.stories.module.scss'

type Values = {
  emails: string[]
}

type Args = {
  label: string
  placeholder: string
  helperText?: string
  required?: boolean
  disabled?: boolean
}

type Story = StoryObj<Args>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const emailValidator = (value: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  return isValid ? undefined : 'Please enter a valid email address'
}

const FormField = ({ label, placeholder, helperText, required, disabled }: Args) => (
  <Formik<Values> initialValues={{ emails: [] }} onSubmit={() => {}}>
    {() => (
      <Form>
        <InteractiveListFormik<Values>
          name="emails"
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          required={required}
          disabled={disabled}
          validate={emailValidator}
        />
      </Form>
    )}
  </Formik>
)

export default {
  title: 'Components/InteractiveListFormik',
  component: InteractiveListFormik as unknown as React.ComponentType<any>,
  parameters: {
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      include: ['label', 'placeholder', 'helperText', 'required', 'disabled'],
    },
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    helperText: { control: 'text', table: { category: 'Content' } },
    required: { control: 'boolean', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
  },
  args: {
    label: 'Email address',
    placeholder: 'name@company.com',
    helperText: undefined,
    required: false,
    disabled: false,
  },
} as Meta<Args>

export const Playground: Story = {
  render: (args) => <FormField {...args} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Tweak label, placeholder and state in Controls. Enter a value and press Enter (or click +) to append it to the list.',
      },
    },
  },
}

export const Basic = () => (
  <div className={s.section} style={{ width: 520 }}>
    <Caption>
      Use this pattern when users can add and remove multiple string values inline, for example invite recipients, allowlist entries, or
      tags.
    </Caption>
    <FormField label="Email address" placeholder="name@company.com" />
  </div>
)
Basic.tags = ['!dev']

export const InviteUsersPattern = () => (
  <div
    className={s.section}
    style={{ width: 900, maxWidth: '100%', border: '1px solid var(--hive-color-border-v4)', borderRadius: 12, overflow: 'hidden' }}
  >
    <div
      style={{
        background: 'color-mix(in oklab, var(--hive-color-brand-v4) 24%, var(--hive-color-neutral-white-v4))',
        borderBottom: '1px solid var(--hive-color-border-v4)',
        padding: '28px 40px',
        fontSize: 42,
        fontWeight: 600,
        lineHeight: 1.05,
      }}
    >
      Invite users
    </div>
    <div style={{ padding: 40 }}>
      <Formik<Values> initialValues={{ emails: [] }} onSubmit={() => {}}>
        <Form>
          <InteractiveListFormik<Values> name="emails" label="Email address" placeholder="name@company.com" validate={emailValidator} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 28 }}>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button>Invite</Button>
          </div>
        </Form>
      </Formik>
    </div>
  </div>
)
InviteUsersPattern.tags = ['!dev']

export const Validation = () => (
  <div className={s.section} style={{ width: 520 }}>
    <Caption>
      Inline validation blocks invalid entries before they are appended. Duplicate and empty values are rejected by the component itself,
      while email format comes from custom <code>validate</code>.
    </Caption>
    <Formik<Values> initialValues={{ emails: ['owner@company.com'] }} onSubmit={() => {}}>
      <Form>
        <InteractiveListFormik<Values> name="emails" label="Email address" placeholder="name@company.com" validate={emailValidator} />
      </Form>
    </Formik>
  </div>
)
Validation.tags = ['!dev']

export const ExternalControls = () => {
  const inputRef = useRef<InteractiveListInputRef>(null)

  return (
    <div className={s.section} style={{ width: 520 }}>
      <Caption>
        Control the input programmatically via <code>inputControlRef</code> to prefill and submit values from external actions.
      </Caption>
      <Formik<Values> initialValues={{ emails: ['team@hazelcast.com'] }} onSubmit={() => {}}>
        <Form>
          <InteractiveListFormik<Values>
            name="emails"
            label="Email address"
            placeholder="name@company.com"
            validate={emailValidator}
            inputControlRef={inputRef}
          >
            <Button variant="outlined" color="secondary" onClick={() => inputRef.current?.setValue('admin@company.com')}>
              Prefill Admin
            </Button>
            <Button onClick={() => void inputRef.current?.addItem()}>Add Prefilled</Button>
          </InteractiveListFormik>
        </Form>
      </Formik>
    </div>
  )
}
ExternalControls.tags = ['!dev']
