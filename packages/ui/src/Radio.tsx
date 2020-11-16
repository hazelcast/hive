import React, { FC, FocusEvent, useContext, useRef } from 'react'
import styles from './Radio.module.scss'
import classNames from 'classnames'
import { Help, helpTooltipId } from './Help'
import { v4 as uuid } from 'uuid'
import { DataTestProp } from '@hazelcast/helpers'
import { RadioGroupContext } from './RadioGroupContext'

type RadioCoreProps = {
  value: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  checked?: boolean
}

export type RadioExtraProps = {
  label: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export type RadioProps = RadioCoreProps & RadioExtraProps & DataTestProp

/**
 * ### Purpose
 * Forms require input from users. If you need information that can be represented as a choice of multiple values, use input with type 'radio'.
 * Help prop provides guidance to ensure they know what to enter.
 *
 * Radios need to be wrapped in RadioGroup component that provides radio buttons with context so that they behave as one component.
 */
export const Radio: FC<RadioProps> = ({
  onBlur,
  className,
  value,
  label,
  required,
  helperText,
  disabled = false,
  checked,
  'data-test': dataTest,
}) => {
  const idRef = useRef(uuid())
  const { name, onChange, errorId } = useContext(RadioGroupContext)
  const errorProps = errorId
    ? {
        'aria-invalid': true,
        'aria-errormessage': errorId,
      }
    : {}

  return (
    <label
      className={classNames(
        styles.wrapper,
        {
          [styles.disabled]: disabled,
          [styles.error]: !!errorId,
        },
        className,
      )}
      data-test={dataTest}
      htmlFor={idRef.current}
    >
      {/*
        We can only style forward elements based on input state (with ~ or +), has() is not supported yet.
        That's why we need to explicitly pass error/checked/disabled classes to the wrapper element.
      */}
      <span className={styles.name} data-test="radio-input-label">
        {label}
      </span>
      <input
        type="radio"
        id={idRef.current}
        name={name}
        checked={checked}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        aria-describedby={helperText && helpTooltipId(idRef.current)}
        {...errorProps}
      />
      <span className={styles.checkmark} />
      {helperText && <Help parentId={idRef.current} helperText={helperText} />}
    </label>
  )
}
