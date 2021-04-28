import React, { useState } from 'react'
import { logger } from '@hazelcast/services'
import { Check } from 'react-feather'

import { AutocompleteField, AutocompleteFieldOption } from '../src/AutocompleteField'

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

export const CustomOptions = () => {
  const [value, setValue] = useState<string | null>(null)
  const renderOption = (option: AutocompleteFieldOption, isSelected: boolean) => {
    console.log(option, isSelected)
    return (
      <div>
        {isSelected && <Check color={'green'} />}
        {option.label}
      </div>
    )
  }
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
        renderOption={renderOption}
      />
    </div>
  )
}

// export const Error = () => (
//   <AutocompleteField
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//     error="Dark side"
//   />
// )
// Error.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
//   },
// }
//
// export const Hovered = () => (
//   <AutocompleteField
//     className={styles.hover}
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//   />
// )
// Hovered.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
//   },
// }
//
// export const Focused = () => (
//   <AutocompleteField
//     className={styles.focus}
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//   />
// )
// Focused.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
//   },
// }
//
// export const FocusedWithError = () => (
//   <AutocompleteField
//     className={styles.focus}
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//     error="Dark side"
//   />
// )
//
// export const Disabled = () => (
//   <AutocompleteField
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//     disabled
//   />
// )
//
// export const WithHelperText = () => (
//   <AutocompleteField
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//     helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
//   />
// )
//
// export const WithIconLeft = () => (
//   <AutocompleteField
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//     iconLeft={Aperture}
//     iconLeftAriaLabel="Aperture"
//   />
// )
//
// export const Clearable = () => {
//   const [currentValue, setValue] = useState<string | null>(value)
//   return (
//     <AutocompleteField<string>
//       name="name"
//       value={currentValue}
//       isClearable
//       label="Character"
//       options={options}
//       onBlur={() => logger.log('blur')}
//       onChange={setValue}
//     />
//   )
// }
//
// export const ClearableDisabled = () => (
//   <AutocompleteField
//     name="name"
//     value={value}
//     isClearable
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//     disabled
//   />
// )
//
// export const Open = () => {
//   const [currentValue, setValue] = useState<string>(value)
//   const ref = useRef<HTMLDivElement>(null)
//   return (
//     <div ref={ref} style={{ height: 350 }}>
//       <AutocompleteField<string>
//         name="name"
//         value={currentValue}
//         label="Character"
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValue}
//         menuIsOpen
//         menuPortalTarget={ref.current}
//       />
//     </div>
//   )
// }
//
// export const OpenWithFocusedOption = () => {
//   const ref = useRef<HTMLDivElement>(null)
//
//   useLayoutEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     ref.current!.querySelector<HTMLDivElement>('.hz-select-field__option')!.className += ' hz-select-field__option--is-focused'
//   }, [])
//
//   return (
//     <div ref={ref} style={{ height: 350 }}>
//       <AutocompleteField
//         name="name"
//         value={value}
//         label="Character"
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={(val: unknown) => logger.log('change', val)}
//         menuIsOpen
//         menuPortalTarget={ref.current}
//       />
//     </div>
//   )
// }
//
// export const OpenWithSearchValue = () => {
//   const ref = useRef<HTMLDivElement>(null)
//   return (
//     <div ref={ref} style={{ height: 350 }}>
//       <AutocompleteField
//         name="name"
//         value={value}
//         label="Character"
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={(val: unknown) => logger.log('change', val)}
//         menuIsOpen
//         menuPortalTarget={ref.current}
//         inputValue="obi"
//       />
//     </div>
//   )
// }
//
// export const OpenWithInvalidSearchValue = () => {
//   const ref = useRef<HTMLDivElement>(null)
//   return (
//     <div ref={ref} style={{ height: 350 }}>
//       <AutocompleteField
//         name="name"
//         value={value}
//         label="Character"
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={(val: unknown) => logger.log('change', val)}
//         menuIsOpen
//         menuPortalTarget={ref.current}
//         inputValue="invalid"
//       />
//     </div>
//   )
// }
//
// export const OpenWithCustomNoOptionsMessage = () => {
//   const ref = useRef<HTMLDivElement>(null)
//   return (
//     <div ref={ref} style={{ height: 350 }}>
//       <AutocompleteField
//         name="name"
//         value={value}
//         label="Character"
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={(val: unknown) => logger.log('change', val)}
//         menuIsOpen
//         menuPortalTarget={ref.current}
//         inputValue="invalid"
//         noOptionsMessage={() => 'Death star'}
//       />
//     </div>
//   )
// }
//
// export const NonSearchableClosed = () => (
//   <AutocompleteField
//     name="name"
//     value={value}
//     label="Character"
//     options={options}
//     onBlur={() => logger.log('blur')}
//     onChange={(val: unknown) => logger.log('change', val)}
//     isSearchable={false}
//   />
// )
//
// export const NonSearchableOpen = () => {
//   const ref = useRef<HTMLDivElement>(null)
//   return (
//     <div ref={ref} style={{ height: 350 }}>
//       <AutocompleteField
//         name="name"
//         value={value}
//         label="Character"
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={(val: unknown) => logger.log('change', val)}
//         isSearchable={false}
//         menuIsOpen
//         menuPortalTarget={ref.current}
//       />
//     </div>
//   )
// }
//
// export const MultipleSelections = () => {
//   const [currentValue, setValue] = useState<string[]>([])
//   return (
//     <div>
//       Values: {JSON.stringify(currentValue)}
//       <AutocompleteField<string>
//         name={nameMulti}
//         value={currentValue}
//         isMulti={true}
//         label={labelMulti}
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValue}
//       />
//     </div>
//   )
// }
//
// MultipleSelections.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=510%3A101',
//   },
// }
//
// export const MultipleSelectionsMultipleRows = () => {
//   const [currentValue, setValue] = useState<string[]>([...values])
//   return (
//     <div style={{ maxWidth: '400px' }}>
//       <AutocompleteField<string>
//         name={nameMulti}
//         value={currentValue}
//         isMulti={true}
//         label={labelMulti}
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValue}
//       />
//     </div>
//   )
// }
//
// export const MultipleSelectionsClearable = () => {
//   const [currentValue, setValue] = useState<string[]>([...values])
//   return (
//     <div style={{ maxWidth: '400px' }}>
//       <AutocompleteField<string>
//         name={nameMulti}
//         value={currentValue}
//         isMulti={true}
//         isClearable={true}
//         label={labelMulti}
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValue}
//       />
//     </div>
//   )
// }
//
// export const MultipleSelectionsAndOpen = () => {
//   const [currentValue, setValue] = useState<string[]>([values[1], values[2]])
//   const ref = useRef<HTMLDivElement>(null)
//   return (
//     <div ref={ref} style={{ height: 350 }}>
//       <AutocompleteField<string>
//         name="nameMulti"
//         value={currentValue}
//         isMulti={true}
//         label={labelMulti}
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValue}
//         menuIsOpen
//         menuPortalTarget={null}
//       />
//     </div>
//   )
// }
//
// export const MultipleSelectionsDisabled = () => {
//   const [currentValue, setValue] = useState<string[]>([...values])
//   return (
//     <div style={{ maxWidth: '400px' }}>
//       <AutocompleteField<string>
//         disabled={true}
//         name={nameMulti}
//         value={currentValue}
//         isMulti={true}
//         label={labelMulti}
//         options={options}
//         onBlur={() => logger.log('blur')}
//         onChange={setValue}
//       />
//     </div>
//   )
// }
//
// export const EmptyAutocompleteFields = () => {
//   const [currentValue, setValue] = useState<string | null>(null)
//   const [currentValues, setValues] = useState<string[]>([])
//   return (
//     <>
//       <AutocompleteField<string>
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
//
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
