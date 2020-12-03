import React, { ReactElement, useCallback } from 'react'
import { useField } from 'formik'

import { NumberField, NumberFieldExtraProps } from './NumberField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
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

  const onChange = useCallback(
    (newValue?: number) => {
      setValue(newValue)
      setTouched(true)
    },
    [setValue, setTouched],
  )

  return <NumberField {...props} name={name} value={field.value} onChange={onChange} onBlur={field.onBlur} error={getFieldError(meta)} />
}
