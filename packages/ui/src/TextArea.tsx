import React, { ChangeEvent, FC, FocusEvent, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'

import { DataTestProp } from '@hazelcast/helpers'
import { HiddenLabel } from '../src/HiddenLabel'
import { Error, errorId } from '../src/Error'

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
  textareaClassName?: string
  errorClassName?: string
  resizable?: boolean
} & Partial<Pick<HTMLTextAreaElement, 'className' | 'disabled' | 'placeholder' | 'required'>>

export type TextAreaProps = TextAreaCoreProps & TextAreaExtraProps & DataTestProp

export const TextArea: FC<TextAreaProps> = ({
  className,
  error,
  textareaClassName,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
  disabled,
  errorClassName,
  required,
  resizable = true,
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
        className={cn(textareaClassName, {
          [styles.notResizable]: !resizable,
        })}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        value={value}
        disabled={disabled}
        {...htmlAttrs}
      />
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
