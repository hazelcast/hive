import React, { FC, FocusEvent, useContext } from 'react'
import classNames from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { useUID } from 'react-uid'

import { Help, helpTooltipId } from './Help'
import { RadioGroupContext } from './RadioGroupContext'

import styles from './Radio.module.scss'

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
  const id = useUID()
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
      htmlFor={id}
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
        id={id}
        name={name}
        checked={checked}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        aria-describedby={helperText && helpTooltipId(id)}
        {...errorProps}
      />
      <span className={styles.checkmark} />
      {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
    </label>
  )
}
