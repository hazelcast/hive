import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Check, X } from 'react-feather'

import { logger, NumberField, NumberFieldFormik } from '../src'
import { NumberField as LegacyNumberField } from '../src/old'
import { formDecorator } from './decorators'

import styles from '../src/components/TextField.module.css'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof NumberField>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

const noop = () => undefined

export default {
  title: 'Components/NumberField',
  component: NumberField,
  decorators: [formDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: [
        'name',
        'value',
        'onChange',
        'onBlur',
        'className',
        'labelClassName',
        'inputClassName',
        'inputContainerClassName',
        'errorClassName',
        'data-test',
        'mRef',
      ],
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label rendered above the input. Recommended for every field.',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Hint text shown when the input is empty.',
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
    step: {
      control: { type: 'number' },
      description: 'Amount added or subtracted by the stepper buttons.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    min: {
      control: { type: 'number' },
      table: { category: 'Behavior' },
    },
    max: {
      control: { type: 'number' },
      table: { category: 'Behavior' },
    },
    numberType: {
      control: 'inline-radio',
      options: ['int', 'float'],
      table: { category: 'Behavior', defaultValue: { summary: 'int' } },
    },
    showIconButtons: {
      control: 'boolean',
      description: 'Show the increment / decrement stepper buttons.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['together', 'separate'],
      description: 'Place the stepper buttons together (right) or separated on each side of the input.',
      table: { category: 'Layout', defaultValue: { summary: 'together' } },
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
    name: 'number',
    label: 'Favorite number',
    placeholder: 'Enter a number',
  },
} as Meta<typeof NumberField>

const PlaygroundComponent = (args: React.ComponentProps<typeof NumberField>) => {
  const [value, setValue] = useState<number | undefined>(42)
  return <NumberField {...args} value={value} onChange={setValue} />
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...args} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Use the stepper buttons to change the value, or set **min** / **max** / **step** to constrain it.',
      },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState<number | undefined>(undefined)
  const [b, setB] = useState<number | undefined>(42)
  return (
    <div className={s.section}>
      <Caption>
        Empty vs filled — NumberField is a controlled component; provide a numeric <strong>value</strong> and an <strong>onChange</strong>{' '}
        handler.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Empty">
          <NumberField name="basic-empty" label="Favorite number" placeholder="Enter a number" value={a} onChange={setA} />
        </Cell>
        <Cell label="Filled">
          <NumberField name="basic-filled" label="Favorite number" value={b} onChange={setB} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Sizes = () => {
  const [a, setA] = useState<number | undefined>(42)
  return (
    <div className={s.section}>
      <Caption>
        v4 fields use a single size — <strong>Regular</strong>. Use it everywhere for a consistent form rhythm.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Regular">
          <NumberField name="size-regular" label="Favorite number" value={a} onChange={setA} />
        </Cell>
      </div>
    </div>
  )
}
Sizes.tags = ['!dev']

export const States = () => {
  const stateRows: { label: string; inputClassName?: string; disabled?: boolean; error?: string }[] = [
    { label: 'Default' },
    { label: 'Hover', inputClassName: styles.hover },
    { label: 'Focus', inputClassName: styles.focus },
    { label: 'Disabled', disabled: true },
    { label: 'Error', error: 'Out of range' },
  ]
  return (
    <div className={s.section}>
      <Caption>
        QA matrix for visual states. Interactive states are forced via classes that mirror the real <code>:hover</code> and{' '}
        <code>:focus</code> rules.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        {stateRows.map((r) => (
          <Cell key={r.label} label={r.label}>
            <NumberField
              name={`state-${r.label}`}
              label="Favorite number"
              value={42}
              disabled={r.disabled}
              error={r.error}
              inputClassName={r.inputClassName}
              onChange={noop}
            />
          </Cell>
        ))}
      </div>
    </div>
  )
}
States.tags = ['!dev']
States.parameters = {
  docs: {
    description: {
      story: 'Visual QA matrix. Not part of the public design spec — included so engineers can verify state styling in one glance.',
    },
  },
}

export const IconPositions = () => {
  const [a, setA] = useState<number | undefined>(42)
  const [b, setB] = useState<number | undefined>(42)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>iconPosition</strong> to place both steppers <code>together</code> on the right (default), or <code>separate</code> on
        each side of the input with the value centred.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Together">
          <NumberField name="pos-together" label="Quantity" value={a} onChange={setA} />
        </Cell>
        <Cell label="Separate">
          <NumberField name="pos-separate" label="Quantity" iconPosition="separate" value={b} onChange={setB} />
        </Cell>
      </div>
    </div>
  )
}
IconPositions.tags = ['!dev']

export const WithoutButtons = () => {
  const [value, setValue] = useState<number | undefined>(42)
  return (
    <div className={s.section}>
      <Caption>
        Set <strong>showIconButtons</strong> to <code>false</code> to hide the steppers and render a plain numeric input.
      </Caption>
      <NumberField name="no-buttons" label="Favorite number" showIconButtons={false} value={value} onChange={setValue} />
    </div>
  )
}
WithoutButtons.tags = ['!dev']

