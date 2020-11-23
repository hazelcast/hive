import React, { ReactElement, useCallback } from 'react'
import { FieldValidator, useField } from 'formik'
import { ValueType } from 'react-select'

import { Select, SelectProps, SelectExtraProps } from './Select'

type OptionType = { label: string; value: string }

export type SelectFormikProps<V extends object> = Pick<SelectProps, 'options'> &
  SelectExtraProps & {
    name: keyof V
    validate?: FieldValidator
  }

export const SelectFormik = <V extends object>({ name, validate, ...props }: SelectFormikProps<V>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<ValueType<OptionType>>({
    name,
    validate,
  })

  const onChange = useCallback(
    (value: ValueType<OptionType>) => {
      setValue(value)
      setTouched(true)
    },
    [setValue, setTouched],
  )

  return (
    <Select
      {...props}
      name={name}
      value={field.value}
      onChange={onChange}
      onBlur={field.onBlur}
      error={meta.touched ? meta.error : undefined}
    />
  )
}
