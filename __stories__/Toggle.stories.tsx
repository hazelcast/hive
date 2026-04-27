import React, { useState } from 'react'
import { Form, Formik } from 'formik'

import { logger, Toggle, ToggleFormik } from '../src'
import { Toggle as LegacyToggle } from '../src/old'
import { formDecorator } from './decorators'

import styles from '../src/components/Toggle.module.css'

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
      <button
        onClick={(e) => {
          setDisabled(!disabled)
          e.preventDefault()
        }}
      >
        {disabled ? `Enable` : `Disable`}
      </button>
    </>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/uGTDLFJEVy4dCNIhlmTPRw/%F0%9F%90%9D-HIVE-3.0?node-id=26-1326',
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

export const LegacyV3 = () => {
  const [checked, setChecked] = useState<boolean>(true)
  return (
    <LegacyToggle
      name="legacy"
      checked={checked}
      label="Legacy v3 Toggle (available via @hazelcast/ui/old)"
      onChange={(e) => setChecked(e.target.checked)}
    />
  )
}

LegacyV3.parameters = {
  docs: {
    description: {
      story: 'The v3 Toggle is preserved for gradual migration. Import from `@hazelcast/ui/old`.',
    },
  },
}
