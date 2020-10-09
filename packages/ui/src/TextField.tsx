// https://zeroheight.com/11d0e6dac/p/316944-text-field
import React, { FC, ChangeEvent, ReactElement, InputHTMLAttributes, useRef, FocusEvent } from 'react'
import cn from 'classnames'
import { DataTestProp } from 'core/types'
import { pseudoUniqueID } from 'core/helpers/id'

import { Label } from './Label'
import { Error } from './Error'

import styles from './TextField.module.scss'
import { tooltipId } from '../Help'

const textFieldHeights = {
  small: styles.small,
  normal: styles.normal,
  large: styles.large,
}

type TextFieldCoreProps = {
  name: string
  value?: string
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}
export type TextFieldExtraProps = {
  label?: string | ReactElement
  required?: boolean
  helperText?: string | ReactElement
  height?: keyof typeof textFieldHeights
  inputOverlay?: ReactElement
  className?: string
  inputClassName?: string
  errorClassName?: string
  placeholder: string
  inputContainerChild?: ReactElement
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
  height = 'normal',
  'data-test': dataTest,
  type = 'text',
  className,
  inputClassName,
  errorClassName,
  disabled,
  placeholder,
  inputContainerChild,
  ...htmlAttrs
}) => {
  const idRef = useRef(pseudoUniqueID())

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        textFieldHeights[height],
        {
          [styles.disabled]: disabled,
          [styles.hasError]: error,
        },
        className,
      )}
    >
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <Label id={idRef.current} label={label} helperText={helperText} required={required} />
      )}
      <div className={cn(styles.inputContainer, inputClassName)}>
        <input
          type={type}
          id={idRef.current}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          aria-label={!label ? placeholder : undefined}
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={helperText && tooltipId(idRef.current)}
          disabled={disabled}
          placeholder={placeholder}
          {...htmlAttrs}
        />
        {inputContainerChild}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} />
    </div>
  )
}
