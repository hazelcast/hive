import React, { ReactElement, useCallback } from 'react'
import { FieldValidator, useField } from 'formik'

import { NumberField, NumberFieldExtraProps } from './NumberField'

export type NumberFieldFormikProps<V extends object> = NumberFieldExtraProps & {
  name: V[keyof V] extends number ? keyof V : never
  validate?: FieldValidator
}

export const NumberFieldFormik = <V extends object>({ name, validate, ...props }: NumberFieldFormikProps<V>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<number>({
    name,
    validate,
  })

  const onChange = useCallback(
    (newValue: number) => {
      setValue(newValue)
      setTouched(true)
    },
    [setValue, setTouched],
  )

  return (
    <NumberField
      {...props}
      name={name}
      value={field.value}
      onChange={onChange}
      onBlur={field.onBlur}
      error={meta.touched ? meta.error : undefined}
    />
  )
}
