import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { TextField, TextFieldExtraProps } from './TextField'

export type TextFieldFormikProps<V extends Record<string, unknown>> = TextFieldExtraProps & {
  name: keyof V
  validate?: FieldValidator
}

export const TextFieldFormik = <V extends Record<string, unknown>>({ name, validate, ...props }: TextFieldFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <TextField
      {...props}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched ? meta.error : undefined}
    />
  )
}
