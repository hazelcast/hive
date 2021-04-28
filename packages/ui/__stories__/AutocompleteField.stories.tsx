import React, { ReactNode, useState } from 'react'
import { logger } from '@hazelcast/services'
import { Check } from 'react-feather'

import { AutocompleteField, AutocompleteFieldOption } from '../src/AutocompleteField'
import styles from '../src/AutocompleteField.module.scss'

export default {
  title: 'Components/AutocompleteField',
  component: AutocompleteField,
}

const name = 'Character'
const label = 'Character'
const options: AutocompleteFieldOption[] = [
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
// const badGuyValues = [
//   values[0], // darthie boy
//   values[5], // boba fett
//   values[6], // jj binks - he sucks so much he counts as evil.
// ]

export const Default = () => {
  const [currentValue, setValue] = useState<string>(value)
  return (
    <AutocompleteField
      name={name}
      value={currentValue}
      label={label}
      options={options}
      onBlur={() => logger.log('blur')}
      onChange={setValue}
    />
  )
}

export const NotSelected = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div>
      Value: {value}
      <AutocompleteField
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
  <AutocompleteField
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
    error="Dark side"
  />
)

export const Hovered = () => (
  <AutocompleteField
    className={styles.hover}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
  />
)

export const Focused = () => (
  <AutocompleteField
    className={styles.focus}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val: unknown) => logger.log('change', val)}
  />
)

export const FocusedWithError = () => (
  <AutocompleteField
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
  <AutocompleteField
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
  <AutocompleteField
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
  const [currentValue, setValue] = useState<string | null>(value)
  return (
    <AutocompleteField
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
  <AutocompleteField
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

export const CustomOptions = () => {
  const [value, setValue] = useState<string | null>(null)
  const renderOption = (highlightedLabelText: ReactNode, option: AutocompleteFieldOption, isSelected: boolean) => {
    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '24px',
        }}
      >
        {isSelected && (
          <Check
            size={16}
            color="green"
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
        {highlightedLabelText}
      </div>
    )
  }
  return (
    <div>
      Value: {value}
      <AutocompleteField
        name="name"
        value={value}
        label="Character"
        options={options}
        onBlur={() => logger.log('blur')}
        onChange={(val: string | null) => {
          setValue(val)
          logger.log('change', val)
        }}
        renderOption={renderOption}
      />
    </div>
  )
}

// export const AutocompleteFieldWrappedInFormik = () => {
//   type Values = {
//     character: string
//   }
//
//   const validateCharacter = (value: string) => (value == 'yoda' ? 'No one can be Yoda' : undefined)
//
//   const TestForm = () => (
//     <Formik<Values>
//       initialValues={{
//         character: value,
//       }}
//       initialErrors={{
//         // Bug in Formik types. TODO: Raise a PR
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
//         character: 'Server Error: Invalid character' as any,
//       }}
//       onSubmit={(values) => logger.log('submit', values)}
//     >
//       {({ values }) => (
//         <Form>
//           Values: {JSON.stringify(values)}
//           <AutocompleteFieldFormik<Values> name="character" label="Character" options={options} validate={validateCharacter} />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   )
//
//   return <TestForm />
// }
//
// export const AutocompleteFieldClearableWrappedInFormik = () => {
//   type Values = {
//     character: string | null
//   }
//
//   const validateCharacter = (option: string | null) => (option == null ? 'Pick an option' : undefined)
//
//   const TestForm = () => (
//     <Formik<Values>
//       initialValues={{
//         character: null,
//       }}
//       initialErrors={{
//         // Bug in Formik types. TODO: Raise a PR
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
//         character: 'Server Error: Invalid character' as any,
//       }}
//       onSubmit={(values) => logger.log('submit', values)}
//     >
//       {({ values }) => (
//         <Form>
//           Values: {JSON.stringify(values)}
//           <AutocompleteFieldFormik<Values> name="character" label="Character" options={options} validate={validateCharacter} isClearable />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   )
//
//   return <TestForm />
// }
//
// export const AutocompleteFieldMultiSelectionWrappedInFormik = () => {
//   type Values = {
//     badCharacters: string[]
//   }
//
//   const TestForm = () => (
//     <Formik<Values>
//       initialValues={{
//         badCharacters: badGuyValues,
//       }}
//       onSubmit={(values) => logger.log('submit', values)}
//     >
//       {({ values }) => (
//         <Form>
//           Values: {JSON.stringify(values)}
//           <AutocompleteFieldFormik<Values> name="badCharacters" label="Bad Characters" isMulti={true} isClearable={true} options={options} />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   )
//
//   return <TestForm />
// }
//
// export const Creatable = () => {
//   const [currentValue, setValue] = useState<string | null>(null)
//   const [currentValues, setValues] = useState<string[]>([])
//   return (
//     <>
//       {JSON.stringify({
//         currentValue,
//         currentValues,
//       })}
//       <AutocompleteField<string>
//         isCreatable
//         name={name}
//         value={currentValue}
//         isMulti={false}
//         isClearable
//         label={label}
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValue}
//       />
//
//       <br />
//
//       <AutocompleteField<string>
//         isCreatable
//         name={nameMulti}
//         value={currentValues}
//         isMulti={true}
//         isClearable
//         label={labelMulti}
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValues}
//       />
//     </>
//   )
// }
