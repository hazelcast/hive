import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Check, X } from 'react-feather'

import { logger } from '../src'
import { PasswordField, PasswordFieldProps } from '../src/components/PasswordField'
import { PasswordFieldFormik } from '../src/components/PasswordFieldFormik'
import { PasswordField as LegacyPasswordField } from '../src/old'

import styles from '../src/components/TextField.module.css'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof PasswordField>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

export default {
  title: 'Components/PasswordField',
  component: PasswordField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=510%3A3',
    },
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      include: ['label', 'placeholder', 'helperText', 'error', 'disabled', 'required', 'withIcon', 'initiallyVisible', 'hideToggle'],
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
    disabled: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    withIcon: {
      control: 'boolean',
      description: 'Render a leading lock glyph that signals the field holds a secret.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    initiallyVisible: {
      control: 'boolean',
      description: 'Reveal the value on first render instead of masking it.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    hideToggle: {
      control: 'boolean',
      description: 'Remove the show/hide eye button. Use only when reveal is a security risk.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
} as Meta<typeof PasswordField>

const PlaygroundComponent = (args: PasswordFieldProps) => {
  const [value, setValue] = useState('hunter2')
  return <PasswordField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...(args as PasswordFieldProps)} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. The value is masked by default — click the eye button to reveal it. The eye button shows a circular hover affordance, matching `NumberField`.',
      },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState('')
  const [b, setB] = useState('hunter2')
  return (
    <div className={s.section}>
      <Caption>
        Use a PasswordField for masked secret entry. It renders at a single compact size and always pairs with a visible{' '}
        <strong>label</strong>. The trailing eye button toggles visibility.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 240px)' }}>
        <Cell label="Empty">
          <PasswordField
            name="basic-empty"
            label="Password"
            placeholder="Enter your password"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </Cell>
        <Cell label="Filled">
          <PasswordField name="basic-filled" label="Password" value={b} onChange={(e) => setB(e.target.value)} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Visibility = () => {
  const [a, setA] = useState('hunter2')
  const [b, setB] = useState('hunter2')
  return (
    <div className={s.section}>
      <Caption>
        The eye button toggles between masked and revealed. <strong>initiallyVisible</strong> sets the starting state. The button has a
        circular hover/focus ring so the hit target reads as a control.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 240px)' }}>
        <Cell label="Masked (default)">
          <PasswordField name="vis-masked" label="Password" value={a} onChange={(e) => setA(e.target.value)} />
        </Cell>
        <Cell label="Revealed">
          <PasswordField name="vis-revealed" label="Password" value={b} initiallyVisible onChange={(e) => setB(e.target.value)} />
        </Cell>
      </div>
    </div>
  )
}
Visibility.tags = ['!dev']

