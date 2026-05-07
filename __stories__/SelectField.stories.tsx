import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Aperture } from 'react-feather'
import { GroupBase } from 'react-select'

import { logger } from '../src'
import { SelectField, SelectFieldProps } from '../src/components/Select/SelectField'
import { SelectFieldFormik } from '../src/components/Select/SelectFieldFormik'
import { SelectFieldOption } from '../src/components/Select/helpers'
import { SelectField as LegacySelectField } from '../src/old'
import { LONG_MULTIPLE_WORD_TEXT, LONG_ONE_WORD_TEXT } from './constants'

import styles from '../src/components/Select/SelectField.module.css'
import s from './Button.stories.module.scss'

type Args = SelectFieldProps<string>
type Story = StoryObj<typeof SelectField>

const options: SelectFieldOption<string>[] = [
  { value: 'darth_vader', label: 'Darth Vader' },
  { value: 'luke_skywalker', label: 'Luke Skywalker' },
  { value: 'obi', label: 'Obi-Wan Kenobi' },
  { value: 'yoda', label: 'Yoda' },
  { value: 'han_solo', label: 'Han Solo' },
  { value: 'boba_fett', label: 'Boba Fett' },
  { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
]

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

export default {
  title: 'Components/SelectField',
  component: SelectField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=510%3A1',
    },
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: ['name', 'value', 'className', 'menuPortalTarget', 'onBlur', 'onChange', 'noOptionsMessage', 'options', 'data-test'],
    },
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    helperText: { control: 'text', table: { category: 'Content' } },
    error: { control: 'text', table: { category: 'State' } },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
      table: { category: 'Layout', defaultValue: { summary: 'medium' } },
    },
    disabled: { control: 'boolean', table: { category: 'State' } },
    isClearable: { control: 'boolean', table: { category: 'Behavior' } },
    isCreatable: { control: 'boolean', table: { category: 'Behavior' } },
    menuIsOpen: { control: 'boolean', table: { category: 'State' } },
  },
  args: {
    name: 'character',
    label: 'Pick character',
    placeholder: 'Select an option',
    options,
    value: options[1].value,
    noOptionsMessage: () => 'No characters',
    onBlur: () => logger.log('blur'),
  },
} as Meta<Args>

const PlaygroundComponent = ({ value: initialValue, ...args }: Args) => {
  const [value, setValue] = useState<string | null>(initialValue ?? null)
  return (
    <div style={{ width: 320 }}>
      <SelectField {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...(args as Args)} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Type into **label** for the visible text, **placeholder** for the empty hint, or **error** to render the error state.',
      },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState<string | null>(null)
  const [b, setB] = useState<string | null>(options[1].value)
  return (
    <div className={s.section}>
      <Caption>
        Use a SelectField when users pick exactly one value from a fixed list. Always pair with a visible <strong>label</strong>.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 320px)' }}>
        <Cell label="Empty">
          <SelectField name="basic-empty" label="Character" placeholder="Select an option" options={options} value={a} onChange={setA} />
        </Cell>
        <Cell label="Filled">
          <SelectField name="basic-filled" label="Character" options={options} value={b} onChange={setB} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Sizes = () => {
  const [a, setA] = useState<string | null>(options[1].value)
  const [b, setB] = useState<string | null>(options[1].value)
  return (
    <div className={s.section}>
      <Caption>
        Two sizes: <strong>small</strong> for dense tables and toolbars, <strong>medium</strong> (default) for most forms.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 320px)' }}>
        <Cell label="Small">
          <SelectField name="size-small" size="small" label="Character" options={options} value={a} onChange={setA} />
        </Cell>
        <Cell label="Medium">
          <SelectField name="size-medium" label="Character" options={options} value={b} onChange={setB} />
        </Cell>
      </div>
    </div>
  )
}
Sizes.tags = ['!dev']

export const States = () => {
  const stateRows: { label: string; className?: string; disabled?: boolean; error?: string }[] = [
    { label: 'Default' },
    { label: 'Hover', className: styles.hover },
    { label: 'Focus', className: styles.focus },
    { label: 'Disabled', disabled: true },
    { label: 'Error', error: 'Required' },
  ]
  const valueRows: { label: string; value: string | null }[] = [
    { label: 'Empty', value: null },
    { label: 'Filled', value: options[1].value },
  ]
  return (
    <div className={s.section}>
      <Caption>
        QA matrix for engineers verifying CSS changes. Hover and focus are forced via classes that mirror the real <code>:hover</code> and{' '}
        <code>:focus</code> rules.
      </Caption>
      <div
        className={`${s.grid} ${s.gridStates}`}
        style={{ gridTemplateColumns: 'max-content repeat(5, minmax(0, 220px))', gap: '16px 12px', alignItems: 'start' }}
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
              <SelectField
                key={r.label}
                name={`state-${label}-${r.label}`}
                label="Character"
                placeholder="Select an option"
                options={options}
                value={value}
                disabled={r.disabled}
                error={r.error}
                className={r.className}
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
      story: 'Visual QA matrix. Not part of the public spec — included so engineers can verify state styling at a glance.',
    },
  },
}

