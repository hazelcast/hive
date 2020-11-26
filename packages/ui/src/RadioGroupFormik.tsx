import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { RadioGroup, RadioGroupCoreProps } from './RadioGroup'
import { getFieldError } from './utils/formik'

export type RadioGroupFormikProps<V extends object> = RadioGroupCoreProps & {
  name: keyof V
  validate?: FieldValidator
}

export const RadioGroupFieldFormik = <V extends object>({ name, validate, children, ...props }: RadioGroupFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <RadioGroup {...props} name={name} error={getFieldError(meta)} onChange={field.onChange}>
      {children}
    </RadioGroup>
  )
}
