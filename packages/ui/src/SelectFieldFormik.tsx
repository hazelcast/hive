import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { SelectField, SelectFieldCoreDynamicProps, SelectFieldExtraProps, SelectFieldOption } from './SelectField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type SelectFieldFormikProps<V extends object, OV = string> = SelectFieldExtraProps<OV> &
  (
    | {
        name: ExtractKeysOfValueType<V, SelectFieldOption<OV> | null>
        isClearable: true
        validate?: FieldValidatorGeneric<SelectFieldOption<OV> | null>
      }
    | {
        name: ExtractKeysOfValueType<V, SelectFieldOption<OV>>
        isClearable?: false
        validate?: FieldValidatorGeneric<SelectFieldOption<OV>>
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

  const onChange = useMemo(() => formikTouchAndUpdate<SelectedOption>(setValue, setTouched), [setValue, setTouched])

  const dynamicProps = {
    value: field.value,
    onChange,
    isClearable,
  } as SelectFieldCoreDynamicProps<OV>

  return <SelectField {...props} {...dynamicProps} name={name} onBlur={field.onBlur} error={getFieldError(meta)} />
}
