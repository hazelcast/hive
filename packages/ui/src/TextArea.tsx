import React, { ChangeEvent, FC, FocusEvent, ReactElement, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'

import { DataTestProp } from '@hazelcast/helpers'
import { Error, errorId } from '../src/Error'
import { Help } from '../src/Help'
import { Label } from './Label'

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
  helperText?: string | ReactElement
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
  helperText,
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
      <Label id={idRef.current} label={label} />
      <div className={styles.textAreaContainer}>
        <div className={styles.textAreaWrapper}>
          <div className={styles.focusOverlay} />
          <textarea
            aria-invalid={!!error}
            aria-required={required}
            aria-errormessage={error && errorId(idRef.current)}
            id={idRef.current}
            className={cn(
              {
                [styles.notResizable]: !resizable,
              },
              textareaClassName,
            )}
            placeholder={placeholder}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            required={required}
            value={value}
            disabled={disabled}
            {...htmlAttrs}
          />
        </div>
        {helperText && (
          <Help data-test="textarea-helperText" parentId={idRef.current} helperText={helperText} className={styles.helperText} />
        )}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
