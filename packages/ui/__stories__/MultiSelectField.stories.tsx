import React, { ReactNode, useState } from 'react'
import { logger } from '@hazelcast/services'
import { Meta, Story } from '@storybook/react'
import { GroupedOptionsType } from 'react-select'
import { Form, Formik } from 'formik'

import { MultiSelectField, MultiSelectProps } from '../src/Select/MultiSelectField'
import { SelectFieldOption } from '../src/Select/helpers'
import { MultiSelectFieldFormik } from '../src/Select/MultiSelectFieldFormik'
import { LONG_MULTIPLE_WORD_TEXT, LONG_ONE_WORD_TEXT } from './constants'

import styles from '../src/Select/SelectField.module.scss'

const options: SelectFieldOption<string>[] = [
  { value: 'darth_vader', label: 'Darth Vader' },
  { value: 'luke_skywalker', label: 'Luke Skywalker' },
  { value: 'obi', label: 'Obi-Wan Kenobi' },
  { value: 'yoda', label: 'Yoda' },
  { value: 'han_solo', label: 'Han Solo' },
  { value: 'boba_fett', label: 'Boba Fett' },
  { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
]

export default {
  title: 'Components/MultiSelectField',
  component: MultiSelectField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=23167%3A4292',
    },
  },
  args: {
    name: 'characters',
    label: 'Pick Characters',
    placeholder: 'One or more characters...',
    noOptionsMessage: () => 'No characters :-(',
    options,
    value: [options[1].value],
    menuPlacement: 'bottom',
    onBlur: () => logger.log('blur'),
  },
} as Meta<MultiSelectProps<string>>

const Template: Story<MultiSelectProps<string>> = ({ value: initialValue, ...args }) => {
  const [value, setValue] = useState<string[]>(initialValue)

  return (
    <div style={{ height: 350 }}>
      <div style={{ marginBottom: 16 }}>
        <MultiSelectField<string> {...args} value={value} onChange={setValue} />
      </div>
      <MultiSelectField<string> size="small" {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Default = Template.bind({})

export const Empty = Template.bind({})
Empty.args = {
  value: [],
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

const groupedOptions: GroupedOptionsType<SelectFieldOption<string>> = [
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
  value: [groupedOptions[0].options[1].value],
  // eslint-disable-next-line react/display-name
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
  // eslint-disable-next-line react/display-name
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
  // eslint-disable-next-line react/display-name
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

export const WrappedInFormik = () => {
  type Values = {
    characters: string[]
  }

  const validateCharacter = (values: string[]) => (values.length >= 3 ? undefined : 'Pick at least three (3) characters')

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        characters: [options[1].value],
      }}
      initialErrors={{
        // Bug in Formik types. TODO: Raise a PR
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        characters: 'Server Error: Invalid character' as any,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <MultiSelectFieldFormik<Values> name="characters" label="Character" options={options} validate={validateCharacter} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
