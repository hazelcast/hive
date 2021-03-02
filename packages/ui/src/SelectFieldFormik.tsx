import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { SelectField, SelectFieldCoreDynamicProps, SelectFieldExtraProps } from './SelectField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type SelectFieldFormikProps<V extends object, OV = string> = SelectFieldExtraProps<OV> &
  (
    | {
        name: ExtractKeysOfValueType<V, OV | null>
        isClearable: true
        isMulti?: false
        validate?: FieldValidatorGeneric<OV | null>
      }
    | {
        name: ExtractKeysOfValueType<V, OV>
        isClearable?: false
        isMulti?: false
        validate?: FieldValidatorGeneric<OV>
      }
    | {
        name: ExtractKeysOfValueType<V, OV[] | null>
        isClearable: true
        isMulti?: true
        validate?: FieldValidatorGeneric<OV[] | null>
      }
    | {
        name: ExtractKeysOfValueType<V, OV[]>
        isClearable?: false
        isMulti?: true
        validate?: FieldValidatorGeneric<OV[]>
      }
  )

export const SelectFieldFormik = <V extends object, OV = string>({
  name,
  validate,
  isClearable,
  isMulti,
  ...props
}: SelectFieldFormikProps<V, OV>): ReactElement => {
  type ValueType = typeof isMulti extends true ? OV[] : OV
  type SelectedOption = typeof isClearable extends true ? ValueType | null : ValueType

  const [field, meta, { setValue, setTouched }] = useField<SelectedOption>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate<SelectedOption>(setValue, setTouched), [setValue, setTouched])

  const dynamicProps = {
    value: field.value,
    onChange,
    isClearable,
    isMulti,
  } as SelectFieldCoreDynamicProps<OV>

  return <SelectField {...props} {...dynamicProps} name={name} onBlur={field.onBlur} error={getFieldError(meta)} />
}
