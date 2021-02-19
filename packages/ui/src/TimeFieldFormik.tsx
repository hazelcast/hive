import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { TimeField, TimeFieldExtraProps } from './TimeField'

export type TimeFieldFormikProps<V extends object> = TimeFieldExtraProps & {
  name: keyof V
  validate?: FieldValidator
}

export const TimeFieldFormik = <V extends object>({ name, validate, ...props }: TimeFieldFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <TimeField
      {...props}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched || meta.initialError === meta.error ? meta.error : undefined}
    />
  )
}
