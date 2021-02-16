import React, { FocusEvent, ChangeEvent, FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { DataTestProp } from '@hazelcast/helpers'
import { Error } from './Error'

import styles from './TimeField.module.scss'

export type TimeFieldCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export type TimeFieldExtraProps = {
  // label: string
  // labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  seconds?: boolean
} & Partial<Pick<HTMLInputElement, 'className' | 'disabled' | 'required'>>

export type TypeFieldProps = TimeFieldCoreProps & TimeFieldExtraProps & DataTestProp

/*
 * [] Label
 */
export const TimeField: FC<TypeFieldProps> = ({
  'data-test': dataTest,
  className,
  disabled,
  error,
  errorClassName,
  inputClassName,
  label,
  labelClassName,
  name,
  onBlur,
  onChange,
  required,
  seconds = false,
  value,
  ...props
}) => {
  const id = useUID()

  return (
    <div data-test={dataTest} className={cn(styles.container, className)}>
      <div className={styles.inputContainer}>
        <input
          id={id}
          name={name}
          onBlur={onBlur}
          className={cn(styles.input, inputClassName, {
            [styles.disabled]: disabled,
            [styles.error]: error,
          })}
          type="time"
          step={seconds ? '1' : undefined}
          onChange={onChange}
          value={value}
          required={required}
          {...props}
        />
        <div className={styles.borderOverlay} />
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
