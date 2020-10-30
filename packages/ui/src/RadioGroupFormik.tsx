import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { RadioGroup, RadioGroupProps } from './RadioGroup'

export type RadioGroupFormikProps<V extends object> = RadioGroupProps & {
  name: keyof V
  validate?: FieldValidator
}

export const RadioGroupFieldFormik = <V extends object>({ name, validate, children, ...props }: RadioGroupFormikProps<V>): ReactElement => {
  const [, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <RadioGroup {...props} error={meta.error}>
      {children}
    </RadioGroup>
  )
}
