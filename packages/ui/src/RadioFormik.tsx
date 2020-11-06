import React, { ReactElement, useContext } from 'react'
import { FieldValidator, useField } from 'formik'

import { Radio, RadioExtraProps } from './Radio'
import { RadioContext } from './RadioGroup'

export type RadioFormikProps = RadioExtraProps & {
  validate?: FieldValidator
  value: string
}

export const RadioFieldFormik = ({ value, validate, ...props }: RadioFormikProps): ReactElement => {
  const { name } = useContext(RadioContext)
  const [field] = useField<string | undefined>({
    name,
    validate,
  })

  return <Radio {...props} checked={field.value === value} value={value} onBlur={field.onBlur} />
}
