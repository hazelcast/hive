import React, { ChangeEvent, FC, FocusEvent, ReactElement, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'

import { DataTestProp } from '@hazelcast/helpers'
import { HiddenLabel } from '../src/HiddenLabel'
import { Error, errorId } from '../src'

import styles from './TextArea.module.scss'

export type TextAreaCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
}

export type TextAreaExtraProps = {
  label: string
  inputClassName?: string
  errorClassName?: string
  inputContainerChild?: ReactElement
} & Partial<Pick<HTMLTextAreaElement, 'className' | 'defaultValue' | 'disabled' | 'placeholder' | 'required' | 'readOnly'>>

export type TextAreaProps = TextAreaCoreProps & TextAreaExtraProps & DataTestProp

export const TextArea: FC<TextAreaProps> = ({
  className,
  error,
  inputClassName,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
  defaultValue,
  disabled,
  errorClassName,
  readOnly,
  required,
  'data-test': dataTest,
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
      <HiddenLabel id={idRef.current} label={label} />
      <textarea
        aria-invalid={!!error}
        aria-required={required}
        aria-errormessage={error && errorId(idRef.current)}
        id={idRef.current}
        className={inputClassName}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        defaultValue={defaultValue}
        readOnly={readOnly}
        required={required}
        value={value}
        {...htmlAttrs}
      />
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
