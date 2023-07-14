import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'

import { Toggle, ToggleFormik } from '../src'
import { formDecorator } from './decorators'

import styles from '../src/Toggle.module.scss'

export default {
  title: 'Components/Toggle',
  component: Toggle,
  decorators: [formDecorator],
}

export const Default = () => {
  const [checked, setChecked] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)
  return (
    <>
      <Toggle
        name="default"
        checked={checked}
        disabled={disabled}
        label="Label"
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
      />
      <hr />
      <ul>
        <li>Checked: {checked ? 'True' : 'False'}</li>
        <li>Disabled: {disabled ? 'True' : 'False'}</li>
      </ul>
      <button onClick={() => setDisabled(!disabled)}>{disabled ? `Enable` : `Disable`}</button>
    </>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10187%3A30',
  },
}

export const CheckedWithoutLabel = () => <Toggle checked={true} name="default" onChange={(e) => logger.log('change', e.target.checked)} />

export const UncheckedWithoutLabel = () => (
  <Toggle checked={false} name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const Unchecked = () => (
  <Toggle checked={false} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const DisabledUnchecked = () => (
  <Toggle disabled checked={false} label="disabled one" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const DisabledChecked = () => (
  <Toggle disabled checked={true} label="disabled and checked" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const Hovered = () => (
  <Toggle
    classNameLabel={styles.hover}
    checked={true}
    label="hovered and checked"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const UncheckedHovered = () => (
  <Toggle
    classNameLabel={styles.hover}
    checked={false}
    label="hovered and unchecked"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const Focused = () => (
  <Toggle
    classNameLabel={styles.focus}
    checked={true}
    label="focused and checked"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const UncheckedFocused = () => (
  <Toggle
    classNameLabel={styles.focus}
    checked={false}
    label="focused and unchecked"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const WithHelperText = () => (
  <Toggle
    helperText="this is an helper text."
    checked
    label="Label"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const WithError = () => (
  <Toggle error="this is an error message!" checked label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const WithErrorFocused = () => (
  <Toggle
    classNameLabel={styles.focus}
    error="this is an error message!"
    checked
    label="Label"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const ToggleWrappedInFormik = () => {
  type Values = {
    turboMode: boolean
  }
  const validateTurbo = (value: boolean) => (!value ? 'turbo mode must be on!!!' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        turboMode: false,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <ToggleFormik<Values> name="turboMode" validate={validateTurbo} label="Turbo Mode" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
