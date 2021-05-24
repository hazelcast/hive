import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'

import { NumberField, NumberFieldProps } from '../src/NumberField'
import { NumberFieldFormik } from '../src/NumberFieldFormik'

import styles from '../src/TextField.module.scss'

const eventHandlers = {
  onBlur: () => logger.log('blur'),
  onChange: (newValue?: number) => logger.log('change', newValue),
}

export default {
  title: 'Components/NumberField',
  component: NumberField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
    },
  },
  args: {
    name: 'number',
    placeholder: 'Enter the number',
    label: 'Favorite number',
    value: 42,
    onBlur: eventHandlers.onBlur,
  },
} as Meta<NumberFieldProps>

const Template: Story<NumberFieldProps> = ({ value: initValue, ...args }) => {
  const [value, setValue] = useState<number | undefined>(initValue)
  return <NumberField {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {
  value: undefined,
}

export const Hovered = Template.bind({})
Hovered.args = {
  inputClassName: styles.hover,
}

export const Focused = Template.bind({})
Focused.args = {
  inputClassName: styles.focus,
}

export const WithError = Template.bind({})
WithError.args = {
  error: 'Dark side',
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

export const WithMinAndMax = Template.bind({})
WithMinAndMax.args = {
  value: 42,
  min: 42,
  max: 44,
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  helperText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

export const WithoutIncAndDecButtons = Template.bind({})
WithoutIncAndDecButtons.args = {
  showIconButtons: false,
}

export const WrappedInFormik = () => {
  type Values = {
    ram: number
  }

  const validateRAM = (value: number | undefined) => (value == undefined || value < 4 ? 'RAM is too low' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        ram: 0,
      }}
      initialErrors={{
        ram: 'Server Error: Invalid RAM amount',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <NumberFieldFormik<Values> name="ram" label="Name" validate={validateRAM} min={0} max={64} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
