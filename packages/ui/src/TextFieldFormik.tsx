import React, { ReactElement, useCallback } from 'react'
import { useField } from 'formik'

import { TextField, TextFieldExtraProps, TextFieldTypes } from './TextField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type TextFieldFormikProps<V extends object> = TextFieldExtraProps<Exclude<TextFieldTypes, 'number' | 'password'>> & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<string | undefined>
  onChange?: (value: string) => void
}

export const TextFieldFormik = <V extends object>({ type, name, validate, onChange, ...props }: TextFieldFormikProps<V>): ReactElement => {
  const [{ onBlur, value, onChange: onFormikChange }, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <TextField
      {...props}
      type={type}
      name={name}
      value={value}
      onChange={useCallback(
        (e) => {
          if (onChange) {
            onChange(e.target.value)
          }

          onFormikChange(e)
        },
        [onFormikChange, onChange],
      )}
      onBlur={onBlur}
      error={getFieldError(meta)}
    />
  )
}
