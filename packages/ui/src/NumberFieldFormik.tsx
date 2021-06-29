import React, { ReactElement } from 'react'
import { useField, useFormikContext } from 'formik'

import { NumberField, NumberFieldExtraProps } from './NumberField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type NumberFieldFormikProps<V extends object> = NumberFieldExtraProps & {
  name: ExtractKeysOfValueType<V, number | undefined>
  validate?: FieldValidatorGeneric<number | undefined>
  onChange?: (value?: number) => void
}

export const NumberFieldFormik = <V extends object>({ name, validate, onChange, ...props }: NumberFieldFormikProps<V>): ReactElement => {
  const [{ value, onBlur }, meta, { setTouched }] = useField<number | undefined>({
    name,
    validate,
  })

  const formik = useFormikContext<V>()

  const handleChange = (value: number | undefined) => {
    if (onChange) {
      onChange(value)
    }

    // https://github.com/formium/formik/issues/2332
    setTouched(true, false)
    // Override default behavior by forcing undefined to be set on the state
    if (value === undefined) {
      const newValues = {
        ...formik.values,
        [name]: undefined,
      }
      formik.setValues({
        ...newValues,
      })
      void formik.validateForm({
        ...newValues,
      })
    } else {
      // Use default behavior for normal values
      formik.setFieldValue(name, value, true)
    }
  }

  return <NumberField {...props} name={name} value={value} onChange={handleChange} onBlur={onBlur} error={getFieldError(meta)} />
}
