import React, { ChangeEvent, FC, FocusEvent, useRef } from 'react'
import styles from './Radio.module.scss'
import { DataTestProp } from '@hazelcast/helpers'
import classNames from 'classnames'
import { Error, errorId } from './Error'
import { Help, helpTooltipId } from './Help'
import { v4 as uuid } from 'uuid'

type RadioCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  checked?: boolean
}

export type RadioExtraProps = {
  label: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  className?: string
  classNameLabel?: string
}

type RadioProps = RadioCoreProps & RadioExtraProps & DataTestProp

/**
 * ### Purpose
 * Forms require input from users. If you need information that can be represented as a choice of multiple values, use input with type 'radio'.
 * Help and error guidance to ensure they know what to enter.
 */
export const Radio: FC<RadioProps> = ({
  name,
  onChange,
  onBlur,
  className,
  classNameLabel,
  value,
  label,
  helperText,
  error,
  disabled = false,
  checked,
  required,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(uuid())

  return (
    <span className={className}>
      {/* 
        We can only style forward elements based on input state (with ~ or +), has() is not supported yet.
        That's why we need to explicitly pass error/checked/disabled classes to the wrapper element.
      */}
      <label
        className={classNames(
          styles.wrapper,
          {
            [styles.error]: !!error,
            [styles.disabled]: disabled,
          },
          classNameLabel,
        )}
        htmlFor={idRef.current}
      >
        <span className={styles.name}>{label}</span>
        <input
          type="radio"
          ref={inputRef}
          id={idRef.current}
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          // aria-invalid={!!error}
          // aria-required={required}
          // aria-describedby={helperText && helpTooltipId(idRef.current)}
          // aria-errormessage={error && errorId(idRef.current)}
        />
        <span className={styles.checkmark} />
        {helperText && <Help parentId={idRef.current} helperText={helperText} />}
      </label>
      <Error error={error} className={classNames(styles.errorContainer)} inputId={idRef.current} />
    </span>
  )
}
