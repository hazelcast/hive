import React, { ReactElement } from 'react'
import { useField } from 'formik'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'

import { Toggle, ToggleProps } from './Toggle'

export type ToggleFormikProps = ToggleProps & {
  name: string
  validate?: FieldValidatorGeneric<boolean>
}

export const ToggleFormik = ({ name, validate, ...props }: ToggleFormikProps): ReactElement => {
  const [field, meta] = useField<boolean>({
    name,
    validate,
  })

  return <Toggle {...props} name={name} checked={field.value} onChange={field.onChange} onBlur={field.onBlur} error={getFieldError(meta)} />
}
