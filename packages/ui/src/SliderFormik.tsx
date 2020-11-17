import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'
import { Slider, SliderExtraProps } from './Slider'

export type SliderFormikProps<V extends object> = SliderExtraProps & {
  name: keyof V
  validate?: FieldValidator
}

export const SliderFormik = <V extends object>({ name, validate, ...props }: SliderFormikProps<V>): ReactElement => {
  const [field, meta, form] = useField<number | [number, number]>({
    name,
    validate,
  })

  return (
    <Slider
      {...props}
      name={name}
      value={field.value}
      onChange={form.setValue as (value: number | [number, number]) => void}
      error={meta.error}
    />
  )
}
