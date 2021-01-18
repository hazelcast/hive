import React, { ReactElement } from 'react'
import { useField } from 'formik'

import { TextField, TextFieldExtraProps, TextFieldTypes } from './TextField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type TextFieldFormikProps<V extends object> = TextFieldExtraProps<Exclude<TextFieldTypes, 'number' | 'password'>> & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<string | undefined>
}

export const TextFieldFormik = <V extends object>({ type, name, validate, ...props }: TextFieldFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <TextField
      {...props}
      type={type}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={getFieldError(meta)}
    />
  )
}
