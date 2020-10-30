import { DataTestProp } from '@hazelcast/helpers'
import React, { FC, FocusEvent, ChangeEvent, ReactElement, InputHTMLAttributes } from 'react'

import { TextField } from '../lib'

type NumberFieldCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}
export type NumberFieldExtraProps = {
  label: string
  required?: boolean
  helperText?: string | ReactElement
  className?: string
  inputClassName?: string
  errorClassName?: string
  placeholder: string
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'disabled' | 'autoComplete'>
type NumberFieldProps = NumberFieldCoreProps & NumberFieldExtraProps

export const NumberField: FC<NumberFieldProps> = (props) => {
  return <TextField {...props} />
}
