import React, { ChangeEvent, FC, FocusEvent, useEffect, useRef } from 'react'
import styles from './Checkbox.module.scss'
import { Check, Minus } from 'react-feather'
import { DataTestProp } from '@hazelcast/helpers'
import classNames from 'classnames'
import { Error, errorId } from './Error'
import { Help, helpTooltipId } from './Help'
import { v4 as uuid } from 'uuid'

type CheckboxCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  checked?: boolean
}

export type CheckboxExtraProps = {
  label: string
  helperText?: string
  indeterminate?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
}

type CheckboxProps = CheckboxCoreProps & CheckboxExtraProps & DataTestProp

/**
 * ### Purpose
 * Forms require input from users. If you need information that can be represented as boolean, use input with type 'checkbox'.
 * Checkbox fields accept boolean types of data. And help and error guidance to ensure they know what to enter.
 *
 *
 * ### General Info
 * - It's important to realise that we don't set checkbox value, but state (on/off). That is the main difference from other input types.
 * - They can have a special indeterminate state, that represents a '3rd' value, usually used in tree structures, etc.
 */
export const Checkbox: FC<CheckboxProps> = ({
  checked,
  name,
  onChange,
  onBlur,
  className,
  value,
  indeterminate = false,
  label,
  helperText,
  error,
  disabled = false,
  required,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(uuid())

  // we want to support indeterminate as a React property, but it needs to be set programatically
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.indeterminate = indeterminate
    }
  })

  return (
    <span>
      {/* 
        We can only style forward elements based on input state (with ~ or +), has() is not supported yet.
        That's why we need to explicitly pass error/checked/disabled classes to the wrapper element.
      */}
      <label
        className={classNames(
          styles.wrapper,
          {
            [styles.error]: !!error,
            [styles.checked]: checked,
            [styles.disabled]: disabled,
          },
          className,
        )}
        htmlFor={idRef.current}
      >
        <span className={styles.name}>{label}</span>
        <input
          type="checkbox"
          ref={inputRef}
          id={idRef.current}
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={helperText && helpTooltipId(idRef.current)}
          aria-errormessage={error && errorId(idRef.current)}
        />
        {indeterminate ? <Minus className={styles.checkmark} /> : <Check className={styles.checkmark} />}
        {helperText && <Help parentId={idRef.current} helperText={helperText} />}
      </label>
      <Error error={error} className={classNames(styles.errorContainer)} inputId={idRef.current} />
    </span>
  )
}
