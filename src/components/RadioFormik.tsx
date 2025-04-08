import React, { ReactElement, useContext } from 'react'
import { useField } from 'formik'

import { Radio, RadioExtraProps } from './Radio'
import { RadioGroupContext } from './RadioGroupContext'

export type RadioFormikProps = RadioExtraProps & {
  value: string
}

export const RadioFieldFormik = ({ value, ...props }: RadioFormikProps): ReactElement => {
  const { name } = useContext(RadioGroupContext)
  const [field] = useField<string | undefined>({
    name,
  })

  return <Radio {...props} checked={field.value === value} value={value} onBlur={field.onBlur} />
}
