import React, { ChangeEvent, FC, FocusEvent, InputHTMLAttributes, useEffect, useRef } from 'react'
import styles from './Checkbox.module.scss'
import { Check, Minus } from 'react-feather'
import { DataTestProp } from '@hazelcast/helpers'
import classNames from 'classnames'
import { Error, errorId } from './Error'

type CheckboxCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  checked?: boolean
}

export type CheckboxExtraProps = {
  id: string
  description?: string
  label: string
  readOnly?: boolean
  indeterminate?: boolean
  disabled?: boolean
  required?: boolean
}

type CheckboxProps = CheckboxCoreProps & CheckboxExtraProps & DataTestProp & InputHTMLAttributes<HTMLInputElement>

export const Checkbox: FC<CheckboxProps> = ({
  id,
  checked,
  name,
  onChange,
  onBlur,
  readOnly = false,
  value,
  indeterminate = false,
  label,
  // description,
  error,
  disabled = false,
  required,
  ...htmlAttrs
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // we want to support indeterminate as a React property, but it needs to be set programatically
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate, inputRef])

  return (
    <span>
      {/* 
        We can only style forward elements based on input state (with ~ or +), has() is not supported yet.
        That's why we need to explicitly pass error/checked/disabled classes to the wrapper element.
      */}
      <label
        className={classNames(styles.wrapper, {
          [styles.error]: !!error,
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        })}
        htmlFor={id}
      >
        <span className={styles.name}>{label}</span>
        <input
          {...htmlAttrs}
          type="checkbox"
          ref={inputRef}
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-required={required}
          aria-errormessage={error && errorId(id)}
        />
        {indeterminate ? <Minus className={styles.checkmark} /> : <Check className={styles.checkmark} />}
      </label>
      <Error error={error} className={classNames(styles.errorContainer, styles.errorMessage)} inputId={id} />
    </span>
  )
}
