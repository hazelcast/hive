import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Aperture, Search, Check, X } from 'react-feather'

import { logger, TextField, TextFieldFormik } from '../src'
import { TextField as LegacyTextField } from '../src/old'
import { formDecorator } from './decorators'

import styles from '../src/components/TextField.module.css'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof TextField>

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

export default {
  title: 'Components/TextField',
  component: TextField,
  decorators: [formDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/uGTDLFJEVy4dCNIhlmTPRw/%F0%9F%90%9D-HIVE-3.0?node-id=26-1230',
    },
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: [
        'name',
        'value',
        'className',
        'inputContainerClassName',
        'inputClassName',
        'inputBorderOverlayClassName',
        'errorClassName',
        'inputContainerChild',
        'containerRef',
        'onBlur',
        'onFocus',
        'onChange',
        'onClick',
        'onKeyDown',
        'data-test',
        'children',
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
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      table: { category: 'Layout', defaultValue: { summary: 'medium' } },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    clearable: {
      control: 'boolean',
      description: 'Show a trailing clear button when the field has a value.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'search', 'tel', 'url'],
      table: { category: 'Behavior', defaultValue: { summary: 'text' } },
    },
  },
  args: {
    name: 'field',
    label: 'Cluster name',
    placeholder: 'e.g. production-eu',
  },
} as Meta<typeof TextField>

