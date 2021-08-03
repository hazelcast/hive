import React, { ChangeEvent, FC, FocusEvent, useRef } from 'react'
import cn from 'classnames'
import useResizeAware from 'react-resize-aware'
import { DataTestProp } from '@hazelcast/helpers'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { Error, errorId } from './Error'
import { FieldHeader, FieldHeaderProps } from './FieldHeader'
import { PopperRef } from './Tooltip'

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

export const TextArea: FC<TextAreaProps> = ({
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
  'data-test': dataTest,
  ...htmlAttrs
}) => {
  const id = useUID()

  const popperRef = useRef<PopperRef>()
  const [resizeListener, sizes] = useResizeAware()

  useIsomorphicLayoutEffect(() => {
    if (sizes.height) {
      popperRef.current?.forceUpdate?.()
    }
  }, [sizes.height])

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        {
          [styles.disabled]: disabled,
          [styles.hasError]: error,
        },
        className,
      )}
    >
      <FieldHeader data-test="textarea" label={label} id={id} helperText={helperText} labelClassName={labelClassName} size={size} />
      <div className={styles.textAreaContainer}>
        <div className={styles.textAreaWrapper}>
          <textarea
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
          {helperText && resizeListener}
        </div>
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
