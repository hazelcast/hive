import React, { ReactElement, useCallback } from 'react'
import { useField } from 'formik'

import { Checkbox, CheckboxExtraProps } from './Checkbox'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type CheckboxFieldFormikProps<V extends object> = CheckboxExtraProps & {
  name: ExtractKeysOfValueType<V, boolean>
  validate?: FieldValidatorGeneric<boolean>
  onChange?: (value: boolean) => void
}

export const CheckboxFormik = <V extends object>({ name, validate, onChange, ...props }: CheckboxFieldFormikProps<V>): ReactElement => {
  const [{ onBlur, onChange: onFormikChange, value }, meta] = useField<boolean>({
    name,
    validate,
  })

  return (
    <Checkbox
      {...props}
      name={name}
      checked={value}
      onChange={useCallback(
        (e) => {
          if (onChange) {
            onChange(e.target.checked)
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
