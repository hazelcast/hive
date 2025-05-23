import React, { ReactNode, useState } from 'react'
import { logger } from '../src'
import { Meta, StoryFn } from '@storybook/react'
import { Aperture } from 'react-feather'
import { Form, Formik } from 'formik'

import { SelectField, SelectFieldProps } from '../src/components/Select/SelectField'
import { SelectFieldOption } from '../src/components/Select/helpers'
import { SelectFieldFormik } from '../src/components/Select/SelectFieldFormik'
import { LONG_MULTIPLE_WORD_TEXT, LONG_ONE_WORD_TEXT } from './constants'

import styles from '../src/components/Select/SelectField.module.scss'
import { GroupBase } from 'react-select'

const options: SelectFieldOption<string>[] = [
  { value: 'darth_vader', label: 'Darth Vader' },
  { value: 'luke_skywalker', label: 'Luke Skywalker' },
  { value: 'obi', label: 'Obi-Wan Kenobi' },
  { value: 'yoda', label: 'Yoda' },
  { value: 'han_solo', label: 'Han Solo' },
  { value: 'boba_fett', label: 'Boba Fett' },
  { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
]

type Args = SelectFieldProps<string>

export default {
  title: 'Components/SelectField',
  component: SelectField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=510%3A1',
    },
  },
  args: {
    name: 'character',
    label: 'Pick Character',
    placeholder: 'One character...',
    noOptionsMessage: () => 'No characters :-(',
    options,
    value: options[1].value,
    menuPlacement: 'bottom',
    // menuPortalTarget: 'self',
    onBlur: () => logger.log('blur'),
  },
} as Meta<Args>

const Template: StoryFn<Args> = ({ value: initialValue, ...args }) => {
  const [value, setValue] = useState<string | null>(initialValue)

  return (
    <div style={{ height: 350 }}>
      <SelectField {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Default = Template.bind({})

export const Empty = Template.bind({})
Empty.args = {
  value: null,
}

export const WithError = Template.bind({})
WithError.args = {
  error: 'Dark side',
}

export const Hovered = Template.bind({})
Hovered.args = {
  className: styles.hover,
}

export const Focused = Template.bind({})
Focused.args = {
  className: styles.focus,
}

export const FocusedWithError = Template.bind({})
FocusedWithError.args = {
  ...Focused.args,
  ...WithError.args,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  helperText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

export const WithTrailingNote = Template.bind({})
WithTrailingNote.args = {
  options: [
    { value: 'luke_skywalker', label: 'Luke Skywalker', trailingNote: 'Note' },
    { value: 'custom', label: 'Customized Side Note', trailingNote: <span style={{ color: 'red', fontWeight: '600' }}>Custom Note</span> },
    { value: 'one_word', label: LONG_ONE_WORD_TEXT, trailingNote: 'Note' },
    { value: 'multiple_word', label: LONG_MULTIPLE_WORD_TEXT, trailingNote: 'Note' },
  ],
}

export const Clearable = Template.bind({})
Clearable.args = {
  isClearable: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  iconLeft: Aperture,
  iconLeftAriaLabel: 'Aperture',
}

export const Open = Template.bind({})
Open.args = {
  menuIsOpen: true,
}

export const OpenWithInputValue = Template.bind({})
OpenWithInputValue.args = {
  ...Empty.args,
  ...Open.args,
  inputValue: 'obi',
}

export const OpenWithInputValueAndNoResults = Template.bind({})
OpenWithInputValueAndNoResults.args = {
  ...Empty.args,
  ...Open.args,
  inputValue: 'Not a Star Wars character',
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  showAriaLabel: true,
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

export const WithCreatableOptions = Template.bind({})
WithCreatableOptions.args = {
  isCreatable: true,
}

export const WithLongTextOptions = Template.bind({})
WithLongTextOptions.args = {
  options: [
    {
      value: '10000',
      label: LONG_MULTIPLE_WORD_TEXT,
    },
    {
      value: '10001',
      label: LONG_ONE_WORD_TEXT,
    },
    ...options,
  ],
}

export const WithTooltipHidden = Template.bind({})
WithTooltipHidden.args = {
  options: [
    {
      value: '10000',
      label: LONG_MULTIPLE_WORD_TEXT,
    },
    {
      value: '10001',
      label: LONG_ONE_WORD_TEXT,
    },
    ...options,
  ],
  singleValueTooltipVisible: false,
}

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
export const WithGroupedOptions = Template.bind({})
WithGroupedOptions.args = {
  options: groupedOptions,
  value: groupedOptions[0].options[1].value,

  formatGroupLabel: ({ label }) => (
    <p
      style={{
        textAlign: 'center',
        padding: 0,
        margin: 0,
      }}
    >
      {label}
    </p>
  ),

  formatOptionLabel: ({ label }) => {
    const names: Array<string | ReactNode> = label.split(' ')
    names[names.length - 1] = (
      <b key={label} style={{ color: 'black' }}>
        {' '}
        {names[names.length - 1]}
      </b>
    )
    return (
      <p
        style={{
          textAlign: 'center',
          padding: 0,
          margin: 0,
          color: '#707482',
        }}
      >
        {names}
      </p>
    )
  },
  styles: {
    option: (base) => {
      return {
        ...base,
        padding: 0,
        border: '1px solid #DBDBDB',
      }
    },
  },
}

export const WithCustomMenuFooter = Template.bind({})
WithCustomMenuFooter.args = {
  renderMenuFooter: () => (
    <div
      style={{
        lineHeight: '2rem',
        textAlign: 'center',
        backgroundColor: '#2160c0',
        color: 'white',
      }}
    >
      All Star Wars characters are entirely fictional
    </div>
  ),
}

export const SelectFieldWrappedInFormik = () => {
  type Values = {
    character: string
  }

  const validateCharacter = (value: string | null) => {
    if (value === null) {
      return undefined
    }
    return value !== 'yoda' ? 'Please, pick Yoda' : undefined
  }

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        character: options[1].value,
      }}
      initialErrors={{
        // Bug in Formik types. TODO: Raise a PR

        character: 'Server Error: Invalid character' as any,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SelectFieldFormik<Values> name="character" label="Character" options={options} validate={validateCharacter} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
