import { DataTestProp } from '@hazelcast/helpers'
import React, { FC, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'

import { Error, errorId } from './Error'
import { Label } from './Label'

import styles from './Select.module.scss'

export type SelectExtraProps = {
  name: string
  error?: string
  label: string
  className?: string
  selectClassName?: string
  errorClassName?: string
  required?: boolean
} & DataTestProp

export type SelectProps = Exclude<ReactSelectProps, 'isDisabled'> & SelectExtraProps

export const Select: FC<SelectProps> = ({
  'data-test': dataTest,
  className,
  error,
  errorClassName,
  isClearable = false,
  isDisabled,
  isMulti = false,
  isSearchable = false,
  label,
  name,
  required,
  selectClassName,
  value,
  ...rest
}) => {
  const idRef = useRef(uuid())

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        {
          [styles.disabled]: isDisabled,
          [styles.hasError]: error,
          [styles.empty]: !value,
        },
        className,
      )}
    >
      <Label id={idRef.current} label={label} />
      <ReactSelect
        inputId={idRef.current}
        className={selectClassName}
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
        aria-errormessage={error && errorId(idRef.current)}
        aria-invalid={!!error}
        aria-required={required}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isSearchable={isSearchable}
        name={name}
        value={value}
        {...rest}
      />
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
