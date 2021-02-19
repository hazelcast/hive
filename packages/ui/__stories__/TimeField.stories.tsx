import React from 'react'
import cn from 'classnames'

import { logger } from '@hazelcast/services'
import { TimeField } from '../src/TimeField'

import { Form, Formik } from 'formik'
import { TimeFieldFormik } from '../src/TimeFieldFormik'

import styles from '../src/TimeField.module.scss'
import styleUtils from './utils.scss'

export default {
  title: 'Components/TimeField',
  component: TimeField,
}
export const Default = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=22242%3A147',
  },
}

export const Error = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    error="Dark side"
  />
)

export const Hovered = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputClassName={styles.hover}
  />
)

export const Focused = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputClassName={styles.focus}
  />
)

export const FocusedWithError = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    inputClassName={styles.focus}
    error="Dark side"
  />
)

export const FocusedWithHover = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputClassName={cn(styles.focus, styles.hover)}
  />
)

export const Disabled = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    disabled
  />
)

export const WithSeconds = () => (
  <TimeField
    name="time"
    label="Time"
    value="10:00:00"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    seconds
  />
)

export const TimeFieldWrappedInFormik = () => {
  type Values = {
    name: string
  }

  const validateName = (value?: string) => (value === 'invalid_time' ? 'Time is invalid' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        name: '10:00',
      }}
      initialErrors={{
        name: 'Server Error: Time is invalid',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {() => (
        <Form className={styleUtils.column}>
          <TimeFieldFormik<Values> name="name" label="Time" validate={validateName} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
