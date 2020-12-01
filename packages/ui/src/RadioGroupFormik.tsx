import React, { ReactElement } from 'react'
import { useField } from 'formik'

import { RadioGroup, RadioGroupCoreProps } from './RadioGroup'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'

export type RadioGroupFormikProps<V extends object> = RadioGroupCoreProps & {
  name: V[keyof V] extends string | undefined ? keyof V : never
  validate?: FieldValidatorGeneric<string | undefined>
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