export const States = () => {
  const stateRows: { label: string; inputClassName?: string; disabled?: boolean; error?: string }[] = [
    { label: 'Default' },
    { label: 'Hover', inputClassName: styles.hover },
    { label: 'Focus', inputClassName: styles.focus },
    { label: 'Disabled', disabled: true },
    { label: 'Error', error: 'Required' },
  ]
  const valueRows = [
    { label: 'Empty', value: '' },
    { label: 'Filled', value: 'hunter2' },
  ]
  return (
    <div className={s.section}>
      <Caption>
        QA matrix for visual states. Interactive states are forced via classes that mirror the real <code>:hover</code> and{' '}
        <code>:focus</code> rules.
      </Caption>
      <div
        className={`${s.grid} ${s.gridStates}`}
        style={{ gridTemplateColumns: 'max-content repeat(5, minmax(0, 1fr))', gap: '16px 12px', alignItems: 'start' }}
      >
        <span />
        {stateRows.map((r) => (
          <span key={r.label} className={s.label}>
            {r.label}
          </span>
        ))}
        {valueRows.map(({ label, value }) => (
          <React.Fragment key={label}>
            <span className={s.rowLabel}>{label}</span>
            {stateRows.map((r) => (
              <PasswordField
                key={r.label}
                name={`state-${label}-${r.label}`}
                label="Password"
                placeholder="Enter your password"
                value={value}
                disabled={r.disabled}
                error={r.error}
                inputClassName={r.inputClassName}
                onChange={() => {}}
              />
            ))}
          </React.Fragment>
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

export const WithLockIcon = () => {
  const [value, setValue] = useState('')
  return (
    <div className={s.section}>
      <Caption>
        Set <strong>withIcon</strong> to add a leading lock glyph that reinforces the field holds a secret.
      </Caption>
      <PasswordField
        name="with-icon"
        label="Password"
        placeholder="Enter your password"
        withIcon
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
WithLockIcon.tags = ['!dev']

export const WithHelperText = () => {
  const [value, setValue] = useState('')
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>helperText</strong> for short hints. The help icon renders inline with the label and the message appears in a tooltip.
      </Caption>
      <PasswordField
        name="helper"
        label="Password"
        placeholder="Enter your password"
        helperText="At least 8 characters, mixing letters and digits."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
WithHelperText.tags = ['!dev']

export const WithError = () => (
  <div className={s.section}>
    <Caption>
      Set <strong>error</strong> to surface a validation message. The input becomes <code>aria-invalid</code> and links to the message via{' '}
      <code>aria-errormessage</code>.
    </Caption>
    <PasswordField
      name="error"
      label="Password"
      placeholder="Enter your password"
      value=""
      error="Password is required."
      onChange={(e) => logger.log('change', e.target.value)}
    />
  </div>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>disabled</strong> when the field cannot be edited in the current context. The eye button is disabled alongside the input.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 240px)' }}>
      <Cell label="Empty">
        <PasswordField name="disabled-empty" label="Password" placeholder="Enter your password" value="" disabled onChange={() => {}} />
      </Cell>
      <Cell label="Filled">
        <PasswordField name="disabled-filled" label="Password" value="hunter2" disabled onChange={() => {}} />
      </Cell>
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const WithoutToggle = () => {
  const [value, setValue] = useState('hunter2')
  return (
    <div className={s.section}>
      <Caption>
        Set <strong>hideToggle</strong> to drop the eye button entirely. Reserve this for flows where revealing the value is a security
        risk.
      </Caption>
      <PasswordField name="no-toggle" label="Password" value={value} hideToggle onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
WithoutToggle.tags = ['!dev']

export const WithFormik = () => {
  type Values = { password: string }
  const validate = (value: string | undefined) => (!value || value.length < 8 ? 'Password must be at least 8 characters.' : undefined)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>PasswordFieldFormik</strong> inside a Formik form to wire validation and submission automatically. The component reads
        name, value and error from Formik state.
      </Caption>
      <Formik<Values> initialValues={{ password: '' }} onSubmit={(values) => logger.log('submit', values)}>
        {({ values }) => (
          <Form>
            <PasswordFieldFormik<Values> name="password" validate={validate} label="Password" placeholder="Enter your password" />
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
    heading: 'Keep the reveal toggle available',
    good: {
      note: 'Letting users reveal what they typed reduces sign-in errors and is now an accepted security practice.',
      demo: <PasswordField name="do-1" label="Password" value="hunter2" onChange={() => {}} />,
    },
    bad: {
      note: 'Removing the toggle without reason forces users to retype on every typo — only hide it when reveal is a real risk.',
      demo: <PasswordField name="dont-1" label="Password" value="hunter2" hideToggle onChange={() => {}} />,
    },
  },
  {
    heading: 'Always pair with a visible label',
    good: {
      note: 'A clear label tells users what the field is for and doubles as the accessible name.',
      demo: <PasswordField name="do-2" label="Password" placeholder="Enter your password" value="" onChange={() => {}} />,
    },
    bad: {
      note: 'Relying on the placeholder alone leaves users guessing once they start typing — and screen readers may skip it.',
      demo: <PasswordField name="dont-2" label="" placeholder="Password" value="" onChange={() => {}} />,
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
  const [value, setValue] = useState('hunter2')
  return (
    <div className={s.section}>
      <Caption>
        The pre-v4 PasswordField is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong> to keep the{' '}
        <code>size</code> prop, which offered three heights. New code should use the PasswordField above, which is locked to a single
        compact size.
      </Caption>
      <div className={s.grid}>
        {(['small', 'medium', 'large'] as const).map((size) => (
          <Cell key={size} label={size}>
            <LegacyPasswordField
              name={`legacy-${size}`}
              label="Password"
              size={size}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Cell>
        ))}
      </div>
    </div>
  )
}
LegacyV3.tags = ['!dev']
