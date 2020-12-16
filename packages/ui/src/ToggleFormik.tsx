import React, { ReactElement } from 'react'
import { useField } from 'formik'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

import { Toggle, ToggleExtraProps } from './Toggle'

export type ToggleFormikProps<V extends object> = ToggleExtraProps & {
  name: ExtractKeysOfValueType<V, boolean>
  validate?: FieldValidatorGeneric<boolean>
}

export const ToggleFormik = <V extends object>({ name, validate, ...props }: ToggleFormikProps<V>): ReactElement => {
  const [field, meta] = useField<boolean>({
    name,
    validate,
  })

  return <Toggle {...props} name={name} checked={field.value} onChange={field.onChange} onBlur={field.onBlur} error={getFieldError(meta)} />
}
