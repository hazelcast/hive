import React, { ChangeEvent, FocusEvent, ReactElement, ReactText, useRef, MouseEvent, forwardRef } from 'react'
import { Check, Minus } from 'react-feather'
import { DataTestProp } from '@hazelcast/helpers'
import { useUID } from 'react-uid'
import classNames from 'classnames'

import { Error, errorId } from './Error'
import { Help, HelpProps, helpTooltipId } from './Help'

import styles from './Checkbox.module.scss'
import { TruncatedText } from './TruncatedText'

type CheckboxCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  error?: string
  checked?: boolean
}

export type CheckboxExtraProps = {
  label?: ReactElement | ReactText
  helperText?: HelpProps['helperText']
  indeterminate?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
  classNameLabel?: string
  classNameCheckmark?: string
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
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => {
  const {
    checked,
    name,
    onChange,
    onBlur,
    className,
    classNameLabel,
    classNameCheckmark,
    value,
    indeterminate = false,
    label,
    helperText,
    error,
    disabled = false,
    required,
    'data-test': dataTest,
    onClick,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useUID()

  return (
    <div ref={ref} className={classNames(className, { [styles.withError]: 'error' in props })} data-test={dataTest}>
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
            [styles.indeterminate]: indeterminate,
          },
          classNameLabel,
        )}
        htmlFor={id}
      >
        {label !== undefined && (
          <div className={styles.name} data-test="input-checkbox-label">
            <TruncatedText text={label} />
          </div>
        )}
        <input
          type="checkbox"
          ref={inputRef}
          id={id}
          name={name}
          checked={!!checked}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={helperText && helpTooltipId(id)}
          aria-errormessage={error && errorId(id)}
        />
        {indeterminate ? (
          <Minus className={classNames(styles.checkmark, classNameCheckmark)} />
        ) : (
          <Check className={classNames(styles.checkmark, classNameCheckmark)} />
        )}
        {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
      </label>
      <Error truncated error={error} className={styles.errorContainer} inputId={id} />
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
