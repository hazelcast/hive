import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { logger } from '../src'
import { Form, Formik } from 'formik'

import { PasswordField, PasswordFieldProps } from '../src/components/PasswordField'
import { PasswordFieldFormik } from '../src/components/PasswordFieldFormik'

import styles from '../src/components/TextField.module.scss'
import storyStyles from './TextField.stories.module.scss'

export default {
  title: 'Components/PasswordField',
  component: PasswordField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=510%3A3',
    },
  },
  args: {
    name: 'password',
    placeholder: 'Enter the password',
    label: 'Password',
    value: 'password',
    onBlur: () => logger.log('blur'),
    className: storyStyles.field,
  },
} as Meta<PasswordFieldProps>

const Template: StoryFn<PasswordFieldProps> = ({ value: initValue, ...args }) => {
  const [value, setValue] = useState<string | undefined>(initValue)
  return (
    <>
      <PasswordField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
      <PasswordField {...args} value={value} onChange={(e) => setValue(e.target.value)} size="small" />
      <PasswordField {...args} value={value} onChange={(e) => setValue(e.target.value)} size="large" />
    </>
  )
}

export const Default = Template.bind({})

export const WithError = Template.bind({})
WithError.args = {
  error: 'Dark side',
}

export const Hovered = Template.bind({})
Hovered.args = {
  inputClassName: styles.hover,
}

export const Focused = Template.bind({})
Focused.args = {
  inputClassName: styles.focus,
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

export const WithAutofill = Template.bind({})
WithAutofill.args = {
  className: styles.mockAutofill,
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  helperText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

export const WithLockIcon = Template.bind({})
WithLockIcon.args = {
  withIcon: true,
}

export const InitiallyVisible = Template.bind({})
InitiallyVisible.args = {
  initiallyVisible: true,
}

export const WrappedInFormik = () => {
  const validatePasswordLength = (value: string | undefined) => (!value || value.length < 4 ? 'Password is too short' : undefined)

  type Values = {
    password: string
  }

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        password: '',
      }}
      initialErrors={{
        password: 'Server Error: Invalid password',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <PasswordFieldFormik<Values> name="password" label="Name" validate={validatePasswordLength} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

export const WithoutToggle = Template.bind({})
WithoutToggle.args = {
  hideToggle: true,
}
