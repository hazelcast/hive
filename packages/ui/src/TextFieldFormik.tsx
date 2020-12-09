import React, { ReactElement } from 'react'
import { useField } from 'formik'

import { TextField, TextFieldExtraProps } from './TextField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type TextFieldFormikProps<V extends object> = Exclude<TextFieldExtraProps<'text'>, 'type'> & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<V[keyof V]>
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
      error={getFieldError(meta)}
    />
  )
}
