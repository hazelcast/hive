import React, { ReactElement } from 'react'
import { useField } from 'formik'

import { PasswordField, PasswordFieldExtraProps } from './PasswordField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'

export type PasswordFieldFormikProps<V extends object> = PasswordFieldExtraProps & {
  name: V[keyof V] extends string | undefined ? keyof V : never
  validate?: FieldValidatorGeneric<string | undefined>
}

export const PasswordFieldFormik = <V extends object>({ name, validate, ...props }: PasswordFieldFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <PasswordField {...props} name={name} value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={getFieldError(meta)} />
  )
}
