import React, { ChangeEvent, ReactElement, useCallback } from 'react'
import { FieldValidator, useField } from 'formik'

import { RadioGroup, RadioGroupCoreProps } from './RadioGroup'

export type RadioGroupFormikProps<V extends object> = RadioGroupCoreProps & {
  name: keyof V
  validate?: FieldValidator
}

export const RadioGroupFieldFormik = <V extends object>({ name, validate, children, ...props }: RadioGroupFormikProps<V>): ReactElement => {
  const [field, meta, { setTouched }] = useField<string | undefined>({
    name,
    validate,
  })

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTouched(true)
      field.onChange(e)
    },
    [field.onChange],
  )

  return (
    <RadioGroup
      {...props}
      name={name}
      error={meta.touched || meta.initialError === meta.error ? meta.error : undefined}
      onChange={onChange}
    >
      {children}
    </RadioGroup>
  )
}
