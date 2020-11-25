import React, { ChangeEvent, FC, FocusEvent, ReactElement, useLayoutEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'
import useResizeAware from 'react-resize-aware'
import { DataTestProp } from '@hazelcast/helpers'

import { Error, errorId } from './Error'
import { Help } from './Help'
import { Label } from './Label'
import { PopperRef } from './Tooltip'

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
} & Partial<Pick<HTMLTextAreaElement, 'className' | 'disabled' | 'placeholder' | 'required' | 'rows'>>

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

  const popperRef = useRef<PopperRef>()
  const [resizeListener, sizes] = useResizeAware()

  useLayoutEffect(() => {
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
      <Label id={idRef.current} label={label} />
      <div className={styles.textAreaContainer}>
        <div className={styles.textAreaWrapper}>
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
          <div className={styles.borderOverlay} />
          {helperText && resizeListener}
        </div>
        {helperText && (
          <Help
            data-test="textarea-helperText"
            parentId={idRef.current}
            helperText={helperText}
            className={styles.helperText}
            popperRef={popperRef}
          />
        )}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
