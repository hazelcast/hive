import React, { ReactElement, useCallback } from 'react'
import { FieldValidator, useField } from 'formik'

import { SelectField, SelectFieldCoreDynamicProps, SelectFieldExtraProps, SelectFieldOption } from './SelectField'
import { getFieldError } from './utils/formik'

export type SelectFieldFormikProps<V extends object, OV = string> = SelectFieldExtraProps<OV> &
  (
    | {
        name: V[keyof V] extends SelectFieldOption<OV> | undefined ? keyof V : never
        isClearable: true
        validate?: FieldValidator
      }
    | {
        name: V[keyof V] extends SelectFieldOption<OV> ? keyof V : never
        isClearable?: false
        validate?: FieldValidator
      }
  )

export const SelectFieldFormik = <V extends object, OV = string>({
  name,
  validate,
  isClearable,
  ...props
}: SelectFieldFormikProps<V, OV>): ReactElement => {
  type SelectedOption = typeof isClearable extends true ? SelectFieldOption<OV> | null : SelectFieldOption<OV>

  const [field, meta, { setValue, setTouched }] = useField<SelectedOption>({
    name,
    validate,
  })

  const onChange = useCallback(
    (value: SelectedOption) => {
      setValue(value)
      setTouched(true)
    },
    [setValue, setTouched],
  )

  const dynamicProps = {
    value: field.value,
    onChange,
    isClearable,
  } as SelectFieldCoreDynamicProps<OV>

  return <SelectField {...props} {...dynamicProps} name={name} onBlur={field.onBlur} error={getFieldError(meta)} />
}
