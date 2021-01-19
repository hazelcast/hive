import React, { ChangeEvent, useLayoutEffect, useRef, useState } from 'react'
import { logger } from '@hazelcast/services'
import { Form, Formik } from 'formik'

import { PasswordField, VisibleRef } from '../src'
import { PasswordFieldFormik } from '../src'

import styles from '../src/TextField.module.scss'

const eventHandlers = {
  onBlur: () => logger.log('blur'),
  onChange: (e: ChangeEvent<HTMLInputElement>) => logger.log('change', e.target.value),
}

export default {
  title: 'Components/PasswordField',
  component: PasswordField,
}
export const Default = () => {
  const [value, setValue] = useState('password')
  return (
    <PasswordField
      name="name"
      value={value}
      placeholder="Enter the name"
      label="Wisest jedi"
      {...eventHandlers}
      onChange={({ target: { value } }) => setValue(value)}
    />
  )
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Error = () => (
  <PasswordField name="name" value="password" placeholder="Enter the name" label="Wisest jedi" error="Dark side" {...eventHandlers} />
)

export const Hovered = () => (
  <PasswordField
    name="name"
    value="password"
    placeholder="Enter the name"
    label="Wisest jedi"
    inputClassName={styles.hover}
    {...eventHandlers}
  />
)

export const Focused = () => (
  <PasswordField
    name="name"
    value="password"
    placeholder="Enter the name"
    label="Wisest jedi"
    inputClassName={styles.focus}
    {...eventHandlers}
  />
)

export const FocusedWithError = () => (
  <PasswordField
    name="name"
    value="password"
    placeholder="Enter the name"
    label="Wisest jedi"
    inputClassName={styles.focus}
    error="Dark side"
    {...eventHandlers}
  />
)

export const Disabled = () => (
  <PasswordField name="name" value="password" placeholder="Enter the name" label="Wisest jedi" disabled {...eventHandlers} />
)

export const Empty = () => <PasswordField name="name" placeholder="Enter the name" label="Wisest jedi" {...eventHandlers} />

export const Autofill = () => (
  <PasswordField
    name="name"
    value="password"
    placeholder="Enter the name"
    label="Wisest jedi"
    className={styles.mockAutofill}
    {...eventHandlers}
  />
)

export const Visible = () => {
  const visibleRef = useRef<VisibleRef>(null)

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    visibleRef.current!.setVisible(true)
  }, [])

  return (
    <PasswordField
      name="name"
      value="password"
      placeholder="Enter the name"
      label="Wisest jedi"
      visibleRef={visibleRef}
      {...eventHandlers}
    />
  )
}

export const WithHelperText = () => (
  <PasswordField
    name="name"
    value="password"
    label="Wisest jedi"
    placeholder="Enter the name"
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    {...eventHandlers}
  />
)

export const WithIcon = () => (
  <PasswordField name="name" value="password" label="Wisest jedi" placeholder="Enter the name" withIcon {...eventHandlers} />
)

export const PasswordWrappedInFormik = () => {
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
