import { DataTestProp } from '@hazelcast/helpers'
import React, { FC, SelectHTMLAttributes, useRef, FocusEvent, ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'
import { ChevronDown } from 'react-feather'

import { Error } from './Error'
import { Label } from './Label'
import { Icon } from './Icon'

import styles from './Select.module.scss'

export type SelectOption = Pick<HTMLOptionElement, 'value' | 'text'> & {
  disabled?: boolean
}

export type SelectCoreProps = {
  options: SelectOption[]
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  error?: string
}
export type SelectExtraProps = {
  label: string
  className?: string
  selectClassName?: string
  errorClassName?: string
} & DataTestProp &
  Pick<SelectHTMLAttributes<HTMLSelectElement>, 'autoFocus' | 'disabled' | 'required'>

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
      <div className={styles.selectContainer}>
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
        <Icon className={styles.chevron} ariaLabel="Select chevron" icon={ChevronDown} />
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}