import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'
import { useMemo } from 'react'

import { Slider, SliderExtraProps, SliderValue } from './Slider'
import { formikTouchAndUpdate, getFieldError } from '../utils/formik'
import { ExtractKeysOfValueType } from '../utils/types'

export type SliderFormikProps<V extends object> = SliderExtraProps &
  Partial<Pick<HTMLInputElement, 'disabled'>> & {
    name: ExtractKeysOfValueType<V, SliderValue>
    validate?: FieldValidator
  }

export const SliderFormik = <V extends object>({ name, validate, ...props }: SliderFormikProps<V>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<number | [number, number]>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate(setValue, setTouched), [setValue, setTouched])

  return <Slider {...props} name={name} value={field.value} onChange={onChange} error={getFieldError(meta)} />
}
