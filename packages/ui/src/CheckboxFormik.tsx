import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'
import { Checkbox, CheckboxExtraProps } from './Checkbox'

export type CheckboxFieldFormikProps<V extends object> = CheckboxExtraProps & {
  name: keyof V
  validate?: FieldValidator
}

export const CheckboxFieldFormik = <V extends object>({ name, validate, ...props }: CheckboxFieldFormikProps<V>): ReactElement => {
  const [field, meta] = useField<boolean>({
    name,
    validate,
  })

  return (
    <Checkbox
      {...props}
      name={name}
      checked={field.checked}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched || meta.initialError === meta.error ? meta.error : undefined}
    />
  )
}
