import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { TextArea, TextAreaExtraProps } from './TextArea'

export type TextAreaFormikProps<V extends object> = TextAreaExtraProps & {
  name: keyof V
  validate?: FieldValidator
}

export const TextAreaFormik = <V extends object>({ name, validate, ...props }: TextAreaFormikProps<V>): ReactElement => {
  const [field, meta] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <TextArea
      {...props}
      name={name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched ? meta.error : undefined}
    />
  )
}
