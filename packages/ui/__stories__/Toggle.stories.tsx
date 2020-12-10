import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import styles from '../src/Toggle.module.scss'
import { Toggle, ToggleFormik, Link } from '../src'

export default {
  title: 'Components/Toggle',
  component: Toggle,
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
      <button onClick={() => setDisabled(!disabled)}>
        {disabled ? `Enable` : `Disable`}
      </button>
    </>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10187%3A30',
  },
}

export const Unchecked = () => (
  <Toggle checked={false} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const DisabledUnchecked = () => (
  <Toggle disabled checked={false} label="disabled one" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const DisabledChecked = () => (
  <Toggle disabled checked={true} label="disabled and checked" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const WithHelperText = () => (
  <Toggle helperText="this is an helper text." checked label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const WithError = () => (
  <Toggle error="this is an error message!" checked label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)


// export const FocusedUnchecked = () => (
//   <Checkbox
//     checked={false}
//     classNameLabel={styles.focus}
//     label="Label"
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const HoverUnchecked = () => (
//   <Checkbox
//     checked={false}
//     classNameLabel={styles.hover}
//     label="Label"
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const HoverDisabledUnchecked = () => (
//   <Checkbox
//     checked={false}
//     classNameLabel={styles.hover}
//     disabled
//     label="Label"
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const HoverDisabledChecked = () => (
//   <Checkbox
//     checked
//     classNameLabel={styles.hover}
//     disabled
//     label="Label"
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const FocusedChecked = () => (
//   <Checkbox checked classNameLabel={styles.focus} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
// )

// export const WithDescription = () => (
//   <Checkbox
//     checked={false}
//     label="Label"
//     helperText="Very long description"
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const LabelWithLink = () => (
//   <Checkbox
//     checked={false}
//     label={
//       <>
//         Label{' '}
//         <Link href="#" size="small">
//           Link
//         </Link>
//       </>
//     }
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const WithError = () => (
//   <Checkbox
//     checked={false}
//     label="Label"
//     helperText="Very long description"
//     error="Something went wrong"
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const Indeterminate = () => (
//   <Checkbox checked label="Indeterminate" indeterminate name="default" onChange={(e) => logger.log('change', e.target.checked)} />
// )

// export const IndeterminateWithError = () => (
//   <Checkbox
//     checked
//     label="Indeterminate"
//     error="Error message"
//     indeterminate
//     name="default"
//     onChange={(e) => logger.log('change', e.target.checked)}
//   />
// )

// export const IndeterminateDisabled = () => (
//   <Checkbox checked disabled label="Disabled" indeterminate name="default" onChange={(e) => logger.log('change', e.target.checked)} />
// )

// export const CheckedDisabled = () => (
//   <Checkbox checked disabled label="Checked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
// )

// export const UncheckedDisabled = () => (
//   <Checkbox checked={false} disabled label="Unchecked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
// )

// export const TwoCheckboxes = () => (
//   <div>
//     <Checkbox
//       checked
//       label="Checked"
//       name="default2"
//       error="This is an error message"
//       onChange={(e) => logger.log('change2', e.target.checked)}
//     />
//     <Checkbox checked={false} disabled label="Unchecked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
//   </div>
// )

// export const ToggleWrappedInFormik = () => {
//   type Values = {
//     turboMode: boolean
//   }

//   const validateTurbo = (value: boolean) => (!value ? 'turbo mode must be on!!!' : undefined)

//   const TestForm = () => (
//     <Formik<Values>
//       initialValues={{
//         turboMode: false,
//       }}
//       onSubmit={(values) => logger.log('submit', values)}
//     >
//       {({ values }) => (
//         <Form>
//           Values: {JSON.stringify(values)}
//           <ToggleFormik<Values> name="turbo" validate={validateTurbo} label="Turbo Mode" />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   )

//   return <TestForm />
// }
