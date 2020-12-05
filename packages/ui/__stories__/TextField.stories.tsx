import React from 'react'
import { logger } from '@hazelcast/services'
import { Mail } from 'react-feather'

import { TextField } from '../src'
import styles from '../src/TextField.module.scss'
import { Form, Formik } from 'formik'
import { TextFieldFormik } from '../src'

export default {
  title: 'Components/TextField',
  component: TextField,
}
export const Default = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=479%3A273',
  },
}

export const Empty = () => (
  <TextField
    name="name"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const Error = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    error="Dark side"
  />
)

export const Hovered = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    className={styles.hover}
  />
)

export const Focused = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    className={styles.focus}
  />
)

export const FocusedWithError = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    className={styles.focus}
    error="Dark side"
  />
)

export const Disabled = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    disabled
  />
)

export const WithHelperText = () => (
  <TextField
    name="name"
    value="Yoda"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
)

export const WithIconDefault = () => (
  <TextField
    name="name"
    value="Yoda"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
  />
)

export const WithIconEmpty = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
  />
)

export const WithIconError = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    error="Dark side"
  />
)

export const WithIconHovered = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    className={styles.hover}
  />
)

export const WithIconFocused = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    className={styles.focus}
  />
)

export const WithIconFocusedWithError = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    error="Dark side"
    className={styles.focus}
  />
)

export const WithIconDisabled = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    disabled
  />
)

export const WithIconWithHelperText = () => (
  <TextField
    name="name"
    value="Yoda"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    inputIcon={Mail}
  />
)

export const TextFieldWrappedInFormik = () => {
  type Values = {
    name: string
  }

  const validateName = (value: string) => (value === 'invalid_name' ? 'Name is invalid' : undefined)

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

export const TypeEmail = () => (
  <TextField
    name="email"
    type="email"
    value="info@hazelcast.com"
    placeholder="Enter an email"
    label="Email"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const TypeNumber = () => (
  <TextField
    name="number"
    type="number"
    value={42}
    placeholder="Enter a number"
    label="Number"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const TypePassword = () => (
  <TextField
    name="password"
    type="password"
    value="superStrongPassword123"
    placeholder="Enter a password"
    label="Password"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const TypeSearch = () => (
  <TextField
    name="search"
    type="search"
    value="Unicorn"
    placeholder="What are you looking for?"
    label="Search"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const TypeTel = () => (
  <TextField
    name="phone"
    type="tel"
    value="+421 111 222 333"
    placeholder="Enter a phone number"
    label="Phone"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const TypeText = () => (
  <TextField
    name="name"
    type="text"
    value="Yoda"
    placeholder="Enter a name"
    label="Text"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const TypeURL = () => (
  <TextField
    name="url"
    type="url"
    value="https://hazelcast.com/"
    placeholder="Enter a URL"
    label="URL"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
