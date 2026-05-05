import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Check, X } from 'react-feather'

import { logger, Toggle, ToggleFormik } from '../src'
import { Toggle as LegacyToggle } from '../src/old'
import { formDecorator } from './decorators'

import styles from '../src/components/Toggle.module.css'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof Toggle>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

export default {
  title: 'Components/Toggle',
  component: Toggle,
  decorators: [formDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/uGTDLFJEVy4dCNIhlmTPRw/%F0%9F%90%9D-HIVE-3.0?node-id=26-1326',
    },
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: ['name', 'value', 'className', 'classNameLabel', 'onBlur', 'onChange', 'data-test'],
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label rendered next to the track. Recommended for every toggle.',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Secondary text shown via a help icon. Use for short hints; reach for a tooltip-only Help when space is tight.',
      table: { category: 'Content' },
    },
    error: {
      control: 'text',
      description: 'Error message. When set, the toggle renders in error state and announces the message to assistive tech.',
      table: { category: 'State' },
    },
    checked: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    name: 'toggle',
    label: 'Turbo mode',
    checked: true,
  },
} as Meta<typeof Toggle>

const PlaygroundComponent = ({ checked: checkedProp, ...args }: React.ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = useState<boolean>(!!checkedProp)
  return <Toggle {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...args} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Type into **label** for the visible text, **helperText** to add a tooltip help icon, or **error** to render the error state.',
      },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <div className={s.section}>
      <Caption>
        Toggles flip an instant setting on or off. Prefer them over checkboxes when the change applies immediately and there is no
        &ldquo;save&rdquo; step. Always provide a <strong>label</strong>.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Checked">
          <Toggle name="basic-on" label="Notifications" checked={a} onChange={(e) => setA(e.target.checked)} />
        </Cell>
        <Cell label="Unchecked">
          <Toggle name="basic-off" label="Auto-update" checked={b} onChange={(e) => setB(e.target.checked)} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const WithoutLabel = () => {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <div className={s.section}>
      <Caption>
        A label-less toggle is permitted only when an adjacent visible element provides the accessible name (e.g. a row label in a table).
        Otherwise always pass <strong>label</strong>.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Checked">
          <Toggle name="nolabel-on" checked={a} onChange={(e) => setA(e.target.checked)} />
        </Cell>
        <Cell label="Unchecked">
          <Toggle name="nolabel-off" checked={b} onChange={(e) => setB(e.target.checked)} />
        </Cell>
      </div>
    </div>
  )
}
WithoutLabel.tags = ['!dev']

export const WithHelperText = () => {
  const [checked, setChecked] = useState(true)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>helperText</strong> to give context behind a setting. The help icon renders inline with the label and the message
        appears in a tooltip.
      </Caption>
      <Toggle
        name="helper"
        label="Enable telemetry"
        helperText="Anonymised usage metrics. You can disable this at any time."
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  )
}
WithHelperText.tags = ['!dev']

export const WithError = () => (
  <div className={s.section}>
    <Caption>
      Set <strong>error</strong> to surface a validation message. The toggle becomes <code>aria-invalid</code> and links to the message via
      <code>aria-errormessage</code>.
    </Caption>
    <Toggle
      name="error"
      label="Accept terms"
      error="You must accept the terms to continue."
      checked={false}
      onChange={(e) => logger.log('change', e.target.checked)}
    />
  </div>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>disabled</strong> when the toggle cannot be changed in the current context. Prefer hiding the control entirely if it is
      irrelevant; use disabled to communicate &ldquo;locked but possible&rdquo;.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      <Cell label="Disabled checked">
        <Toggle name="disabled-on" label="Beta features" checked disabled onChange={() => {}} />
      </Cell>
      <Cell label="Disabled unchecked">
        <Toggle name="disabled-off" label="Beta features" checked={false} disabled onChange={() => {}} />
      </Cell>
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const States = () => {
  const stateRows: { label: string; classNameLabel?: string; disabled?: boolean; error?: string }[] = [
    { label: 'Default' },
    { label: 'Hover', classNameLabel: styles.hover },
    { label: 'Focus', classNameLabel: styles.focus },
    { label: 'Disabled', disabled: true },
    { label: 'Error', error: 'Required' },
  ]
  const checkedRows = [
    { label: 'Checked', checked: true },
    { label: 'Unchecked', checked: false },
  ]
  return (
    <div className={s.section}>
      <Caption>
        QA matrix for visual states. Use this to verify CSS changes — interactive states are forced via classes that mirror the real{' '}
        <code>:hover</code> and <code>:focus</code> rules.
      </Caption>
      <div className={`${s.grid} ${s.gridStates}`}>
        <span />
        {stateRows.map((r) => (
          <span key={r.label} className={s.label}>
            {r.label}
          </span>
        ))}
        {checkedRows.map(({ label, checked }) => (
          <React.Fragment key={label}>
            <span className={s.rowLabel}>{label}</span>
            {stateRows.map((r) => (
              <Toggle
                key={r.label}
                name={`state-${label}-${r.label}`}
                label={label}
                checked={checked}
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

export const WithFormik = () => {
  type Values = { turboMode: boolean }
  const validateTurbo = (value: boolean) => (!value ? 'Turbo mode must be on.' : undefined)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>ToggleFormik</strong> inside a Formik form to wire validation and submission automatically. The component reads name,
        value and error from Formik state.
      </Caption>
      <Formik<Values> initialValues={{ turboMode: false }} onSubmit={(values) => logger.log('submit', values)}>
        {({ values }) => (
          <Form>
            <ToggleFormik<Values> name="turboMode" validate={validateTurbo} label="Turbo mode" />
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
    heading: 'Use a toggle for instant settings',
    good: {
      note: 'Toggles fit binary on/off settings that take effect immediately, like notifications or feature flags.',
      demo: <Toggle name="do-1" label="Email notifications" checked onChange={() => {}} />,
    },
    bad: {
      note: 'Don\u2019t use a toggle for choices that need a save step — reach for a Checkbox inside a form instead.',
      demo: <Toggle name="dont-1" label="I accept the terms" checked={false} onChange={() => {}} />,
    },
  },
  {
    heading: 'Label every toggle',
    good: {
      note: 'A visible label tells users what changes when they flip it, and it doubles as the accessible name.',
      demo: <Toggle name="do-2" label="Auto-update plugins" checked onChange={() => {}} />,
    },
    bad: {
      note: 'A standalone toggle with no label gives no clue what it controls — even if surrounding copy explains it.',
      demo: <Toggle name="dont-2" checked onChange={() => {}} />,
    },
  },
  {
    heading: 'Phrase labels as positive states',
    good: {
      note: 'Use the on-state as the label so &ldquo;on&rdquo; means the thing happens. Avoid double negatives.',
      demo: <Toggle name="do-3" label="Show advanced options" checked onChange={() => {}} />,
    },
    bad: {
      note: 'Negative labels make &ldquo;on = off&rdquo; — confusing.',
      demo: <Toggle name="dont-3" label="Hide advanced options" checked onChange={() => {}} />,
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
  const [checked, setChecked] = useState<boolean>(true)
  return (
    <div className={s.section}>
      <Caption>
        The v3 Toggle is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the Toggle
        above.
      </Caption>
      <LegacyToggle name="legacy" checked={checked} label="Legacy v3 Toggle" onChange={(e) => setChecked(e.target.checked)} />
    </div>
  )
}
LegacyV3.tags = ['!dev']
