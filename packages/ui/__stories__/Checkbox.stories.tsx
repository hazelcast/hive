import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'

import { Checkbox, CheckboxFormik, Link } from '../src'
import { formDecorator } from './decorators'

import styles from '../src/Checkbox.module.scss'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [formDecorator],
}

export const Default = () => {
  const [checked, setChecked] = useState<boolean>(true)
  const [indeterminate, setIndeterminate] = useState<boolean>(false)
  return (
    <>
      <Checkbox
        name="default"
        checked={checked}
        indeterminate={indeterminate}
        label="Label"
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
      />
      <hr />
      <button onClick={() => setIndeterminate(!indeterminate)}>Toggle Indeterminate</button>
      <ul>
        <li>Checked: {checked ? 'True' : 'False'}</li>
        <li>Indeterminate: {indeterminate ? 'True' : 'False'}</li>
      </ul>
    </>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Unchecked = () => (
  <Checkbox checked={false} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const FocusedUnchecked = () => (
  <Checkbox
    checked={false}
    classNameLabel={styles.focus}
    label="Label"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const HoverUnchecked = () => (
  <Checkbox
    checked={false}
    classNameLabel={styles.hover}
    label="Label"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const HoverDisabledUnchecked = () => (
  <Checkbox
    checked={false}
    classNameLabel={styles.hover}
    disabled
    label="Label"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const HoverDisabledChecked = () => (
  <Checkbox
    checked
    classNameLabel={styles.hover}
    disabled
    label="Label"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const FocusedChecked = () => (
  <Checkbox checked classNameLabel={styles.focus} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const WithDescription = () => (
  <Checkbox
    checked={false}
    label="Label"
    helperText="Very long description"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const LabelWithLink = () => (
  <Checkbox
    checked={false}
    label={
      <>
        Label{' '}
        <Link href="#" size="small">
          Link
        </Link>
      </>
    }
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const WithError = () => (
  <Checkbox
    checked={false}
    label="Label"
    helperText="Very long description"
    error="Something went wrong"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const Indeterminate = () => (
  <Checkbox checked label="Indeterminate" indeterminate name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const IndeterminateWithError = () => (
  <Checkbox
    checked
    label="Indeterminate"
    error="Error message"
    indeterminate
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const IndeterminateDisabled = () => (
  <Checkbox checked disabled label="Disabled" indeterminate name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const CheckedDisabled = () => (
  <Checkbox checked disabled label="Checked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const UncheckedDisabled = () => (
  <Checkbox checked={false} disabled label="Unchecked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const TwoCheckboxes = () => (
  <div>
    <Checkbox
      checked
      label="Checked"
      name="default2"
      error="This is an error message"
      onChange={(e) => logger.log('change2', e.target.checked)}
    />
    <Checkbox checked={false} disabled label="Unchecked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
  </div>
)

export const CheckboxWrappedInFormik = () => {
  type Values = {
    tos: boolean
  }

  const validateToS = (value: boolean) => (!value ? 'ToS is unchecked' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        tos: false,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <CheckboxFormik<Values> name="tos" validate={validateToS} label="Terms of Service" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