export const Open = () => {
  const [value, setValue] = useState<string | null>(options[0].value)
  return (
    <div className={s.section}>
      <Caption>The open menu state shows option rows with hover and selected fills.</Caption>
      <div style={{ width: 320, height: 320 }}>
        <SelectField name="open" label="Character" options={options} value={value} onChange={setValue} menuIsOpen />
      </div>
    </div>
  )
}
Open.tags = ['!dev']

export const WithIcon = () => {
  const [value, setValue] = useState<string | null>(options[1].value)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>iconLeft</strong> for a leading glyph that hints at the field&rsquo;s purpose.
      </Caption>
      <div style={{ width: 320 }}>
        <SelectField
          name="with-icon"
          label="Character"
          options={options}
          value={value}
          onChange={setValue}
          iconLeft={Aperture}
          iconLeftAriaLabel="Aperture"
        />
      </div>
    </div>
  )
}
WithIcon.tags = ['!dev']

export const WithHelperText = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>helperText</strong> for short hints. The help icon renders next to the label and reveals the message in a tooltip.
      </Caption>
      <div style={{ width: 320 }}>
        <SelectField
          name="helper"
          label="Character"
          options={options}
          value={value}
          onChange={setValue}
          helperText="Pick the side you align with."
        />
      </div>
    </div>
  )
}
WithHelperText.tags = ['!dev']

export const WithError = () => (
  <div className={s.section}>
    <Caption>
      Set <strong>error</strong> to surface a validation message inline. The control becomes <code>aria-invalid</code> and the message is
      announced.
    </Caption>
    <div style={{ width: 320 }}>
      <SelectField name="error" label="Character" options={options} value={null} error="Required" onChange={() => {}} />
    </div>
  </div>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>disabled</strong> when the field cannot be edited in the current context.
    </Caption>
    <div style={{ width: 320 }}>
      <SelectField name="disabled" label="Character" options={options} value={options[1].value} disabled onChange={() => {}} />
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const Clearable = () => {
  const [value, setValue] = useState<string | null>(options[1].value)
  return (
    <div className={s.section}>
      <Caption>
        Set <strong>isClearable</strong> to render a clear button when the field has a value.
      </Caption>
      <div style={{ width: 320 }}>
        <SelectField name="clearable" label="Character" options={options} value={value} isClearable onChange={setValue} />
      </div>
    </div>
  )
}
Clearable.tags = ['!dev']

const groupedOptions: ReadonlyArray<GroupBase<SelectFieldOption<string>>> = [
  {
    label: 'Dark Side',
    options: [
      { value: 'darth_vader', label: 'Darth Vader' },
      { value: 'boba_fett', label: 'Boba Fett' },
      { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
    ],
  },
  {
    label: 'Light Side',
    options: [
      { value: 'luke_skywalker', label: 'Luke Skywalker' },
      { value: 'obi', label: 'Obi-Wan Kenobi' },
      { value: 'yoda', label: 'Yoda' },
      { value: 'han_solo', label: 'Han Solo' },
    ],
  },
]

export const Grouped = () => {
  const [value, setValue] = useState<string | null>(groupedOptions[1].options[0].value)
  return (
    <div className={s.section}>
      <Caption>Group related options under section headings to keep long lists scannable.</Caption>
      <div style={{ width: 320, height: 320 }}>
        <SelectField name="grouped" label="Character" options={groupedOptions} value={value} onChange={setValue} />
      </div>
    </div>
  )
}
Grouped.tags = ['!dev']

export const LongOptions = () => {
  const [value, setValue] = useState<string | null>('10000')
  return (
    <div className={s.section}>
      <Caption>Long option labels truncate with a tooltip preserving the full value.</Caption>
      <div style={{ width: 320, height: 320 }}>
        <SelectField
          name="long"
          label="Character"
          value={value}
          onChange={setValue}
          options={[{ value: '10000', label: LONG_MULTIPLE_WORD_TEXT }, { value: '10001', label: LONG_ONE_WORD_TEXT }, ...options]}
        />
      </div>
    </div>
  )
}
LongOptions.tags = ['!dev']

export const WithFormik = () => {
  type Values = { character: string }
  const validate = (val: string | null) => (val !== 'yoda' ? 'Please pick Yoda' : undefined)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>SelectFieldFormik</strong> for forms managed by Formik. It wires <code>value</code>, <code>onChange</code>, and
        validation errors automatically.
      </Caption>
      <div style={{ width: 320 }}>
        <Formik<Values> initialValues={{ character: options[1].value }} onSubmit={(values) => logger.log('submit', values)}>
          {({ values }) => (
            <Form>
              <SelectFieldFormik<Values> name="character" label="Character" options={options} validate={validate} />
              <pre style={{ marginTop: 12 }}>{JSON.stringify(values, null, 2)}</pre>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
WithFormik.tags = ['!dev']

export const LegacyV3 = () => {
  const [value, setValue] = useState<string | null>(options[1].value)
  return (
    <div className={s.section}>
      <Caption>
        The v3 SelectField is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the
        SelectField above.
      </Caption>
      <div style={{ width: 320 }}>
        <LegacySelectField name="legacy" label="Legacy v3 SelectField" options={options} value={value} onChange={setValue} />
      </div>
    </div>
  )
}
LegacyV3.tags = ['!dev']
