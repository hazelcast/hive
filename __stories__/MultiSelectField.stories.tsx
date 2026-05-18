import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'

import { logger } from '../src'
import { MultiSelectField, MultiSelectProps } from '../src/components/Select/MultiSelectField'
import { MultiSelectFieldFormik } from '../src/components/Select/MultiSelectFieldFormik'
import { SelectFieldOption } from '../src/components/Select/helpers'
import { MultiSelectField as LegacyMultiSelectField } from '../src/old'
import { LONG_MULTIPLE_WORD_TEXT, LONG_ONE_WORD_TEXT } from './constants'

import styles from '../src/components/Select/SelectField.module.css'
import s from './Button.stories.module.scss'

type Args = MultiSelectProps<string>
type Story = StoryObj<typeof MultiSelectField>

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
  title: 'Components/MultiSelectField',
  component: MultiSelectField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=23167%3A4292',
    },
    docs: { canvas: { sourceState: 'hidden' } },
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
    isCreatable: { control: 'boolean', table: { category: 'Behavior' } },
  },
  args: {
    name: 'characters',
    label: 'Pick characters',
    placeholder: 'Select one or more',
    options,
    value: [options[1].value],
    noOptionsMessage: () => 'No characters',
    onBlur: () => logger.log('blur'),
  },
} as Meta<Args>

const PlaygroundComponent = ({ value: initialValue, ...args }: Args) => {
  const [value, setValue] = useState<string[]>(initialValue ?? [])
  return (
    <div style={{ width: 360 }}>
      <MultiSelectField {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...(args as Args)} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Tweak any prop in the Controls panel on the right.',
      },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState<string[]>([])
  const [b, setB] = useState<string[]>([options[1].value, options[2].value])
  return (
    <div className={s.section}>
      <Caption>
        Use a MultiSelectField when users pick zero, one, or many values from a list. Selected values render as removable chips inside the
        control.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 360px)' }}>
        <Cell label="Empty">
          <MultiSelectField
            name="basic-empty"
            label="Characters"
            placeholder="Select one or more"
            options={options}
            value={a}
            onChange={setA}
          />
        </Cell>
        <Cell label="Multiple">
          <MultiSelectField name="basic-filled" label="Characters" options={options} value={b} onChange={setB} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Sizes = () => {
  const [a, setA] = useState<string[]>([options[1].value, options[2].value])
  const [b, setB] = useState<string[]>([options[1].value, options[2].value])
  return (
    <div className={s.section}>
      <Caption>
        Two sizes: <strong>small</strong> for dense tables and toolbars, <strong>medium</strong> (default) for most forms.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 360px)' }}>
        <Cell label="Small">
          <MultiSelectField name="size-small" size="small" label="Characters" options={options} value={a} onChange={setA} />
        </Cell>
        <Cell label="Medium">
          <MultiSelectField name="size-medium" label="Characters" options={options} value={b} onChange={setB} />
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
  const valueRows: { label: string; value: string[] }[] = [
    { label: 'Empty', value: [] },
    { label: 'With chips', value: [options[1].value, options[2].value] },
  ]
  return (
    <div className={s.section}>
      <Caption>QA matrix for engineers verifying CSS changes across visual states.</Caption>
      <div
        className={`${s.grid} ${s.gridStates}`}
        style={{ gridTemplateColumns: 'max-content repeat(5, minmax(0, 240px))', gap: '16px 12px', alignItems: 'start' }}
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
              <MultiSelectField
                key={r.label}
                name={`state-${label}-${r.label}`}
                label="Characters"
                placeholder="Select one or more"
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

export const Open = () => {
  const [value, setValue] = useState<string[]>([options[1].value])
  return (
    <div className={s.section}>
      <Caption>The open menu state shows option rows with hover and selected fills.</Caption>
      <div style={{ width: 360, height: 360 }}>
        <MultiSelectField name="open" label="Characters" options={options} value={value} onChange={setValue} menuIsOpen />
      </div>
    </div>
  )
}
Open.tags = ['!dev']

export const WithHelperText = () => {
  const [value, setValue] = useState<string[]>([])
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>helperText</strong> for short hints. The help icon renders next to the label and reveals the message in a tooltip.
      </Caption>
      <div style={{ width: 360 }}>
        <MultiSelectField
          name="helper"
          label="Characters"
          options={options}
          value={value}
          onChange={setValue}
          helperText="Pick anyone you align with."
        />
      </div>
    </div>
  )
}
WithHelperText.tags = ['!dev']

export const WithError = () => (
  <div className={s.section}>
    <Caption>
      Set <strong>error</strong> to surface a validation message inline.
    </Caption>
    <div style={{ width: 360 }}>
      <MultiSelectField name="error" label="Characters" options={options} value={[]} error="Pick at least one" onChange={() => {}} />
    </div>
  </div>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>Use disabled when the field cannot be edited.</Caption>
    <div style={{ width: 360 }}>
      <MultiSelectField name="disabled" label="Characters" options={options} value={[options[1].value]} disabled onChange={() => {}} />
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const LongOptions = () => {
  const [value, setValue] = useState<string[]>([])
  return (
    <div className={s.section}>
      <Caption>Long option labels truncate with a tooltip preserving the full value.</Caption>
      <div style={{ width: 360, height: 360 }}>
        <MultiSelectField
          name="long"
          label="Characters"
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
  type Values = { characters: string[] }
  const validate = (vals: string[]) => (vals.length >= 3 ? undefined : 'Pick at least three characters')
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>MultiSelectFieldFormik</strong> for forms managed by Formik.
      </Caption>
      <div style={{ width: 360 }}>
        <Formik<Values> initialValues={{ characters: [options[1].value] }} onSubmit={(values) => logger.log('submit', values)}>
          {({ values }) => (
            <Form>
              <MultiSelectFieldFormik<Values> name="characters" label="Characters" options={options} validate={validate} />
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
  const [value, setValue] = useState<string[]>([options[1].value, options[2].value])
  return (
    <div className={s.section}>
      <Caption>
        The v3 MultiSelectField is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>.
      </Caption>
      <div style={{ width: 360 }}>
        <LegacyMultiSelectField name="legacy" label="Legacy v3 MultiSelectField" options={options} value={value} onChange={setValue} />
      </div>
    </div>
  )
}
LegacyV3.tags = ['!dev']
