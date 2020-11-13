import React, { ChangeEvent, ReactElement, useCallback } from 'react'
import { FieldValidator, useField } from 'formik'

import { Select, SelectCoreProps, SelectExtraProps } from './Select'

export type SelectFormikProps<V extends object> = Pick<SelectCoreProps, 'options'> &
  SelectExtraProps & {
    name: keyof V
    validate?: FieldValidator
  }

export const SelectFormik = <V extends object>({ name, options, validate, ...props }: SelectFormikProps<V>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<string | undefined>({
    name,
    validate,
  })

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value)
      setTouched(true)
    },
    [setValue, setTouched],
  )

  return (
    <Select
      {...props}
      name={name}
      options={options}
      value={field.value}
      onChange={onChange}
      onBlur={field.onBlur}
      error={meta.touched ? meta.error : undefined}
    />
  )
}
