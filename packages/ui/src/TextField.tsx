// https://zeroheight.com/11d0e6dac/p/316944-text-field
import React, { ChangeEvent, ReactElement, InputHTMLAttributes, FocusEvent } from 'react'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { Icon as IconType } from 'react-feather'
import { useUID } from 'react-uid'

import { Icon } from './Icon'
import { Label } from './Label'
import { Error, errorId } from './Error'
import { Help, helpTooltipId } from './Help'

import styles from './TextField.module.scss'

export type TextFieldTypes = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | undefined

type TextFieldCoreProps<T extends TextFieldTypes> = {
  name: string
  value?: T extends 'number' ? number : string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}
export type TextFieldExtraProps<T extends TextFieldTypes> = {
  label: string
  helperText?: string | ReactElement
  className?: string
  inputContainerClassName?: string
  inputClassName?: string
  errorClassName?: string
  inputContainerChild?: ReactElement
  inputIcon?: IconType
  type?: T
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'disabled' | 'autoComplete' | 'required' | 'placeholder'>

type TextFieldProps<T extends TextFieldTypes> = TextFieldCoreProps<T> & TextFieldExtraProps<T>

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
export const TextField = <T extends TextFieldTypes>({
  name,
  value,
  label,
  onBlur,
  onChange,
  required,
  helperText,
  error,
  'data-test': dataTest,
  type,
  className,
  inputContainerClassName,
  inputClassName,
  errorClassName,
  disabled,
  placeholder,
  inputContainerChild,
  inputIcon,
  ...htmlAttrs
}: TextFieldProps<T>) => {
  const id = useUID()

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
      <Label id={id} label={label} />
      <div className={styles.inputBlock}>
        <div className={cn(styles.inputContainer, inputContainerClassName)}>
          <input
            type={type ?? 'text'}
            id={id}
            value={value ?? ''}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={helperText && helpTooltipId(id)}
            aria-errormessage={error && errorId(id)}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClassName}
            {...htmlAttrs}
          />
          <div className={styles.borderOverlay} />
          {inputIcon && (
            <Icon
              icon={inputIcon}
              ariaLabel={label}
              containerClassName={styles.inputIconContainer}
              className={styles.inputIcon}
              size="small"
            />
          )}
          {inputContainerChild}
        </div>
        {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
