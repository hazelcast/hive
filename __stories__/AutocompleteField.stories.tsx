import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Check, X } from 'react-feather'

import { logger } from '../src'
import {
  AutocompleteField,
  AutocompleteFieldOption,
  AutocompleteFieldProps,
  RenderOptionFunction,
} from '../src/components/AutocompleteField'
import { AutocompleteFieldFormik } from '../src/components/AutocompleteFieldFormik'
import { AutocompleteField as LegacyAutocompleteField } from '../src/old'

import styles from '../src/components/AutocompleteField.module.css'
import s from './Button.stories.module.scss'

type Args = AutocompleteFieldProps
type Story = StoryObj<typeof AutocompleteField>

const options: AutocompleteFieldOption[] = [
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
  title: 'Components/AutocompleteField',
  component: AutocompleteField,
  parameters: {
    docs: { canvas: { sourceState: 'hidden' } },
    controls: {
      include: ['label', 'placeholder', 'helperText', 'error', 'size', 'disabled', 'isClearable', 'openMenuOnClick'],
    },
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    helperText: { control: 'text', table: { category: 'Content' } },
    error: { control: 'text', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    isClearable: { control: 'boolean', table: { category: 'Behavior' } },
    openMenuOnClick: { control: 'boolean', table: { category: 'Behavior' } },
  },
  args: {
    name: 'character',
    label: 'Pick character',
    placeholder: 'Type to search…',
    options,
    value: options[1].value,
    onBlur: () => logger.log('blur'),
  },
} as Meta<Args>

const PlaygroundComponent = ({ value: initialValue, ...args }: Args) => {
  const [value, setValue] = useState<string | null>(initialValue ?? null)
  return (
    <div style={{ width: 320 }}>
      <AutocompleteField {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...(args as Args)} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Tweak any prop in the Controls panel on the right. Type into the input to filter options — matches are highlighted inline.',
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
        Use an AutocompleteField when users pick one value from a long list and benefit from typing to filter. The match is highlighted
        inline as users type.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 320px)' }}>
        <Cell label="Empty">
          <AutocompleteField
            name="basic-empty"
            label="Character"
            placeholder="Type to search…"
            options={options}
            value={a}
            onChange={setA}
          />
        </Cell>
        <Cell label="Filled">
          <AutocompleteField name="basic-filled" label="Character" options={options} value={b} onChange={setB} />
        </Cell>
      </div>
    </div>
  )
}
Basic.tags = ['!dev']

