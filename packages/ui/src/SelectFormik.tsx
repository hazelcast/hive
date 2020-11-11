import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { Select, SelectCoreProps, SelectExtraProps } from './Select'

export type SelectFormikProps<V extends object> = Pick<SelectCoreProps, 'options'> &
  SelectExtraProps & {
    name: keyof V
    validate?: FieldValidator
  }

export const SelectFormik = <V extends object>({ name, options, validate, ...props }: SelectFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <Select
      {...props}
      name={name}
      options={options}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched ? meta.error : undefined}
    />
  )
}
