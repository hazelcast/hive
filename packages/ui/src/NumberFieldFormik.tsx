import React, { ReactElement } from 'react'
import { useField, useFormikContext } from 'formik'

import { NumberField, NumberFieldExtraProps } from './NumberField'
import { FieldValidatorGeneric, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type NumberFieldFormikProps<V extends object> = NumberFieldExtraProps & {
  name: ExtractKeysOfValueType<V, number | undefined>
  validate?: FieldValidatorGeneric<number | undefined>
}

export const NumberFieldFormik = <V extends object>({ name, validate, ...props }: NumberFieldFormikProps<V>): ReactElement => {
  const [field, meta, { setTouched }] = useField<number | undefined>({
    name,
    validate,
  })

  const formik = useFormikContext<V>()

  const onChange = (value: number | undefined) => {
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

  return <NumberField {...props} name={name} value={field.value} onChange={onChange} onBlur={field.onBlur} error={getFieldError(meta)} />
}
