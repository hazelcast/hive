// https://zeroheight.com/11d0e6dac/p/316944-text-field
import React, { FC, ChangeEvent, ReactElement, InputHTMLAttributes, useRef, FocusEvent } from 'react'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { v4 as uuid } from 'uuid'
import { Icon as IconType } from 'react-feather'

import { Icon } from './Icon'
import { HiddenLabel } from './HiddenLabel'
import { Error, errorId } from './Error'
import { Help, helpTooltipId } from './Help'

import styles from './TextField.module.scss'

type TextFieldCoreProps = {
  name: string
  value?: string
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}
export type TextFieldExtraProps = {
  label: string
  required?: boolean
  helperText?: string | ReactElement
  inputOverlay?: ReactElement
  className?: string
  inputClassName?: string
  errorClassName?: string
  placeholder: string
  inputContainerChild?: ReactElement
  inputIcon?: IconType
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'disabled' | 'autoComplete' | 'type'>

type TextFieldProps = TextFieldCoreProps & TextFieldExtraProps

/**
 * ### Purpose
 * Forms require input from users. When you only need basic information, use text fields to gather exactly what you need.
 * Text fields accept several types of data and can impose various restrictions to ensure you get what you need from users. And help and error guidance to ensure they know what to enter.
 *
 * ### General Info
 * - Text Field is available in 3 variations: Small (height of 24 px), Normal (height of 32 px) and Large (height of 40 px). The use depends mainly on the space in UI.
 * - All of the variations can be either with the label, or without label.
 * - Standard label alignment is left-aligned with the field underneath.
 * - For the placeholder text, use sentence case and left-align.
 * - Mostly all of the fields are required. If some of them are not, use text "Optional" behind the label.
 * - If there is helper needed for the label, use Help icon behind the label. After clicking on the Help icon, tooltip will be shown.
 * - If needed, you can use icon on the right side inside the Text Input (e.g. Eye icon to show / hide password).
 *
 * ### Usage
 * Use a text input when the expected user input is a single line of text.
 */
export const TextField: FC<TextFieldProps> = ({
  name,
  value,
  label,
  onBlur,
  onChange,
  required,
  helperText,
  error,
  'data-test': dataTest,
  type = 'text',
  className,
  inputClassName,
  errorClassName,
  disabled,
  placeholder,
  inputContainerChild,
  inputIcon,
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
          [styles.withIcon]: inputIcon,
          [styles.empty]: !value,
        },
        className,
      )}
    >
      <div className={styles.inputBlock}>
        <HiddenLabel id={idRef.current} label={label} />
        <div className={cn(styles.inputContainer, inputClassName)}>
          <input
            type={type}
            id={idRef.current}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={helperText && helpTooltipId(idRef.current)}
            aria-errormessage={error && errorId(idRef.current)}
            disabled={disabled}
            placeholder={placeholder}
            {...htmlAttrs}
          />
          {inputIcon && <Icon icon={inputIcon} ariaLabel={label} className={styles.inputIcon} />}
          {inputContainerChild}
        </div>
        {helperText && <Help parentId={idRef.current} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
