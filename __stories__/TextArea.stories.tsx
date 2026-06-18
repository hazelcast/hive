import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'

import { logger, TextArea, TextAreaFormik } from '../src'
import { TextArea as LegacyTextArea } from '../src/old'
import { formDecorator } from './decorators'

import styles from '../src/components/TextArea.module.css'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof TextArea>

const sample =
  'Yoda was a legendary Jedi Master who witnessed the rise and fall of the Galactic Republic. Small in stature but revered for his wisdom and power, he trained generations of Jedi across nine centuries of galactic history.'

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const FIELD_WIDTH = 520

const Field = ({ children }: { children: ReactNode }) => <div style={{ width: FIELD_WIDTH, maxWidth: '100%' }}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell} style={{ width: FIELD_WIDTH, maxWidth: '100%', alignItems: 'stretch' }}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

const noop = () => undefined

export default {
  title: 'Components/TextArea',
  component: TextArea,
  decorators: [formDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      include: ['label', 'placeholder', 'helperText', 'error', 'size', 'rows', 'resizable', 'disabled', 'required'],
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label rendered above the field. Recommended for every field.',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Hint text shown when the field is empty.',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Secondary text shown via a help icon next to the label.',
      table: { category: 'Content' },
    },
    error: {
      control: 'text',
      description: 'Error message. When set, the field renders in error state and announces the message to assistive tech.',
      table: { category: 'State' },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
      table: { category: 'Layout', defaultValue: { summary: 'medium' } },
    },
    rows: {
      control: { type: 'number', min: 2, max: 12 },
      table: { category: 'Layout', defaultValue: { summary: '3' } },
    },
    resizable: {
      control: 'boolean',
      description: 'Allow the user to drag-resize the field vertically.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    name: 'description',
    label: 'Character description',
    placeholder: 'Describe the character',
  },
} as Meta<typeof TextArea>

const PlaygroundComponent = (args: React.ComponentProps<typeof TextArea>) => {
  const [value, setValue] = useState<string>('')
  return (
    <Field>
      <TextArea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
    </Field>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...args} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Type into **label** for the visible label, **placeholder** for the hint, or **error** to render the error state.',
      },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState('')
  const [b, setB] = useState(sample)
  return (
    <div className={s.section}>
      <Caption>Empty vs filled — TextArea is a controlled component; provide a value and an onChange handler.</Caption>
      <div className={s.fullWidthDemo}>
        <Cell label="Empty">
          <TextArea
            name="empty"
            label="Character description"
            placeholder="Describe the character"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </Cell>
        <Cell label="Filled">
          <TextArea name="filled" label="Character description" value={b} onChange={(e) => setB(e.target.value)} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Sizes = () => (
  <div className={s.section}>
    <Caption>Two label sizes — small for dense layouts and medium (default) for most forms.</Caption>
    <div className={s.fullWidthDemo}>
      <Cell label="small">
        <TextArea name="small" size="small" label="Description" value={sample} onChange={noop} />
      </Cell>
      <Cell label="medium">
        <TextArea name="medium" size="medium" label="Description" value={sample} onChange={noop} />
      </Cell>
    </div>
  </div>
)
Sizes.tags = ['!dev']

export const States = () => (
  <div className={s.section}>
    <Caption>Interactive states. Hover and focus are forced here for QA; in the browser they respond to pointer and keyboard.</Caption>
    <div className={s.fullWidthDemo}>
      <Cell label="Default">
        <TextArea name="default" label="Description" value={sample} onChange={noop} />
      </Cell>
      <Cell label="Hover">
        <TextArea name="hover" className={styles.hover} label="Description" value={sample} onChange={noop} />
      </Cell>
      <Cell label="Focus">
        <TextArea name="focus" className={styles.focus} label="Description" value={sample} onChange={noop} />
      </Cell>
      <Cell label="Error">
        <TextArea name="error" label="Description" value={sample} onChange={noop} error="The dark side clouds everything" />
      </Cell>
      <Cell label="Disabled">
        <TextArea name="disabled" label="Description" value={sample} onChange={noop} disabled />
      </Cell>
    </div>
  </div>
)
States.tags = ['!dev']

export const WithHelperText = () => (
  <Field>
    <TextArea
      name="description"
      label="Character description"
      helperText="Markdown is supported. Keep it under 500 characters."
      value={sample}
      onChange={noop}
    />
  </Field>
)
WithHelperText.tags = ['!dev']

export const WithError = () => (
  <Field>
    <TextArea name="description" label="Character description" value={sample} onChange={noop} error="The dark side clouds everything" />
  </Field>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <Field>
    <TextArea name="description" label="Character description" value={sample} onChange={noop} disabled />
  </Field>
)
Disabled.tags = ['!dev']

export const NotResizable = () => (
  <Field>
    <TextArea name="description" label="Character description" value={sample} onChange={noop} resizable={false} />
  </Field>
)
NotResizable.tags = ['!dev']

export const WithFormik = () => (
  <Field>
    <Formik initialValues={{ description: sample }} onSubmit={(values) => logger.log('submit', values)}>
      <Form>
        <TextAreaFormik<{ description: string }> name="description" label="Character description" placeholder="Describe the character" />
      </Form>
    </Formik>
  </Field>
)
WithFormik.tags = ['!dev']

export const LegacyV3 = () => (
  <Field>
    <LegacyTextArea name="description" label="Character description" value={sample} onChange={noop} />
  </Field>
)
LegacyV3.tags = ['!dev']
