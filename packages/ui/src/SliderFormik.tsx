import React, { ReactElement, useCallback } from 'react'
import { FieldValidator, useField } from 'formik'
import { Slider, SliderExtraProps } from './Slider'

export type SliderFormikProps<V extends object> = SliderExtraProps & {
  name: keyof V
  validate?: FieldValidator
}

export const SliderFormik = <V extends object>({ name, validate, ...props }: SliderFormikProps<V>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<number | [number, number]>({
    name,
    validate,
  })

  const onChange = useCallback(
    (newValue: number | [number, number]) => {
      setValue(newValue)
      setTouched(true)
    },
    [setValue, setTouched],
  )

  return (
    <Slider
      {...props}
      name={name}
      value={field.value}
      onChange={onChange}
      error={meta.touched || meta.initialError === meta.error ? meta.error : undefined}
    />
  )
}
