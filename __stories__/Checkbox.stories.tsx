import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'

import { Checkbox, CheckboxFormik, Link, logger } from '../src'
import { Checkbox as LegacyCheckbox } from '../src/old'
import { formDecorator } from './decorators'
import { LONG_MULTIPLE_WORD_TEXT, LONG_ONE_WORD_TEXT } from './constants'

import styles from '../src/components/Checkbox.module.css'
import customStyles from './Checkbox.stories.module.scss'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof Checkbox>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [formDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/uGTDLFJEVy4dCNIhlmTPRw/%F0%9F%90%9D-HIVE-3.0?node-id=26-1299',
    },
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: ['name', 'value', 'className', 'classNameLabel', 'classNameCheckmark', 'onBlur', 'onChange', 'onClick', 'data-test'],
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label rendered next to the box.',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Secondary text shown via a help icon next to the label.',
      table: { category: 'Content' },
    },
    error: {
      control: 'text',
      description: 'Error message. When set, the checkbox renders in error state.',
      table: { category: 'State' },
    },
    checked: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Renders the third "mixed" state with a minus glyph.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
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
    name: 'checkbox',
    label: 'Subscribe to updates',
  },
} as Meta<typeof Checkbox>

const PlaygroundComponent = (args: React.ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState<boolean>(!!args.checked)
  return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...args} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Type into **label** for the visible label, toggle **checked**, **indeterminate**, **disabled**, or set **error** to render the error state.',
      },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)
  return (
    <div className={s.section}>
      <Caption>
        Use a Checkbox for boolean input. Always pair with a visible <strong>label</strong>.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Unchecked">
          <Checkbox name="basic-unchecked" label="I agree" checked={a} onChange={(e) => setA(e.target.checked)} />
        </Cell>
        <Cell label="Checked">
          <Checkbox name="basic-checked" label="I agree" checked={b} onChange={(e) => setB(e.target.checked)} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const States = () => {
  const stateRows: { label: string; classNameLabel?: string; disabled?: boolean; error?: string }[] = [
    { label: 'Default' },
    { label: 'Hover', classNameLabel: styles.hover },
    { label: 'Focus', classNameLabel: styles.focus },
    { label: 'Disabled', disabled: true },
    { label: 'Error', error: 'Required' },
  ]
  const valueRows = [
    { label: 'Unchecked', checked: false, indeterminate: false },
    { label: 'Checked', checked: true, indeterminate: false },
    { label: 'Indeterminate', checked: true, indeterminate: true },
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
        {valueRows.map(({ label, checked, indeterminate }) => (
          <React.Fragment key={label}>
            <span className={s.rowLabel}>{label}</span>
            {stateRows.map((r) => (
              <Checkbox
                key={r.label}
                name={`state-${label}-${r.label}`}
                label="Option"
                checked={checked}
                indeterminate={indeterminate}
                disabled={r.disabled}
                error={r.error}
                classNameLabel={r.classNameLabel}
                onChange={() => {}}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
States.parameters = {
  docs: {
    description: {
      story: 'Visual QA matrix. Not part of the public design spec — included so engineers can verify state styling in one glance.',
    },
  },
}
States.tags = ['!dev']

export const Indeterminate = () => {
  const [checked, setChecked] = useState(true)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>indeterminate</strong> for a &quot;mixed&quot; tristate, typical when a parent represents a partial selection of
        children.
      </Caption>
      <Checkbox name="indeterminate" label="Select all" checked={checked} indeterminate onChange={(e) => setChecked(e.target.checked)} />
    </div>
  )
}
Indeterminate.tags = ['!dev']

export const WithHelperText = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>helperText</strong> for short hints. The help icon renders inline with the label and reveals the message in a tooltip.
    </Caption>
    <Checkbox
      name="with-helper"
      label="Send weekly digest"
      helperText="A summary of cluster activity, sent every Monday."
      checked={false}
      onChange={(e) => logger.log('change', e.target.checked)}
    />
  </div>
)
WithHelperText.tags = ['!dev']

export const WithError = () => (
  <div className={s.section}>
    <Caption>
      Set <strong>error</strong> to surface a validation message inline. The input becomes <code>aria-invalid</code> and the message is
      announced to assistive tech.
    </Caption>
    <Checkbox
      name="with-error"
      label="Accept terms"
      checked={false}
      error="You must accept to continue"
      onChange={(e) => logger.log('change', e.target.checked)}
    />
  </div>
)
WithError.tags = ['!dev']

export const WithLink = () => (
  <div className={s.section}>
    <Caption>Labels can include inline links — useful for terms-of-service style consents.</Caption>
    <Checkbox
      name="with-link"
      label={
        <>
          I agree to the{' '}
          <Link href="#" size="small">
            Terms of Service
          </Link>
        </>
      }
      checked={false}
      onChange={(e) => logger.log('change', e.target.checked)}
    />
  </div>
)
WithLink.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Disable a checkbox when its value cannot be edited in the current context. Always pair with surrounding context that explains why.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      <Cell label="Unchecked">
        <Checkbox name="disabled-unchecked" label="Option" checked={false} disabled onChange={() => {}} />
      </Cell>
      <Cell label="Checked">
        <Checkbox name="disabled-checked" label="Option" checked disabled onChange={() => {}} />
      </Cell>
      <Cell label="Indeterminate">
        <Checkbox name="disabled-indeterminate" label="Option" checked indeterminate disabled onChange={() => {}} />
      </Cell>
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const WithFormik = () => {
  type Values = { tos: boolean }
  const validateToS = (value: boolean) => (!value ? 'You must accept the Terms of Service' : undefined)

  return (
    <div className={s.section}>
      <Caption>
        Use <strong>CheckboxFormik</strong> inside a Formik form. It wires <code>checked</code>, <code>onChange</code>, and validation
        errors automatically — pass <code>name</code> and an optional <code>validate</code> function.
      </Caption>
      <Formik<Values> initialValues={{ tos: false }} onSubmit={(values) => logger.log('submit', values)}>
        {({ values }) => (
          <Form>
            <CheckboxFormik<Values> name="tos" validate={validateToS} label="I accept the Terms of Service" />
            <pre style={{ fontSize: 12, marginTop: 12 }}>{JSON.stringify(values, null, 2)}</pre>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
WithFormik.parameters = { ignoreFormDecorator: true }
WithFormik.tags = ['!dev']

export const WithLongLabels = () => (
  <div className={s.section}>
    <Caption>Long labels are truncated; the full text remains accessible via the underlying label element.</Caption>
    <div style={{ width: 240 }}>
      <Checkbox checked label={LONG_MULTIPLE_WORD_TEXT} name="long-multi" onChange={() => {}} />
      <Checkbox checked={false} label={LONG_ONE_WORD_TEXT} name="long-one" onChange={() => {}} />
    </div>
  </div>
)
WithLongLabels.tags = ['!dev']

export const Colored = () => (
  <div className={s.section}>
    <Caption>
      Pass <code>classNameLabel</code> and <code>classNameCheckmark</code> for one-off color overrides. Prefer the standard primary color
      whenever possible — color overrides are escape hatches, not the default.
    </Caption>
    <Checkbox
      checked
      label="Custom"
      name="colored"
      onChange={() => {}}
      classNameLabel={customStyles.redLabel}
      classNameCheckmark={customStyles.redCheckmark}
    />
  </div>
)
Colored.tags = ['!dev']

export const LegacyV3: Story = {
  render: () => {
    const LegacyDemo = () => {
      const [checked, setChecked] = useState(true)
      return (
        <div className={s.section}>
          <Caption>
            Pre-v4 visual for reference / migration only. Imported from <code>@hazelcast/ui/old</code>. Available until v5.
          </Caption>
          <LegacyCheckbox name="legacy" label="Legacy v3 checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        </div>
      )
    }
    return <LegacyDemo />
  },
  parameters: {
    docs: {
      description: {
        story: 'The pre-HIVE-4 checkbox kept under `@hazelcast/ui/old`. Avoid in new code.',
      },
    },
  },
}
LegacyV3.tags = ['!dev']
