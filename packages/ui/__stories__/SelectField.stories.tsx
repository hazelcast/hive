import React, { useRef, useState } from 'react'
import { logger } from '@hazelcast/services'
import { Form, Formik } from 'formik'

import { SelectField, SelectFieldOption } from '../src/SelectField'
import { SelectFieldFormik } from '../src/SelectFieldFormik'

import styles from '../src/SelectField.module.scss'

export default {
  title: 'Components/SelectField',
  component: SelectField,
}

const name = 'Character'
const label = 'Character'
const options: SelectFieldOption<string>[] = [
  { value: 'Darth Vader', label: 'Darth Vader' },
  { value: 'Luke Skywalker', label: 'Luke Skywalker' },
  { value: 'Obi-Wan Kenobi', label: 'Obi-Wan Kenobi' },
  { value: 'Yoda', label: 'Yoda' },
  { value: 'Han Solo', label: 'Han Solo' },
  { value: 'Boba Fett', label: 'Boba Fett' },
  { value: 'Jar Jar Binks', label: 'Jar Jar Binks' },
]
const value = options[1]

export const Default = () => {
  const [currentValue, setValue] = useState(value)
  return (
    <SelectField name={name} value={currentValue} label={label} options={options} onBlur={() => logger.log('blur')} onChange={setValue} />
  )
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const NotSelected = () => (
  <SelectField
    name="name"
    value={null}
    isClearable
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
  />
)

export const Error = () => (
  <SelectField
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    error="Dark side"
  />
)
Error.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Hovered = () => (
  <SelectField
    className={styles.hover}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
  />
)
Hovered.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Focused = () => (
  <SelectField
    className={styles.focus}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
  />
)
Focused.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const FocusedWithError = () => (
  <SelectField
    className={styles.focus}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    error="Dark side"
  />
)

export const Disabled = () => (
  <SelectField
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    disabled
  />
)

export const WithHelperText = () => (
  <SelectField
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
)

export const Clearable = () => {
  const [currentValue, setValue] = useState<SelectFieldOption<string> | null>(value)
  return (
    <SelectField
      name="name"
      value={currentValue}
      isClearable
      label="Character"
      options={options}
      onBlur={() => logger.log('blur')}
      onChange={setValue}
    />
  )
}

export const ClearableDisabled = () => (
  <SelectField
    name="name"
    value={value}
    isClearable
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    disabled
  />
)

export const Open = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} style={{ height: 350 }}>
      <SelectField
        name="name"
        value={value}
        label="Character"
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={(val: unknown) => logger.log('change', val)}
        menuIsOpen
        menuPortalTarget={ref.current}
      />
    </div>
  )
}

export const SelectFieldWrappedInFormik = () => {
  type Values = {
    character: SelectFieldOption<string>
  }

  const validateCharacter = ({ value }: SelectFieldOption<string>) => (value == 'Yoda' ? 'No one can be Yoda' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        character: value,
      }}
      initialErrors={{
        // Bug in Formik types. TODO: Raise a PR
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        character: 'Server Error: Invalid character' as any,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SelectFieldFormik<Values> name="character" label="Character" options={options} validate={validateCharacter} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

export const SelectFieldClearableWrappedInFormik = () => {
  type Values = {
    character: SelectFieldOption<string> | null
  }

  const validateCharacter = (option: SelectFieldOption<string> | null) => (option == null ? 'Pick an option' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        character: null,
      }}
      initialErrors={{
        // Bug in Formik types. TODO: Raise a PR
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        character: 'Server Error: Invalid character' as any,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SelectFieldFormik<Values> name="character" label="Character" options={options} validate={validateCharacter} isClearable />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
