import React, { FocusEvent, ChangeEvent, FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import SimpleTimeField from 'react-simple-timefield'
import { DataTestProp } from '@hazelcast/helpers'

import { FieldHeaderProps } from './FieldHeader'

import styles from './TimeField.module.scss'
import { TextField } from './TextField'

export type TimeFieldCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export type TimeFieldExtraProps = {
  inputClassName?: string
  errorClassName?: string
  seconds?: boolean
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className' | 'autoFocus' | 'disabled' | 'required'> &
  Omit<FieldHeaderProps, 'id'>

export type TypeFieldProps = TimeFieldCoreProps & TimeFieldExtraProps & DataTestProp

export const TimeField: FC<TypeFieldProps> = (props) => {
  const {
    'data-test': dataTest,
    className,
    disabled,
    error,
    errorClassName,
    id: explicitId,
    inputClassName,
    label,
    labelClassName,
    name,
    onBlur,
    onChange,
    required,
    seconds = false,
    value,
    helperText,
    size,
    showAriaLabel,
    ...rest
  } = props
  // Use an auto generated id if it's not set explicitly
  const autoId = useUID()
  const id = explicitId ?? autoId

  return (
    <div data-test={dataTest} className={cn(styles.container, className)}>
      <SimpleTimeField
        showSeconds={seconds}
        input={
          <TextField
            name={name}
            id={id}
            label={label}
            error={error}
            onChange={onChange}
            errorClassName={errorClassName}
            inputClassName={inputClassName}
            labelClassName={labelClassName}
            onBlur={onBlur}
            size={size}
            required={required}
            disabled={disabled}
            showAriaLabel={showAriaLabel}
            helperText={helperText}
            {...rest}
          />
        }
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
