import React, { useLayoutEffect, useRef, useState } from 'react'
import { logger } from '@hazelcast/services'
import { Form, Formik } from 'formik'

import { SelectField, SelectFieldOption } from '../src/SelectField'
import { SelectFieldFormik } from '../src/SelectFieldFormik'

import styles from '../src/SelectField.module.scss'
import { Aperture } from 'react-feather'
import { GroupedOptionsType } from 'react-select'

export default {
  title: 'Components/SelectField',
  component: SelectField,
}

const name = 'Character'
const label = 'Character'
const nameMulti = 'Characters'
const labelMulti = 'Characters'
const options: SelectFieldOption<string>[] = [
  { value: 'darth_vader', label: 'Darth Vader' },
  { value: 'luke_skywalker', label: 'Luke Skywalker' },
  { value: 'obi', label: 'Obi-Wan Kenobi' },
  { value: 'yoda', label: 'Yoda' },
  { value: 'han_solo', label: 'Han Solo' },
  { value: 'boba_fett', label: 'Boba Fett' },
  { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
]
const values = options.map(({ value }) => value)

const value = values[1]
const badGuyValues = [
  values[0], // darthie boy
  values[5], // boba fett
  values[6], // jj binks - he sucks so much he counts as evil.
]

export const Default = () => {
  const [currentValue, setValue] = useState<string>(value)
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

export const NotSelected = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div>
      Value: {value}
      <SelectField
        name="name"
        value={value}
        isClearable
        label="Character"
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={(val: string | null) => {
          setValue(val)
          logger.log('change', val)
        }}
      />
    </div>
  )
}

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

export const WithIconLeft = () => (
  <SelectField
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    iconLeft={Aperture}
    iconLeftAriaLabel="Aperture"
  />
)

export const Clearable = () => {
  const [currentValue, setValue] = useState<string | null>(value)
  return (
    <SelectField<string>
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
  const [currentValue, setValue] = useState<string>(value)
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} style={{ height: 350 }}>
      <SelectField<string>
        name="name"
        value={currentValue}
        label="Character"
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
        menuIsOpen
        menuPortalTarget={ref.current}
      />
    </div>
  )
}

export const WithCustomPlaceholder = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div>
      <SelectField
        name="name"
        value={value}
        isClearable
        label="Character"
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={(val: string | null) => {
          setValue(val)
          logger.log('change', val)
        }}
        placeholder="Select the best character..."
      />
    </div>
  )
}

export const OpenWithFocusedOption = () => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref.current!.querySelector<HTMLDivElement>('.hz-select-field__option')!.className += ' hz-select-field__option--is-focused'
  }, [])

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

export const OpenWithSearchValue = () => {
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
        inputValue="obi"
      />
    </div>
  )
}

export const OpenWithInvalidSearchValue = () => {
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
        inputValue="invalid"
      />
    </div>
  )
}

export const OpenWithCustomNoOptionsMessage = () => {
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
        inputValue="invalid"
        noOptionsMessage={() => 'Death star'}
      />
    </div>
  )
}

export const NonSearchableClosed = () => (
  <SelectField
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    isSearchable={false}
  />
)

export const NonSearchableOpen = () => {
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
        isSearchable={false}
        menuIsOpen
        menuPortalTarget={ref.current}
      />
    </div>
  )
}

export const MultipleSelections = () => {
  const [currentValue, setValue] = useState<string[]>([])
  return (
    <div>
      Values: {JSON.stringify(currentValue)}
      <SelectField<string>
        name={nameMulti}
        value={currentValue}
        isMulti={true}
        label={labelMulti}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
      />
    </div>
  )
}

MultipleSelections.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=510%3A101',
  },
}

export const MultipleSelectionsMultipleRows = () => {
  const [currentValue, setValue] = useState<string[]>([...values])
  return (
    <div style={{ maxWidth: '400px' }}>
      <SelectField<string>
        name={nameMulti}
        value={currentValue}
        isMulti={true}
        label={labelMulti}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
      />
    </div>
  )
}

