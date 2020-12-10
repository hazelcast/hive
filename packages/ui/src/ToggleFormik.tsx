import React, { ReactElement, useContext } from 'react'
import { useField } from 'formik'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'

import { Toggle, ToggleProps } from './Toggle'

export type ToggleFormikProps = ToggleProps & {
  value: string
}

export const ToggleFormik = ({ value, ...props }: ToggleFormikProps): ReactElement => {
  // xxx wip
  const [field, meta] = useField<boolean>({
    name,
    // validate,
  })

  return (
    <Toggle
      {...props}
      name={name}
      checked={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={getFieldError(meta)} />
  )
}
