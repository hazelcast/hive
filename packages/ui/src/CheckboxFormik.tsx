import React, { ReactElement } from 'react'
import { useField } from 'formik'

import { Checkbox, CheckboxExtraProps } from './Checkbox'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'

export type CheckboxFieldFormikProps<V extends object> = CheckboxExtraProps & {
  name: V[keyof V] extends boolean ? keyof V : never
  validate?: FieldValidatorGeneric<boolean>
}

export const CheckboxFieldFormik = <V extends object>({ name, validate, ...props }: CheckboxFieldFormikProps<V>): ReactElement => {
  const [field, meta] = useField<boolean>({
    name,
    validate,
  })

  return (
    <Checkbox {...props} name={name} checked={field.checked} onChange={field.onChange} onBlur={field.onBlur} error={getFieldError(meta)} />
  )
}
