import React, { ChangeEvent, FC, FocusEvent, useRef } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { DataTestProp } from '../helpers/types'
import { Error, errorId } from './Error'
import { FieldHeader, FieldHeaderProps } from './FieldHeader'

import styles from './TextArea.module.css'

export type TextAreaSize = 'small' | 'medium' | 'regular'

export type TextAreaCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
}

export type TextAreaExtraProps = {
  textareaClassName?: string
  errorClassName?: string
  resizable?: boolean
  /** @deprecated Size is deprecated in v4 and ignored. TextArea always renders in regular (former small) size. */
  size?: TextAreaSize
} & Partial<Pick<HTMLTextAreaElement, 'className' | 'disabled' | 'placeholder' | 'required' | 'rows'>> &
  Omit<FieldHeaderProps, 'id'>

export type TextAreaProps = TextAreaCoreProps & TextAreaExtraProps & DataTestProp

export const TextArea: FC<TextAreaProps> = (props) => {
  const {
    error,
    label,
    name,
    onBlur,
    onChange,
    placeholder,
    value,
    disabled,
    className,
    labelClassName,
    textareaClassName,
    errorClassName,
    required,
    resizable = true,
    helperText,
    size = 'regular',
    'data-test': dataTest = 'textarea',
    ...htmlAttrs
  } = props
  const id = useUID()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const resolvedSize: TextAreaSize = size === 'small' || size === 'medium' ? 'regular' : 'regular'

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        {
          [styles.disabled]: disabled,
          [styles.hasError]: error,
          [styles.withError]: 'error' in props,
        },
        className,
      )}
    >
      <FieldHeader data-test={dataTest} label={label} id={id} helperText={helperText} labelClassName={labelClassName} size={resolvedSize} />
      <div className={styles.textAreaContainer}>
        <div className={styles.textAreaWrapper}>
          <textarea
            ref={textareaRef}
            aria-invalid={!!error}
            aria-required={required}
            aria-errormessage={error && errorId(id)}
            id={id}
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
            value={value ?? ''}
            disabled={disabled}
            {...htmlAttrs}
          />
          <div className={styles.borderOverlay} />
        </div>
      </div>
      <Error data-test={`${dataTest}-error`} truncated error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
