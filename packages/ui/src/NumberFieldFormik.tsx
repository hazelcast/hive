import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { NumberField, NumberFieldExtraProps } from './NumberField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type NumberFieldFormikProps<V extends object> = NumberFieldExtraProps & {
  name: ExtractKeysOfValueType<V, number | undefined>
  validate?: FieldValidatorGeneric<number | undefined>
}

export const NumberFieldFormik = <V extends object>({ name, validate, ...props }: NumberFieldFormikProps<V>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<number | undefined>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate(setValue, setTouched), [setValue, setTouched])
  // handle the case when the user removes the value all together
  const newValue = field.value === undefined ? meta.initialValue : field.value

  return (
    <NumberField
      {...props}
      name={name}
      value={newValue}
      onChange={() => onChange(newValue)}
      onBlur={field.onBlur}
      error={getFieldError(meta)}
    />
  )
}
