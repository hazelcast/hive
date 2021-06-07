import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { SelectField, SelectFieldExtraProps } from './SelectField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from '../utils/formik'
import { ExtractKeysOfValueType } from '../utils/types'

export type SelectFieldFormikProps<V extends object, OV = string> = SelectFieldExtraProps<OV> & {
  name: ExtractKeysOfValueType<V, OV | null>
  validate?: FieldValidatorGeneric<OV | null>
}

export const SelectFieldFormik = <V extends object, OV extends string | number = string>({
  name,
  validate,
  ...props
}: SelectFieldFormikProps<V, OV>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<OV | null>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate<OV | null>(setValue, setTouched), [setValue, setTouched])

  return (
    <SelectField<OV> {...props} name={name} value={field.value} onChange={onChange} onBlur={field.onBlur} error={getFieldError(meta)} />
  )
}