export const Sizes = () => {
  const [a, setA] = useState<string | null>(options[1].value)
  return (
    <div className={s.section}>
      <Caption>
        AutocompleteField renders at a single <strong>regular</strong> size — the compact field height used across forms.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`} style={{ gridTemplateColumns: 'repeat(2, 320px)' }}>
        <Cell label="Regular">
          <AutocompleteField name="size-regular" label="Character" options={options} value={a} onChange={setA} />
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
      <Caption>QA matrix for engineers verifying CSS changes across visual states.</Caption>
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
              <AutocompleteField
                key={r.label}
                name={`state-${label}-${r.label}`}
                label="Character"
                placeholder="Type to search…"
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
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className={s.section}>
      <Caption>The open menu attaches directly to the control with no gap. Hover and selected fills mirror SelectField.</Caption>
      <div style={{ width: 320, height: 360 }}>
        <AutocompleteField
          name="open"
          label="Character"
          options={options}
          value={value}
          onChange={setValue}
          {...({ menuIsOpen: true } as object)}
        />
      </div>
    </div>
  )
}
Open.tags = ['!dev']

export const WithHelperText = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>helperText</strong> for short hints next to the label.
      </Caption>
      <div style={{ width: 320 }}>
        <AutocompleteField
          name="helper"
          label="Character"
          options={options}
          value={value}
          onChange={setValue}
          helperText="Type a name to filter the list."
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
    <div style={{ width: 320 }}>
      <AutocompleteField name="error" label="Character" options={options} value={null} error="Required" onChange={() => {}} />
    </div>
  </div>
)
WithError.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>Use disabled when the field cannot be edited.</Caption>
    <div style={{ width: 320 }}>
      <AutocompleteField name="disabled" label="Character" options={options} value={options[1].value} disabled onChange={() => {}} />
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const Clearable = () => {
  const [value, setValue] = useState<string | null>(options[1].value)
  return (
    <div className={s.section}>
      <Caption>
        Set <strong>isClearable</strong> to render a clear button when the field has a value. Pairs well with search-style inputs.
      </Caption>
      <div style={{ width: 320 }}>
        <AutocompleteField name="clearable" label="Character" options={options} value={value} isClearable onChange={setValue} />
      </div>
    </div>
  )
}
Clearable.tags = ['!dev']

export const NoOpenOnClick = () => {
  const [value, setValue] = useState<string | null>(options[2].value)
  return (
    <div className={s.section}>
      <Caption>
        Set <strong>openMenuOnClick</strong> to <code>false</code> when the menu should only open after the user starts typing.
      </Caption>
      <div style={{ width: 320 }}>
        <AutocompleteField name="no-open" label="Character" options={options} value={value} onChange={setValue} openMenuOnClick={false} />
      </div>
    </div>
  )
}
NoOpenOnClick.tags = ['!dev']

export const CustomOptions = () => {
  const [value, setValue] = useState<string | null>(null)
  const renderOption: RenderOptionFunction = (highlighted, option, meta) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: meta.context === 'menu' ? '24px' : 0 }}>
      {option.value === value && meta.context === 'menu' && <Check size={16} color="green" style={{ position: 'absolute', left: 0 }} />}
      {highlighted}
    </div>
  )
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>renderOption</strong> to customise how each row is presented while keeping match highlighting.
      </Caption>
      <div style={{ width: 320 }}>
        <AutocompleteField
          name="custom"
          label="Character"
          options={options}
          value={value}
          onChange={setValue}
          renderOption={renderOption}
        />
      </div>
    </div>
  )
}
CustomOptions.tags = ['!dev']

export const WithFormik = () => {
  type Values = { character: string }
  const validate = (val: string | null) => (val === 'yoda' ? 'No one can be Yoda' : undefined)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>AutocompleteFieldFormik</strong> for forms managed by Formik.
      </Caption>
      <div style={{ width: 320 }}>
        <Formik<Values> initialValues={{ character: options[1].value }} onSubmit={(values) => logger.log('submit', values)}>
          {({ values }) => (
            <Form>
              <AutocompleteFieldFormik name="character" label="Character" options={options} validate={validate} />
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
        The v3 AutocompleteField is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>.
      </Caption>
      <div style={{ width: 320 }}>
        <LegacyAutocompleteField name="legacy" label="Legacy v3 AutocompleteField" options={options} value={value} onChange={setValue} />
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

const threeOptions: AutocompleteFieldOption[] = options.slice(0, 3)

const DO_DONT_PAIRS: DoDontPair[] = [
  {
    heading: 'Reach for autocomplete only when the list is worth searching',
    good: {
      note: 'A long list of options is exactly where type-to-filter pays off.',
      demo: (
        <Demo>
          <AutocompleteField name="dd-len-good" label="Character" options={options} value={options[1].value} onChange={() => {}} />
        </Demo>
      ),
    },
    bad: {
      note: 'For a handful of options a plain SelectField is faster — there’s nothing to search.',
      demo: (
        <Demo>
          <AutocompleteField name="dd-len-bad" label="Character" options={threeOptions} value={threeOptions[0].value} onChange={() => {}} />
        </Demo>
      ),
    },
  },
  {
    heading: 'Write a placeholder that signals typing',
    good: {
      note: 'Hint that the field is searchable so users start typing.',
      demo: (
        <Demo>
          <AutocompleteField
            name="dd-ph-good"
            label="Character"
            placeholder="Type to search…"
            options={options}
            value={null}
            onChange={() => {}}
          />
        </Demo>
      ),
    },
    bad: {
      note: '“Select…” reads like a static dropdown and hides that users can filter.',
      demo: (
        <Demo>
          <AutocompleteField name="dd-ph-bad" label="Character" placeholder="Select…" options={options} value={null} onChange={() => {}} />
        </Demo>
      ),
    },
  },
  {
    heading: 'Let users clear a wrong match',
    good: {
      note: 'Set isClearable so a mistaken selection can be reset in one click.',
      demo: (
        <Demo>
          <AutocompleteField
            name="dd-clr-good"
            label="Character"
            options={options}
            value={options[3].value}
            isClearable
            onChange={() => {}}
          />
        </Demo>
      ),
    },
    bad: {
      note: 'Without a clear affordance users must hand-edit the input to undo a choice.',
      demo: (
        <Demo>
          <AutocompleteField name="dd-clr-bad" label="Character" options={options} value={options[3].value} onChange={() => {}} />
        </Demo>
      ),
    },
  },
  {
    heading: 'Surface validation inline — don’t disable the field',
    good: {
      note: 'Use error to explain what’s wrong; the field announces it to assistive tech.',
      demo: (
        <Demo>
          <AutocompleteField
            name="dd-err-good"
            label="Character"
            options={options}
            value={null}
            error="Pick a character"
            onChange={() => {}}
          />
        </Demo>
      ),
    },
    bad: {
      note: 'A disabled field can’t be focused and gives users no path to fix the problem.',
      demo: (
        <Demo>
          <AutocompleteField name="dd-err-bad" label="Character" options={options} value={null} disabled onChange={() => {}} />
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
      story: 'Concrete good-and-bad pairings for when to use, how to label, and how to validate an AutocompleteField.',
    },
  },
}
