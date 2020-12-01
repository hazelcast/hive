import React, { ReactElement } from 'react'
import { useField } from 'formik'

import { RadioGroup, RadioGroupExtraProps } from './RadioGroup'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type RadioGroupFormikProps<V extends object> = RadioGroupExtraProps & {
  name: ExtractKeysOfValueType<V, string | undefined>
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
