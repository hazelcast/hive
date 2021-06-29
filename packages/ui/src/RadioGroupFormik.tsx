import React, { ReactElement, useCallback } from 'react'
import { useField } from 'formik'

import { RadioGroup, RadioGroupExtraProps } from './RadioGroup'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type RadioGroupFormikProps<V extends object> = RadioGroupExtraProps & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<string | undefined>
  onChange?: (value: string) => void
}

export const RadioGroupFieldFormik = <V extends object>({
  name,
  validate,
  children,
  onChange,
  ...props
}: RadioGroupFormikProps<V>): ReactElement => {
  const [{ onChange: onFormikChange }, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <RadioGroup
      {...props}
      name={name}
      error={getFieldError(meta)}
      onChange={useCallback(
        (e) => {
          if (onChange) {
            onChange(e.target.value)
          }

          onFormikChange(e)
        },
        [onFormikChange, onChange],
      )}
    >
      {children}
    </RadioGroup>
  )
}
