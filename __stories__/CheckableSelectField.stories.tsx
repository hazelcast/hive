import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'

import { logger } from '../src'
import { CheckableSelectField, CheckableSelectProps } from '../src/components/Select/CheckableSelectField'
import { CheckableSelectFieldFormik } from '../src/components/Select/CheckableSelectFieldFormik'
import { SelectFieldOption } from '../src/components/Select/helpers'
import { CheckableSelectField as LegacyCheckableSelectField } from '../src/old'

import s from './Button.stories.module.scss'

type Args = CheckableSelectProps<string>
type Story = StoryObj<typeof CheckableSelectField>

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
  title: 'Components/CheckableSelectField',
  component: CheckableSelectField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=23167%3A4292',
    },
    docs: { canvas: { sourceState: 'hidden' } },
    controls: {
      exclude: ['name', 'value', 'className', 'onBlur', 'onChange', 'options', 'noOptionsMessage', 'data-test'],
    },
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    helperText: { control: 'text', table: { category: 'Content' } },
    error: { control: 'text', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    defaultOpen: { control: 'boolean', table: { category: 'State' } },
  },
  args: {
    name: 'characters',
    label: 'Pick characters',
    placeholder: 'Select one or more',
    options,
    value: [options[1].value],
    noOptionsMessage: 'No options',
    'data-test': 'checkable-select-field',
    onBlur: () => logger.log('blur'),
  },
} as Meta<Args>

const PlaygroundComponent = ({ value: initialValue, ...args }: Args) => {
  const [value, setValue] = useState<string[]>(initialValue ?? [])
  return (
    <div style={{ width: 360 }}>
      <CheckableSelectField {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...(args as Args)} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: { story: 'Tweak any prop in the Controls panel on the right.' },
    },
  },
}

export const Basic = () => {
  const [a, setA] = useState<string[]>([])
  const [b, setB] = useState<string[]>([options[1].value, options[2].value])
  return (
    <div className={s.section}>
      <Caption>
        Use a CheckableSelectField when users pick many values from a list and the dropdown should stay open during selection.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 360px)' }}>
        <Cell label="Empty">
          <CheckableSelectField
            name="basic-empty"
            label="Characters"
            placeholder="Select one or more"
            options={options}
            value={a}
            onChange={setA}
            data-test="basic-empty"
          />
        </Cell>
        <Cell label="Multiple">
          <CheckableSelectField
            name="basic-filled"
            label="Characters"
            options={options}
            value={b}
            onChange={setB}
            data-test="basic-filled"
          />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Open = () => {
  const [value, setValue] = useState<string[]>([options[1].value])
  return (
    <div className={s.section}>
      <Caption>The open dropdown shows checkable rows with a search input. Selection persists as the user filters.</Caption>
      <div style={{ width: 360, height: 380 }}>
        <CheckableSelectField
          name="open"
          label="Characters"
          options={options}
          value={value}
          onChange={setValue}
          defaultOpen
          data-test="open"
        />
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
        Use <strong>helperText</strong> for short hints next to the label.
      </Caption>
      <div style={{ width: 360 }}>
        <CheckableSelectField
          name="helper"
          label="Characters"
          options={options}
          value={value}
          onChange={setValue}
          helperText="Pick anyone you align with."
          data-test="helper"
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
      <CheckableSelectField
        name="error"
        label="Characters"
        options={options}
        value={[]}
        error="Pick at least one"
        onChange={() => {}}
        data-test="error"
      />
    </div>
  </div>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>Use disabled when the field cannot be edited.</Caption>
    <div style={{ width: 360 }}>
      <CheckableSelectField
        name="disabled"
        label="Characters"
        options={options}
        value={[options[1].value]}
        disabled
        onChange={() => {}}
        data-test="disabled"
      />
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const NoOptions = () => (
  <div className={s.section}>
    <Caption>The empty-options state shows the configured fallback message.</Caption>
    <div style={{ width: 360, height: 220 }}>
      <CheckableSelectField<string>
        name="empty"
        label="Characters"
        options={[]}
        value={[]}
        defaultOpen
        onChange={() => {}}
        data-test="empty"
      />
    </div>
  </div>
)
NoOptions.tags = ['!dev']

export const WithFormik = () => {
  type Values = { characters: string[] }
  const validate = (vals: string[]) => (vals.length >= 3 ? undefined : 'Pick at least three characters')
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>CheckableSelectFieldFormik</strong> for forms managed by Formik.
      </Caption>
      <div style={{ width: 360 }}>
        <Formik<Values> initialValues={{ characters: [options[1].value] }} onSubmit={(values) => logger.log('submit', values)}>
          {({ values }) => (
            <Form>
              <CheckableSelectFieldFormik<Values>
                name="characters"
                label="Characters"
                options={options}
                validate={validate}
                data-test="formik"
              />
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
  const [value, setValue] = useState<string[]>([options[1].value])
  return (
    <div className={s.section}>
      <Caption>
        The v3 CheckableSelectField is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>.
      </Caption>
      <div style={{ width: 360 }}>
        <LegacyCheckableSelectField
          name="legacy"
          label="Legacy v3 CheckableSelectField"
          options={options}
          value={value}
          onChange={setValue}
          data-test="legacy"
        />
      </div>
    </div>
  )
}
LegacyV3.tags = ['!dev']