export const MultipleSelectionsClearable = () => {
  const [currentValue, setValue] = useState<string[]>([...values])
  return (
    <div style={{ maxWidth: '400px' }}>
      <SelectField<string>
        name={nameMulti}
        value={currentValue}
        isMulti={true}
        isClearable={true}
        label={labelMulti}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
      />
    </div>
  )
}

export const MultipleSelectionsAndOpen = () => {
  const [currentValue, setValue] = useState<string[]>([values[1], values[2]])
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} style={{ height: 350 }}>
      <SelectField<string>
        name="nameMulti"
        value={currentValue}
        isMulti={true}
        label={labelMulti}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
        menuIsOpen
        menuPortalTarget={null}
      />
    </div>
  )
}

export const MultipleSelectionsDisabled = () => {
  const [currentValue, setValue] = useState<string[]>([...values])
  return (
    <div style={{ maxWidth: '400px' }}>
      <SelectField<string>
        disabled={true}
        name={nameMulti}
        value={currentValue}
        isMulti={true}
        label={labelMulti}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
      />
    </div>
  )
}

export const EmptySelectFields = () => {
  const [currentValue, setValue] = useState<string | null>(null)
  const [currentValues, setValues] = useState<string[]>([])
  return (
    <>
      <SelectField<string>
        name={name}
        value={currentValue}
        isMulti={false}
        isClearable
        label={label}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
      />

      <br />

      <SelectField<string>
        name={nameMulti}
        value={currentValues}
        isMulti={true}
        isClearable
        label={labelMulti}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValues}
      />
    </>
  )
}

export const SelectFieldWrappedInFormik = () => {
  type Values = {
    character: string
  }

  const validateCharacter = (value: string) => (value == 'yoda' ? 'No one can be Yoda' : undefined)

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
    character: string | null
  }

  const validateCharacter = (option: string | null) => (option == null ? 'Pick an option' : undefined)

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

export const SelectFieldMultiSelectionWrappedInFormik = () => {
  type Values = {
    badCharacters: string[]
  }

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        badCharacters: badGuyValues,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SelectFieldFormik<Values> name="badCharacters" label="Bad Characters" isMulti={true} isClearable={true} options={options} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

export const Creatable = () => {
  const [currentValue, setValue] = useState<string | null>(null)
  const [currentValues, setValues] = useState<string[]>([])
  return (
    <>
      {JSON.stringify({
        currentValue,
        currentValues,
      })}
      <SelectField<string>
        isCreatable
        name={name}
        value={currentValue}
        isMulti={false}
        isClearable
        label={label}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValue}
      />

      <br />

      <SelectField<string>
        isCreatable
        name={nameMulti}
        value={currentValues}
        isMulti={true}
        isClearable
        label={labelMulti}
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={setValues}
      />
    </>
  )
}

export const GroupedOptions = () => {
  const [value, setValue] = useState<string | null>(null)
  const groupedOptions: GroupedOptionsType<SelectFieldOption<string>> = [
    {
      label: 'Dark Side',
      options: [
        { value: 'darth_vader', label: 'Darth Vader' },
        { value: 'boba_fett', label: 'Boba Fett' },
        { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
      ],
    },
    {
      label: 'Light Side',
      options: [
        { value: 'luke_skywalker', label: 'Luke Skywalker' },
        { value: 'obi', label: 'Obi-Wan Kenobi' },
        { value: 'yoda', label: 'Yoda' },
        { value: 'han_solo', label: 'Han Solo' },
      ],
    },
  ]
  return (
    <div>
      Value: {value}
      <SelectField
        name="name"
        value={value}
        isClearable
        label="Character"
        options={groupedOptions}
        onBlur={() => logger.log('blur')}
        onChange={(val: string | null) => {
          setValue(val)
          logger.log('change', val)
        }}
      />
    </div>
  )
}
