import React, { ChangeEvent, FC, FocusEvent, useEffect, useRef } from 'react'
import styles from './Checkbox.module.scss'
import { Check, Minus } from 'react-feather'
import { DataTestProp } from '@hazelcast/helpers'

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
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
}

type CheckboxProps = CheckboxCoreProps & CheckboxExtraProps & DataTestProp

export const Checkbox: FC<CheckboxProps> = ({
  id,
  checked,
  name,
  onChange,
  onBlur,
  onFocus,
  readOnly = false,
  value,
  indeterminate = false,
  label,
  description,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate, inputRef])

  return (
    <label className={styles.wrapper} htmlFor={id}>
      <span>{label}</span>
      {description}
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        ref={inputRef}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly={readOnly}
        value={value}
      />
      {indeterminate ? <Minus className={styles.checkmark} /> : <Check className={styles.checkmark} />}
    </label>
  )
}
