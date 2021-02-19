import React, { FocusEvent, ChangeEvent, FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { DataTestProp } from '@hazelcast/helpers'
import { Error, errorId } from './Error'

import styles from './TimeField.module.scss'
import { Label } from './Label'

export type TimeFieldCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

type TimeFieldLabelProps =
  | {
      ariaLabel?: never
      label: string
      labelClassName?: string
    }
  | {
      ariaLabel: string
      label?: never
      labelClassName?: never
    }

export type TimeFieldExtraProps = {
  inputClassName?: string
  errorClassName?: string
  seconds?: boolean
} & TimeFieldLabelProps &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className' | 'autoFocus' | 'disabled' | 'required'>

export type TypeFieldProps = TimeFieldCoreProps & TimeFieldExtraProps & DataTestProp

export const TimeField: FC<TypeFieldProps> = ({
  'data-test': dataTest,
  ariaLabel,
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
  ...props
}) => {
  // Use an auto generated id if it's not set explicitly
  const autoId = useUID()
  const id = explicitId ?? autoId

  return (
    <div data-test={dataTest} className={cn(styles.container, className)}>
      {label && <Label id={id} label={label} className={cn(styles.label, labelClassName)} />}
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
            aria-label={ariaLabel}
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
