import React, { ChangeEvent, FC, FocusEvent, useRef } from 'react'
import cn from 'classnames'
import useResizeAware from 'react-resize-aware'
import { DataTestProp } from '@hazelcast/helpers'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { Error, errorId } from './Error'
import { Help, HelpProps } from './Help'
import { Label } from './Label'
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
  label: string
  labelClassName?: string
  textareaClassName?: string
  errorClassName?: string
  resizable?: boolean
  helperText?: HelpProps['helperText']
  size?: TextAreaSize
} & Partial<Pick<HTMLTextAreaElement, 'className' | 'disabled' | 'placeholder' | 'required' | 'rows'>>

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
      <Label id={id} label={label} className={cn(styles.label, { [styles.small]: size === 'small' }, labelClassName)} />
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
        {helperText && (
          <Help data-test="textarea-helperText" parentId={id} helperText={helperText} className={styles.helperText} popperRef={popperRef} />
        )}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
