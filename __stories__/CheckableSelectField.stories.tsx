import React, { useState } from 'react'
import { logger } from '../src'
import { Meta, StoryFn } from '@storybook/react'
import { Form, Formik } from 'formik'
import { AlertTriangle, Info } from 'react-feather'

import { CheckableSelectField, CheckableSelectProps } from '../src/components/Select/CheckableSelectField'
import { SelectFieldOption } from '../src/components/Select/helpers'
import { CheckableSelectFieldFormik } from '../src/components/Select/CheckableSelectFieldFormik'
import { LONG_ONE_WORD_TEXT, LONG_MULTIPLE_WORD_TEXT } from './constants'
import { Icon } from '../src/components/Icon'

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
  title: 'Components/CheckableSelectField',
  component: CheckableSelectField,
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
    noOptionsMessage: 'No options',
    options,
    value: [options[1].value],
    onBlur: () => logger.log('blur'),
    'data-test': 'test',
  },
} as Meta<CheckableSelectProps<string>>

const Template: StoryFn<CheckableSelectProps<string>> = ({ value: initialValue, ...args }) => {
  const [value, setValue] = useState<string[]>(initialValue)

  return (
    <div style={{ height: 350 }}>
      <CheckableSelectField<string> {...args} value={value} onChange={setValue} />
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

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  helperText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  showAriaLabel: true,
}

export const WithPermanentPlaceholder = Template.bind({})
WithPermanentPlaceholder.args = {
  placeholderMode: 'permanent',
  placeholder: 'Permanent placeholder',
}

export const WithLongTextOptions = Template.bind({})
WithLongTextOptions.args = {
  options: [
    {
      value: '10000',
      label: LONG_ONE_WORD_TEXT,
    },
    {
      value: '10001',
      label: LONG_MULTIPLE_WORD_TEXT,
    },
    ...options,
  ],
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

        characters: 'Server Error: Invalid character' as any,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <CheckableSelectFieldFormik<Values>
            name="characters"
            data-test="test"
            label="Character"
            options={options}
            validate={validateCharacter}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

export const WithoutOptions = Template.bind({})
WithoutOptions.args = {
  value: [],
  options: [],
  defaultOpen: true,
}

export const CustomSearch = Template.bind({})
CustomSearch.args = {
  value: [],
  options,
  defaultOpen: true,
  filterOptions: (candidate, input) => {
    if (!input) {
      return true
    }

    return !candidate.label.toLowerCase().includes(input)
  },
}

export const WithSearchInputAdornments = Template.bind({})
WithSearchInputAdornments.args = {
  value: [],
  options,
  defaultOpen: true,
  searchInputProps: {
    endAdornment: <Icon icon={AlertTriangle} />,
    startAdornment: <Icon icon={Info} />,
  },
}
