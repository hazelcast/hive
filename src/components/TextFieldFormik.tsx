import React, { ReactElement, useCallback } from 'react'
import { useField } from 'formik'

import { TextField, TextFieldExtraProps, TextFieldTypes } from './TextField'
import { FieldValidatorGeneric, getFieldError } from '../utils/formik'
import { ExtractKeysOfValueType } from '../utils/types'

export type TextFieldFormikProps<V extends object> = TextFieldExtraProps<Exclude<TextFieldTypes, 'number' | 'password'>> & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<string | undefined>
  onChange?: (value: string) => void
  onBlur?: (e: React.FocusEvent) => void
}

export const TextFieldFormik = <V extends object>({
  type,
  name,
  validate,
  onChange,
  onBlur,
  ...props
}: TextFieldFormikProps<V>): ReactElement => {
  const [{ onBlur: onFormikBlur, value, onChange: onFormikChange }, meta] = useField<string | undefined>({
    name,
    validate,
  })

  const onBlurInner = React.useCallback(
    (e: React.FocusEvent) => {
      if (onBlur) {
        onBlur(e)
      }
      onFormikBlur(e)
    },
    [onBlur, onFormikBlur],
  )

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
      onBlur={onBlurInner}
      error={getFieldError(meta)}
    />
  )
}
