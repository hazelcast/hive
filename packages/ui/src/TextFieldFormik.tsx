import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { TextField, TextFieldExtraProps } from './TextField'

export type TextFieldFormikProps<V extends object> = Exclude<TextFieldExtraProps<'text'>, 'type'> & {
  name: V[keyof V] extends string | undefined ? keyof V : never
  validate?: FieldValidator
}

export const TextFieldFormik = <V extends object>({ name, validate, ...props }: TextFieldFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <TextField
      {...props}
      type="text"
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched ? meta.error : undefined}
    />
  )
}
