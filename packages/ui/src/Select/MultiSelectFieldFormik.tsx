import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { MultiSelectField, MultiSelectFieldExtraProps } from './MultiSelectField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from '../utils/formik'
import { ExtractKeysOfValueType } from '../utils/types'

export type MultiSelectFieldFormikProps<V extends object, OV = string> = MultiSelectFieldExtraProps<OV> & {
  name: ExtractKeysOfValueType<V, OV[]>
  validate?: FieldValidatorGeneric<OV[]>
}

export const MultiSelectFieldFormik = <V extends object, OV extends string | number = string>({
  name,
  validate,
  ...props
}: MultiSelectFieldFormikProps<V, OV>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<OV[]>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate<OV[]>(setValue, setTouched), [setValue, setTouched])

  return (
    <MultiSelectField<OV>
      {...props}
      name={name}
      value={field.value}
      onChange={onChange}
      onBlur={field.onBlur}
      error={getFieldError(meta)}
    />
  )
}
