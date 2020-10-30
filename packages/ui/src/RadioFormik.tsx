import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { Radio, RadioExtraProps } from './Radio'

export type RadioFormikProps<V extends object> = RadioExtraProps & {
  name: keyof V
  validate?: FieldValidator
  value: string
}

export const RadioFieldFormik = <V extends object>({ name, value, validate, ...props }: RadioFormikProps<V>): ReactElement => {
  const [field] = useField<string | undefined>({
    name,
    validate,
  })

  return <Radio {...props} name={name} checked={field.value === value} value={value} onChange={field.onChange} onBlur={field.onBlur} />
}
