import { DataTestProp } from '@hazelcast/helpers'
import React, { ChangeEventHandler, FC, SelectHTMLAttributes, useRef, FocusEvent } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'

import { Error } from './Error'
import { Label } from './Label'

import styles from './Select.module.scss'

type SelectOption = Pick<HTMLOptionElement, 'value' | 'text' | 'disabled'>

type SelectCoreProps = {
  options: SelectOption[]
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void
  onChange?: ChangeEventHandler
  error?: string
}
export type SelectExtraProps = {
  label: string
  className?: string
  selectClassName?: string
  errorClassName?: string
} & DataTestProp &
  Pick<SelectHTMLAttributes<HTMLSelectElement>, 'autoFocus' | 'disabled' | 'required' | 'autoComplete'>

export type SelectProps = SelectExtraProps & SelectCoreProps

export const Select: FC<SelectProps> = ({
  'data-test': dataTest,
  className,
  disabled,
  error,
  errorClassName,
  label,
  name,
  onBlur,
  onChange,
  options,
  required,
  selectClassName,
  value,
  ...htmlAttrs
}) => {
  const idRef = useRef(uuid())

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        {
          [styles.disabled]: disabled,
          [styles.hasError]: error,
          [styles.empty]: !value,
        },
        className,
      )}
    >
      <Label id={idRef.current} label={label} />
      <select
        id={idRef.current}
        disabled={disabled}
        className={selectClassName}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        value={value}
        {...htmlAttrs}
      >
        {options.map(({ value, text, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {text}
          </option>
        ))}
      </select>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