export const WithMinAndMax = () => {
  const [value, setValue] = useState<number | undefined>(42)
  return (
    <div className={s.section}>
      <Caption>
        Constrain the value with <strong>min</strong> and <strong>max</strong>. Steppers disable at the bounds and out-of-range typed values
        are clamped.
      </Caption>
      <NumberField name="min-max" label="Replicas (42–44)" min={42} max={44} value={value} onChange={setValue} />
    </div>
  )
}
WithMinAndMax.tags = ['!dev']

export const WithHelperText = () => {
  const [value, setValue] = useState<number | undefined>(42)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>helperText</strong> for short hints. The help icon renders inline with the label and the message appears in a tooltip.
      </Caption>
      <NumberField name="helper" label="Favorite number" helperText="Any integer between 0 and 100." value={value} onChange={setValue} />
    </div>
  )
}
WithHelperText.tags = ['!dev']

export const WithError = () => (
  <div className={s.section}>
    <Caption>
      Set <strong>error</strong> to surface a validation message. The input becomes <code>aria-invalid</code> and links to the message.
    </Caption>
    <NumberField name="error" label="Favorite number" value={1} error="Value must be at least 4." onChange={noop} />
  </div>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>disabled</strong> when the field cannot be edited in the current context. The steppers are hidden while disabled.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      <Cell label="Empty">
        <NumberField
          name="disabled-empty"
          label="Favorite number"
          placeholder="Enter a number"
          value={undefined}
          disabled
          onChange={noop}
        />
      </Cell>
      <Cell label="Filled">
        <NumberField name="disabled-filled" label="Favorite number" value={42} disabled onChange={noop} />
      </Cell>
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const WithFormik = () => {
  type Values = { ram: number }
  const validate = (value: number | undefined) => (value === undefined || value < 4 ? 'RAM is too low' : undefined)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>NumberFieldFormik</strong> inside a Formik form to wire validation and submission automatically. It reads name, value
        and error from Formik state.
      </Caption>
      <Formik<Values> initialValues={{ ram: 0 }} onSubmit={(values) => logger.log('submit', values)}>
        {({ values }) => (
          <Form>
            <NumberFieldFormik<Values> name="ram" label="RAM (GB)" validate={validate} min={0} max={64} />
            <pre style={{ marginTop: 12 }}>{JSON.stringify(values, null, 2)}</pre>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
WithFormik.tags = ['!dev']

type DoDontPair = {
  heading: string
  good: { note: string; demo: ReactNode }
  bad: { note: string; demo: ReactNode }
}

const DO_DONT_PAIRS: DoDontPair[] = [
  {
    heading: 'Use NumberField for bounded numeric input',
    good: {
      note: 'Steppers and min/max make valid values obvious and quick to reach.',
      demo: <NumberField name="do-1" label="Replicas" min={1} max={9} value={3} onChange={() => {}} />,
    },
    bad: {
      note: 'Don\u2019t use a plain TextField for numbers — you lose steppers, clamping and the numeric keyboard.',
      demo: <NumberField name="dont-1" label="Replicas" showIconButtons={false} value={3} onChange={() => {}} />,
    },
  },
  {
    heading: 'Always pair with a visible label',
    good: {
      note: 'A clear label tells users what the number represents and doubles as the accessible name.',
      demo: <NumberField name="do-2" label="Port" value={5701} onChange={() => {}} />,
    },
    bad: {
      note: 'Relying on a placeholder alone leaves users guessing once they start typing.',
      demo: <NumberField name="dont-2" placeholder="Port" value={undefined} onChange={() => {}} />,
    },
  },
]

export const DoVsDont = () => (
  <div className={s.doDont}>
    {DO_DONT_PAIRS.map(({ heading, good, bad }) => (
      <section key={heading} className={s.doDontRow}>
        <h4 className={s.doDontHeading}>{heading}</h4>
        <div className={`${s.doDontCard} ${s.doDontGood}`}>
          <span className={s.doDontMarker}>
            <Check size={14} /> Do
          </span>
          <div className={s.doDontDemo}>{good.demo}</div>
          <p className={s.doDontNote}>{good.note}</p>
        </div>
        <div className={`${s.doDontCard} ${s.doDontBad}`}>
          <span className={s.doDontMarker}>
            <X size={14} /> Don&rsquo;t
          </span>
          <div className={s.doDontDemo}>{bad.demo}</div>
          <p className={s.doDontNote}>{bad.note}</p>
        </div>
      </section>
    ))}
  </div>
)
DoVsDont.tags = ['!dev']
DoVsDont.parameters = {
  docs: {
    description: {
      story: 'Concrete patterns to follow and pitfalls to avoid. Use these to settle review discussions quickly.',
    },
  },
}

export const LegacyV3 = () => {
  const [value, setValue] = useState<number | undefined>(42)
  return (
    <div className={s.section}>
      <Caption>
        The v3 NumberField is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the
        NumberField above.
      </Caption>
      <LegacyNumberField name="legacy" label="Legacy v3 NumberField" value={value} onChange={setValue} />
    </div>
  )
}
LegacyV3.tags = ['!dev']