const PlaygroundComponent = (args: React.ComponentProps<typeof TextField>) => {
  const [value, setValue] = useState<string>('')
  return <TextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
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
  const [b, setB] = useState('hazelcast')
  return (
    <div className={s.section}>
      <Caption>
        Use a TextField for short, single-line input. Always pair it with a visible <strong>label</strong> and, when useful, a{' '}
        <strong>placeholder</strong> hint.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Empty">
          <TextField
            name="basic-empty"
            label="Cluster name"
            placeholder="e.g. production-eu"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </Cell>
        <Cell label="Filled">
          <TextField name="basic-filled" label="Cluster name" value={b} onChange={(e) => setB(e.target.value)} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Sizes = () => {
  const [a, setA] = useState('Small')
  const [b, setB] = useState('Medium')
  const [c, setC] = useState('Large')
  return (
    <div className={s.section}>
      <Caption>
        Three sizes: <strong>small</strong>, <strong>medium</strong> (default), and <strong>large</strong>. Use small in dense tables, large
        for hero forms.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Small">
          <TextField name="size-small" size="small" label="Cluster name" value={a} onChange={(e) => setA(e.target.value)} />
        </Cell>
        <Cell label="Medium">
          <TextField name="size-medium" label="Cluster name" value={b} onChange={(e) => setB(e.target.value)} />
        </Cell>
        <Cell label="Large">
          <TextField name="size-large" size="large" label="Cluster name" value={c} onChange={(e) => setC(e.target.value)} />
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
    { label: 'Error', error: 'Required' },
  ]
  const valueRows = [
    { label: 'Empty', value: '' },
    { label: 'Filled', value: 'hazelcast' },
  ]
  return (
    <div className={s.section}>
      <Caption>
        QA matrix for visual states. Interactive states are forced via classes that mirror the real <code>:hover</code> and{' '}
        <code>:focus</code> rules.
      </Caption>
      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div className={`${s.grid} ${s.gridStates}`} style={{ minWidth: 'max-content' }}>
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
                <TextField
                  key={r.label}
                  name={`state-${label}-${r.label}`}
                  label="Cluster name"
                  placeholder="e.g. production-eu"
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

export const WithIcon = () => {
  const [value, setValue] = useState('')
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>inputIcon</strong> to add a leading glyph that hints at the input&rsquo;s purpose, like a search or filter affordance.
      </Caption>
      <TextField
        name="with-icon"
        label="Search"
        placeholder="Search clusters…"
        inputIcon={Search}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
WithIcon.tags = ['!dev']

export const WithTrailingIcon = () => {
  const [value, setValue] = useState('hazelcast')
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>inputTrailingIcon</strong> for actions or status. Always pair with <strong>inputTrailingIconLabel</strong> for screen
        readers.
      </Caption>
      <TextField
        name="with-trailing"
        label="Cluster name"
        inputTrailingIcon={Aperture}
        inputTrailingIconLabel="Open camera"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
WithTrailingIcon.tags = ['!dev']

export const WithHelperText = () => {
  const [value, setValue] = useState('')
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>helperText</strong> for short hints. The help icon renders inline with the label and the message appears in a tooltip.
      </Caption>
      <TextField
        name="helper"
        label="Cluster name"
        placeholder="e.g. production-eu"
        helperText="Lowercase letters, digits and hyphens. 3–32 characters."
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
    <TextField
      name="error"
      label="Cluster name"
      placeholder="e.g. production-eu"
      value=""
      error="Cluster name is required."
      onChange={(e) => logger.log('change', e.target.value)}
    />
  </div>
)
WithError.tags = ['!dev']

export const WithClearButton = () => {
  const [value, setValue] = useState('hazelcast')
  return (
    <div className={s.section}>
      <Caption>
        Set <strong>clearable</strong> to show a trailing clear button when the field has a value. Pairs well with search inputs.
      </Caption>
      <TextField
        name="clearable"
        type="search"
        label="Search"
        placeholder="Search clusters…"
        inputIcon={Search}
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
WithClearButton.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>disabled</strong> when the field cannot be edited in the current context.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      <Cell label="Empty">
        <TextField name="disabled-empty" label="Cluster name" placeholder="e.g. production-eu" value="" disabled onChange={() => {}} />
      </Cell>
      <Cell label="Filled">
        <TextField name="disabled-filled" label="Cluster name" value="hazelcast" disabled onChange={() => {}} />
      </Cell>
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const WithFormik = () => {
  type Values = { clusterName: string }
  const validate = (value: string | undefined) => (!value ? 'Cluster name is required.' : undefined)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>TextFieldFormik</strong> inside a Formik form to wire validation and submission automatically. The component reads name,
        value and error from Formik state.
      </Caption>
      <Formik<Values> initialValues={{ clusterName: '' }} onSubmit={(values) => logger.log('submit', values)}>
        {({ values }) => (
          <Form>
            <TextFieldFormik<Values> name="clusterName" validate={validate} label="Cluster name" placeholder="e.g. production-eu" />
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
    heading: 'Always pair with a visible label',
    good: {
      note: 'A clear label tells users what the field is for and doubles as the accessible name.',
      demo: <TextField name="do-1" label="Cluster name" placeholder="e.g. production-eu" value="" onChange={() => {}} />,
    },
    bad: {
      note: 'Relying on placeholder alone leaves users guessing once they start typing — and screen readers may skip it.',
      demo: <TextField name="dont-1" placeholder="Cluster name" value="" onChange={() => {}} />,
    },
  },
  {
    heading: 'Use placeholders for example values, not instructions',
    good: {
      note: 'A concrete example gives users a head start and disappears once they type.',
      demo: <TextField name="do-2" label="Cluster name" placeholder="e.g. production-eu" value="" onChange={() => {}} />,
    },
    bad: {
      note: 'Don\u2019t restate the label as a placeholder — surface real guidance via helperText instead.',
      demo: <TextField name="dont-2" label="Cluster name" placeholder="Enter cluster name" value="" onChange={() => {}} />,
    },
  },
  {
    heading: 'Surface validation errors inline',
    good: {
      note: 'Errors appear directly below the field so users can fix problems in context.',
      demo: <TextField name="do-3" label="Cluster name" value="" error="Cluster name is required." onChange={() => {}} />,
    },
    bad: {
      note: 'Burying validation in a banner forces users to scroll back and forth.',
      demo: <TextField name="dont-3" label="Cluster name" value="" onChange={() => {}} />,
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
  const [value, setValue] = useState('hazelcast')
  return (
    <div className={s.section}>
      <Caption>
        The v3 TextField is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the
        TextField above.
      </Caption>
      <LegacyTextField name="legacy" label="Legacy v3 TextField" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
LegacyV3.tags = ['!dev']
