import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Check, X } from 'react-feather'

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
      include: ['label', 'placeholder', 'helperText', 'error', 'disabled', 'isCreatable', 'isSearchable', 'menuIsOpen'],
    },
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    helperText: { control: 'text', table: { category: 'Content' } },
    error: { control: 'text', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    isCreatable: { control: 'boolean', table: { category: 'Behavior' } },
    isSearchable: { control: 'boolean', table: { category: 'Behavior' } },
    menuIsOpen: { control: 'boolean', table: { category: 'State' } },
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
  return (
    <div className={s.section}>
      <Caption>
        MultiSelectField renders at a single <strong>regular</strong> size — the compact field height used across forms.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 360px)' }}>
        <Cell label="Regular">
          <MultiSelectField name="size-regular" label="Characters" options={options} value={a} onChange={setA} />
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

type DoDontPair = {
  heading: string
  good: { note: string; demo: ReactNode }
  bad: { note: string; demo: ReactNode }
}

const Demo = ({ children }: { children: ReactNode }) => <div style={{ width: '100%' }}>{children}</div>

const longOptions: SelectFieldOption<string>[] = [
  { value: 'a', label: LONG_MULTIPLE_WORD_TEXT },
  { value: 'b', label: LONG_ONE_WORD_TEXT },
  ...options,
]

const DO_DONT_PAIRS: DoDontPair[] = [
  {
    heading: 'Use chips for a manageable number of selections',
    good: {
      note: 'A handful of chips reads cleanly in one or two rows and stays scannable.',
      demo: (
        <Demo>
          <MultiSelectField
            name="dd-count-good"
            label="Characters"
            options={options}
            value={[options[1].value, options[2].value]}
            onChange={() => {}}
          />
        </Demo>
      ),
    },
    bad: {
      note: 'When users routinely pick many values the chips pile up — reach for CheckableSelectField instead.',
      demo: (
        <Demo>
          <MultiSelectField
            name="dd-count-bad"
            label="Characters"
            options={options}
            value={options.map((o) => o.value)}
            onChange={() => {}}
          />
        </Demo>
      ),
    },
  },
  {
    heading: 'Keep option labels short so chips stay compact',
    good: {
      note: 'Short labels make small chips, so several fit on one row.',
      demo: (
        <Demo>
          <MultiSelectField
            name="dd-label-good"
            label="Characters"
            options={options}
            value={[options[0].value, options[3].value]}
            onChange={() => {}}
          />
        </Demo>
      ),
    },
    bad: {
      note: 'Long labels become oversized chips that wrap and truncate — trim them before they reach the control.',
      demo: (
        <Demo>
          <MultiSelectField name="dd-label-bad" label="Characters" options={longOptions} value={['a', 'b']} onChange={() => {}} />
        </Demo>
      ),
    },
  },
  {
    heading: 'Reach for MultiSelectField only when many values apply',
    good: {
      note: 'Use it when zero, one, or many values are all valid answers.',
      demo: (
        <Demo>
          <MultiSelectField
            name="dd-fit-good"
            label="Characters"
            options={options}
            value={[options[1].value, options[4].value]}
            onChange={() => {}}
          />
        </Demo>
      ),
    },
    bad: {
      note: 'If exactly one value is ever correct, a SelectField is clearer and prevents invalid multi-selections.',
      demo: (
        <Demo>
          <MultiSelectField name="dd-fit-bad" label="Primary character" options={options} value={[options[1].value]} onChange={() => {}} />
        </Demo>
      ),
    },
  },
  {
    heading: 'Surface validation inline \u2014 don\u2019t disable the field',
    good: {
      note: 'Use error to explain what\u2019s missing. The control turns invalid and announces the message.',
      demo: (
        <Demo>
          <MultiSelectField
            name="dd-error-good"
            label="Characters"
            options={options}
            value={[]}
            error="Pick at least one"
            onChange={() => {}}
          />
        </Demo>
      ),
    },
    bad: {
      note: 'Don\u2019t disable a required field to force a choice \u2014 disabled controls aren\u2019t focusable and give no guidance.',
      demo: (
        <Demo>
          <MultiSelectField name="dd-error-bad" label="Characters" options={options} value={[]} disabled onChange={() => {}} />
        </Demo>
      ),
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
      story: 'Concrete good-and-bad pairings for choosing, labelling, and validating a MultiSelectField.',
    },
  },
}
