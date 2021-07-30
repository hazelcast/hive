import React, { ReactElement, useCallback, useMemo } from 'react'
import { useField } from 'formik'

import { CheckableSelectFieldExtraProps, CheckableSelectField } from './CheckableSelectField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from '../utils/formik'
import { ExtractKeysOfValueType } from '../utils/types'

export type CheckableSelectFieldFormikProps<V extends object, OV = string> = CheckableSelectFieldExtraProps<OV> & {
  name: ExtractKeysOfValueType<V, OV[]>
  validate?: FieldValidatorGeneric<OV[]>
  onChange?: (value: OV[]) => void
}

export const CheckableSelectFieldFormik = <V extends object, OV extends string | number = string>({
  name,
  validate,
  onChange,
  ...props
}: CheckableSelectFieldFormikProps<V, OV>): ReactElement => {
  const [{ value, onBlur }, meta, { setValue, setTouched }] = useField<OV[]>({
    name,
    validate,
  })

  const setFormikValue = useMemo(() => formikTouchAndUpdate<OV[]>(setValue, setTouched), [setValue, setTouched])
  const handleChange = useCallback(
    (newValue: OV[]) => {
      if (onChange) {
        onChange(newValue)
      }

      setFormikValue(newValue)
    },
    [setFormikValue, onChange],
  )

  return (
    <CheckableSelectField<OV> {...props} name={name} value={value} onChange={handleChange} onBlur={onBlur} error={getFieldError(meta)} />
  )
}
