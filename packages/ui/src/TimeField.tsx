import React, { FocusEvent, ChangeEvent, FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { DataTestProp } from '@hazelcast/helpers'
import { Error, errorId } from './Error'
import { FieldHeader, FieldHeaderProps } from './FieldHeader'

import styles from './TimeField.module.scss'

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

export const TimeField: FC<TypeFieldProps> = ({
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
  ...props
}) => {
  // Use an auto generated id if it's not set explicitly
  const autoId = useUID()
  const id = explicitId ?? autoId

  return (
    <div data-test={dataTest} className={cn(styles.container, className)}>
      <FieldHeader
        id={id}
        size={size}
        label={label}
        helperText={helperText}
        showAriaLabel={showAriaLabel}
        labelClassName={labelClassName}
      />

      <div className={styles.inputBlock}>
        <div className={styles.inputContainer}>
          <input
            type="time"
            step={seconds ? '1' : undefined}
            id={id}
            name={name}
            className={cn(styles.input, inputClassName, {
              [styles.disabled]: disabled,
              [styles.error]: error,
            })}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            required={required}
            disabled={disabled}
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
            aria-invalid={!!error}
            aria-label={showAriaLabel ? label : undefined}
            aria-required={required}
            aria-errormessage={error && errorId(id)}
            {...props}
          />
          <div className={styles.borderOverlay} />
        </div>
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
