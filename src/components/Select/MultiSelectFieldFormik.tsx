import React, { ReactElement, useCallback, useMemo } from 'react'
import { useField } from 'formik'

import { DataTestProp } from '../../helpers/types'
import { MultiSelectField, MultiSelectFieldExtraProps } from './MultiSelectField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from '../../utils/formik'
import { ExtractKeysOfValueType } from '../../utils/types'

export type MultiSelectFieldFormikProps<V extends object, OV = string> = MultiSelectFieldExtraProps<OV> & {
  name: ExtractKeysOfValueType<V, OV[]>
  validate?: FieldValidatorGeneric<OV[]>
  onChange?: (value: OV[]) => void
} & DataTestProp

export const MultiSelectFieldFormik = <V extends object, OV extends string | number = string>({
  name,
  validate,
  onChange,
  ...props
}: MultiSelectFieldFormikProps<V, OV>): ReactElement => {
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

  return <MultiSelectField<OV> {...props} name={name} value={value} onChange={handleChange} onBlur={onBlur} error={getFieldError(meta)} />
}
