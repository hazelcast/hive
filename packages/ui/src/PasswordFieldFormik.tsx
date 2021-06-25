import React, { ReactElement, useCallback } from 'react'
import { useField } from 'formik'

import { PasswordField, PasswordFieldExtraProps } from './PasswordField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type PasswordFieldFormikProps<V extends object> = PasswordFieldExtraProps & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<string | undefined>
  onChange?: (value: string) => void
}

export const PasswordFieldFormik = <V extends object>({
  name,
  validate,
  onChange,
  ...props
}: PasswordFieldFormikProps<V>): ReactElement => {
  const [{ value, onBlur, onChange: onFormikChange }, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <PasswordField
      {...props}
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
