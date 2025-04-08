import React from 'react'
import { logger } from '../src'

import { TextArea } from '../src/components/TextArea'

import styles from '../src/components/TextArea.module.scss'
import { Form, Formik } from 'formik'
import { TextAreaFormik } from '../src/components/TextAreaFormik'

const text =
  'Yoda, a Force-sensitive male being belonging to a mysterious species, was a legendary Jedi Master who witnessed the rise and fall of the Galactic Republic, followed by the rise of the Galactic Empire. Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi, ultimately serving as the Grand Master of the Jedi Order. Having lived through nine centuries of galactic history, he played integral roles in the Clone Wars, the rebirth of the Jedi through Luke Skywalker, and unlocking the path to immortality.'

export default {
  title: 'Components/TextArea',
  component: TextArea,
}

export const Default = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const Empty = () => (
  <TextArea
    name="name"
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const WithoutLabel = () => (
  <TextArea
    name="name"
    placeholder="Describe character"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const Error = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    error="Dark side"
  />
)

export const Hovered = () => (
  <TextArea
    className={styles.hover}
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const Focused = () => (
  <TextArea
    className={styles.focus}
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const FocusedWithError = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    className={styles.focus}
    error="Dark side"
  />
)

export const Disabled = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    disabled
  />
)

export const NotResizable = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    resizable={false}
  />
)

export const WithHelperText = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    helperText="Describe the character."
  />
)

export const FocusedWithHelperText = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    helperText="Describe the character."
    className={styles.focus}
  />
)

export const CustomRows = () => (
  <TextArea
    name="name"
    value={text}
    placeholder="Describe character"
    label="Character description"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    rows={10}
  />
)

export const TextAreaWrappedInFormik = () => {
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
          <TextAreaFormik<Values> name="name" label="Name" placeholder="Type 'invalid_name' to see an error" validate={validateName} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
