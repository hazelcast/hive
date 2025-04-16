import React, { ChangeEvent, FC, FocusEvent, useRef } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { DataTestProp } from '../helpers/types'
import { Error, errorId } from './Error'
import { FieldHeader, FieldHeaderProps } from './FieldHeader'
import { PopperRef } from './Tooltip'
import { useResizeAware } from '../hooks/useResizeAware'

import styles from './TextArea.module.scss'

export type TextAreaSize = 'medium' | 'small'

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
    size = 'medium',
    'data-test': dataTest = 'textarea',
    ...htmlAttrs
  } = props
  const id = useUID()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const popperRef = useRef<PopperRef>()
  useResizeAware(textareaRef.current, () => {
    popperRef.current?.forceUpdate?.()
  })

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
      <FieldHeader data-test={dataTest} label={label} id={id} helperText={helperText} labelClassName={labelClassName} size={size} />
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
