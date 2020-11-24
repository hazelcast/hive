import React, { ChangeEvent, useLayoutEffect, useRef, useState } from 'react'
import { logger } from '@hazelcast/services'

import { PasswordField, VisibleRef } from '../src/PasswordField'
import styles from '../src/TextField.module.scss'
import { Form, Formik } from 'formik'
import { PasswordFieldFormik } from '../src/PasswordFieldFormik'

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

export const Error = () => (
  <PasswordField name="name" value="password" placeholder="Enter the name" label="Wisest jedi" error="Dark side" {...eventHandlers} />
)

export const Hovered = () => (
  <PasswordField
    name="name"
    value="password"
    placeholder="Enter the name"
    label="Wisest jedi"
    className={styles.hover}
    {...eventHandlers}
  />
)

export const Focused = () => (
  <PasswordField
    name="name"
    value="password"
    placeholder="Enter the name"
    label="Wisest jedi"
    className={styles.focus}
    {...eventHandlers}
  />
)

export const FocusedWithError = () => (
  <PasswordField
    name="name"
    value="password"
    placeholder="Enter the name"
    label="Wisest jedi"
    className={styles.focus}
    error="Dark side"
    {...eventHandlers}
  />
)

export const Disabled = () => (
  <PasswordField name="name" value="password" placeholder="Enter the name" label="Wisest jedi" disabled {...eventHandlers} />
)

export const Empty = () => <PasswordField name="name" placeholder="Enter the name" label="Wisest jedi" {...eventHandlers} />

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

export const PasswordWrappedInFormik = () => {
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
      validate={(values) => {
        const errors: Partial<{ [key in keyof Values]: string }> = {
          password: values.password.length < 4 ? 'Password is too short' : undefined,
        }

        return errors
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <PasswordFieldFormik<Values> name="password" label="Name" />
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
