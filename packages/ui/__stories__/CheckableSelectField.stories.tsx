import React, { useState } from 'react'
import { logger } from '@hazelcast/services'
import { Meta, Story } from '@storybook/react'
import { Form, Formik } from 'formik'

import { CheckableSelectField, CheckableSelectProps } from '../src/Select/CheckableSelectField'
import { SelectFieldOption } from '../src/Select/helpers'
import { CheckableSelectFieldFormik } from '../src/Select/CheckableSelectFieldFormik'
import { LONG_ONE_WORD_TEXT, LONG_MULTIPLE_WORD_TEXT } from './constants'

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

const Template: Story<CheckableSelectProps<string>> = ({ value: initialValue, ...args }) => {
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
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
