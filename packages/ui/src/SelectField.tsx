import { DataTestProp } from '@hazelcast/helpers'
import React, { ReactElement, useRef, FocusEvent, InputHTMLAttributes } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'
import ReactSelect, { Props as ReactSelectProps, ValueType } from 'react-select'

import { Error, errorId } from './Error'
import { Label } from './Label'
import { Help } from './Help'

import styles from './SelectField.module.scss'

export type SelectFieldOption<V = string> = {
  label: string
  value: V
}

export type SelectFieldCoreStaticProps<V> = {
  name: string
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  error?: string
}
export type SelectFieldCoreDynamicProps<V> =
  | {
      isClearable: true
      value: SelectFieldOption<V> | null
      onChange: (newValue: SelectFieldOption<V> | null) => void
    }
  | {
      isClearable?: false
      value: SelectFieldOption<V>
      onChange: (newValue: SelectFieldOption<V>) => void
    }
export type SelectFieldExtraProps<V> = {
  options: SelectFieldOption<V>[]
  label: string
  required?: boolean
  helperText?: string | ReactElement
  className?: string
  selectClassName?: string
  errorClassName?: string
  placeholder?: string
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLElement>, 'autoFocus' | 'disabled' | 'autoComplete'> &
  Pick<ReactSelectProps, 'isSearchable'>

export type SelectProps<V> = SelectFieldCoreStaticProps<V> & SelectFieldCoreDynamicProps<V> & SelectFieldExtraProps<V>

export const SelectField = <V,>({
  'data-test': dataTest,
  className,
  error,
  errorClassName,
  isClearable,
  disabled,
  isSearchable = false,
  label,
  name,
  required,
  selectClassName,
  value,
  onChange,
  helperText,
  ...rest
}: SelectProps<V>): ReactElement<SelectProps<V>> => {
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
      <div className={styles.selectBlock}>
        <ReactSelect<SelectFieldOption<V>>
          inputId={idRef.current}
          className={selectClassName}
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
          aria-errormessage={error && errorId(idRef.current)}
          aria-invalid={!!error}
          aria-required={required}
          isClearable={isClearable ?? false}
          isDisabled={disabled}
          isMulti={false}
          isSearchable={isSearchable}
          name={name}
          value={value}
          onChange={onChange as (value: ValueType<SelectFieldOption<V>>) => void}
          menuPortalTarget={document.body}
          {...rest}
        />
        {helperText && <Help parentId={idRef.current} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
