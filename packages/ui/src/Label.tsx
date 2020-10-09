import React, { FC, ReactElement } from 'react'
import { Help } from 'core/componentsV2/Help'

export type LabelProps = {
  id: string
  label: string | ReactElement
  helperText?: string | ReactElement
  required?: boolean
}

export const Label: FC<LabelProps> = ({ id, helperText, label, required }) => (
  <label htmlFor={id}>
    {label}
    {!required && ' (Optional)'}
    {helperText && <Help helperText={helperText} size="small" inputId={id} />}
  </label>
)
