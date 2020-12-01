import React, { ReactElement, useCallback } from 'react'
import { useField } from 'formik'

import { SelectField, SelectFieldCoreDynamicProps, SelectFieldExtraProps, SelectFieldOption } from './SelectField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type SelectFieldFormikProps<V extends object, OV = string> = SelectFieldExtraProps<OV> &
  (
    | {
        name: ExtractKeysOfValueType<V, SelectFieldOption<OV> | null>
        isClearable: true
        validate?: FieldValidatorGeneric<V[keyof V]>
      }
    | {
        name: ExtractKeysOfValueType<V, SelectFieldOption<OV>>
        isClearable?: false
        validate?: FieldValidatorGeneric<V[keyof V]>
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
      // TODO: setTouched called after setValue refires validation with an old value. File a bug.
      setTouched(true)
      setValue(value)
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
