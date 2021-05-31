import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { logger } from '@hazelcast/services'
import { Calendar, Mail } from 'react-feather'
import { Form, Formik } from 'formik'

import { TextField, TextFieldProps, TextFieldTypes } from '../src/TextField'
import { TextFieldFormik } from '../src/TextFieldFormik'

import styles from '../src/TextField.module.scss'
import storyStyles from './TextField.stories.module.scss'

export default {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=33458%3A0',
    },
  },
  args: {
    type: 'text',
    name: 'name',
    value: 'Yoda',
    placeholder: 'Enter the name',
    label: 'Wises jedi',
    onBlur: () => logger.log('blur'),
    className: storyStyles.textfield,
  },
} as Meta<TextFieldProps<TextFieldTypes>>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: Story<TextFieldProps<TextFieldTypes>> = ({ value: initialValue, ...args }) => {
  const [value, setValue] = useState<string | number | undefined>(initialValue)
  return (
    <>
      <TextField value={value} {...args} onChange={(e) => setValue(e.target.value)} />
      <TextField value={value} {...args} onChange={(e) => setValue(e.target.value)} size="small" />
    </>
  )
}

export const Default = Template.bind({})

export const Empty = Template.bind({})
Empty.args = {
  value: undefined,
}

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

export const DisabledAndHovered = Template.bind({})
DisabledAndHovered.args = {
  ...Disabled.args,
  ...Hovered.args,
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  helperText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  inputIcon: Mail,
}

export const WithIconAndError = Template.bind({})
WithIconAndError.args = {
  ...WithIcon.args,
  ...WithError.args,
}

export const HoveredWithIcon = Template.bind({})
HoveredWithIcon.args = {
  ...Hovered.args,
  ...WithIcon.args,
}

export const FocusedWithIcon = Template.bind({})
FocusedWithIcon.args = {
  ...Focused.args,
  ...WithIcon.args,
}

export const FocusedWithIconAndError = Template.bind({})
FocusedWithIconAndError.args = {
  ...Focused.args,
  ...WithIcon.args,
  ...WithError.args,
}

export const DisabledWithIcon = Template.bind({})
DisabledWithIcon.args = {
  ...Disabled.args,
  ...WithIcon.args,
}

export const WithIconAndAutoFill = Template.bind({})
WithIconAndAutoFill.args = {
  ...WithIcon.args,
  className: styles.mockAutofill,
}

export const WithIconAndHelperText = Template.bind({})
WithIconAndHelperText.args = {
  ...WithIcon.args,
  ...WithHelperText.args,
}

export const WithTrailingIcon = Template.bind({})
WithTrailingIcon.args = {
  inputTrailingIcon: Calendar,
  inputTrailingIconLabel: 'Calendar icon',
}

export const WithTrailingIconDisabled = Template.bind({})
WithTrailingIconDisabled.args = {
  ...WithTrailingIcon.args,
  ...Disabled.args,
}

export const TypeEmail = Template.bind({})
TypeEmail.args = {
  type: 'email',
  name: 'email',
  value: 'yoda@hazelcast.com',
  label: 'Email',
  placeholder: 'Enter an email',
}

export const TypeNumber = Template.bind({})
TypeNumber.args = {
  type: 'number',
  name: 'number',
  value: 42,
  label: 'Number',
  placeholder: 'Enter a number',
}

export const TypePassword = Template.bind({})
TypePassword.args = {
  type: 'password',
  name: 'password',
  value: 'superStrongPassword123',
  label: 'Password',
  placeholder: 'Enter a password',
}

export const TypeSearch = Template.bind({})
TypeSearch.args = {
  type: 'search',
  name: 'search',
  value: 'Yoda Rides a Unicorn',
  label: 'Search',
  placeholder: 'What are you looking for?',
}

export const TypeTel = Template.bind({})
TypeTel.args = {
  type: 'tel',
  name: 'phone',
  value: '+420 111 222 333',
  label: 'Phone Number',
  placeholder: 'Enter a phone number',
}

export const TypeURL = Template.bind({})
TypeURL.args = {
  type: 'url',
  name: 'url',
  value: 'https://hazelcast.com/',
  label: 'Homepage',
  placeholder: 'Add your homepage',
}

export const WrappedInFormik = () => {
  type Values = {
    name: string
  }

  const validateName = (value?: string) => (value === 'invalid_name' ? 'Name is invalid' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        name: 'Valid name',
      }}
      initialErrors={{
        name: 'Server Error: Invalid name',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <TextFieldFormik<Values> name="name" label="Name" placeholder="Type 'invalid_name' to see an error" validate={validateName} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
