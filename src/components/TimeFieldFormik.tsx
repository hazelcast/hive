import React, { ReactElement } from 'react'
import { useField } from 'formik'

import { TimeField, TimeFieldExtraProps } from './TimeField'
import { ExtractKeysOfValueType } from '../utils/types'
import { FieldValidatorGeneric } from '../utils/formik'

export type TimeFieldFormikProps<V extends object> = TimeFieldExtraProps & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<string | undefined>
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
