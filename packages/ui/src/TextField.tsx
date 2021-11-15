// https://zeroheight.com/11d0e6dac/p/316944-text-field
import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactElement,
  MouseEvent,
  Ref,
  forwardRef,
  useRef,
} from 'react'
import cn from 'classnames'
import { DataTestProp, triggerNativeInputChange } from '@hazelcast/helpers'
import { Icon as IconType, X } from 'react-feather'
import { useUID } from 'react-uid'
import mergeRefs from 'react-merge-refs'

import { Icon } from './Icon'
import { Error, errorId } from './Error'
import { FieldHeader, FieldHeaderProps } from './FieldHeader'
import { helpTooltipId } from './Help'
import { IconButton } from './IconButton'
import { IconSize } from './Icon'

import styles from './TextField.module.scss'

export type TextFieldSize = 'medium' | 'small'

type TextFieldTrailingIcon =
  | {
      inputTrailingIcon: IconType
      inputTrailingIconLabel: string
    }
  | {
      inputTrailingIcon?: never
      inputTrailingIconLabel?: never
    }

export type TextFieldTypes = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | undefined

type TextFieldCoreProps<T extends TextFieldTypes> = {
  name: string
  value?: T extends 'number' ? number : string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  error?: string
}
export type TextFieldExtraProps<T extends TextFieldTypes> = {
  size?: TextFieldSize
  iconSize?: IconSize
  className?: string
  inputContainerClassName?: string
  inputClassName?: string
  errorClassName?: string
  inputContainerChild?: ReactElement
  inputIcon?: IconType
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
  type?: T
  readOnly?: boolean
  clearable?: boolean
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'autoFocus' | 'disabled' | 'autoComplete' | 'required' | 'placeholder'> &
  TextFieldTrailingIcon &
  Omit<FieldHeaderProps, 'id'>

export type TextFieldProps<T extends TextFieldTypes> = TextFieldCoreProps<T> & TextFieldExtraProps<T>

/**
 * ### Purpose
 * Forms require input from users. When you only need basic information, use text fields to gather exactly what you need.
 * Text fields accept several types of data and can impose various restrictions to ensure you get what you need from users. And help and error guidance to ensure they know what to enter.
 *
 * ### General Info
 * - Text Field is available in 2 variations: `small` (height of 30 px) and `medium` (height of 40 px). The use depends mainly on the space in UI.
 * - All of the variations can be either with the label, or without label.
 * - Standard label alignment is left-aligned with the field underneath.
 * - Mostly all of the fields are required. If some of them are not, use text "Optional" behind the label.
 * - If needed, you can use icon on the left side or on the right side inside the Text Input (e.g. Eye icon to show / hide password).
 *
 * ### Usage
 * Use a text input when the expected user input is a single line of text.
 */
const TextFieldInternal = <T extends TextFieldTypes>(props: TextFieldProps<T>, ref?: Ref<HTMLInputElement>) => {
  const {
    'data-test': dataTest,
    className,
    disabled,
    error,
    errorClassName,
    helperText,
    id: explicitId,
    inputClassName,
    inputContainerChild,
    inputContainerClassName,
    inputIcon,
    inputTrailingIcon,
    inputTrailingIconLabel,
    label,
    labelClassName,
    showAriaLabel = false,
    name,
    size = 'medium',
    onBlur,
    onChange,
    onKeyPress,
    placeholder,
    required,
    type = 'text',
    value,
    readOnly,
    onClick,
    clearable,
    iconSize = size,
    ...htmlAttrs
  } = props
  const autoId = useUID()
  const id = explicitId ?? autoId
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isNotEmpty = value !== undefined && (typeof value === 'string' ? value.length > 0 : true)
  const mergedRef = ref ? mergeRefs([ref, inputRef]) : inputRef

  const handleClear = () => {
    if (inputRef.current) {
      triggerNativeInputChange('', inputRef.current)
    }
  }

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        {
          [styles.withError]: 'error' in props,
          [styles.small]: size === 'small',
          [styles.disabled]: disabled,
          [styles.hasError]: error,
          [styles.withIcon]: inputIcon,
          [styles.empty]: value === undefined,
        },
        className,
      )}
    >
      <FieldHeader
        id={id}
        size={size}
        label={label}
        helperText={helperText}
        showAriaLabel={showAriaLabel}
        labelClassName={labelClassName}
      />
      <div className={styles.inputBlock}>
        <div className={cn(styles.inputContainer, inputContainerClassName)}>
          <input
            type={type}
            id={id}
            ref={mergedRef}
            value={value ?? ''}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={readOnly}
            onKeyPress={onKeyPress}
            onClick={onClick}
            aria-label={showAriaLabel ? label : undefined}
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={helperText && helpTooltipId(id)}
            aria-errormessage={error && errorId(id)}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(inputClassName, {
              [styles.trailingIcon]: inputTrailingIcon,
            })}
            {...htmlAttrs}
          />
          <div className={styles.borderOverlay} />
          {inputIcon && (
            <Icon
              icon={inputIcon}
              ariaLabel={label}
              containerClassName={cn(styles.inputIconContainer, styles.inputLeftIconContainer)}
              className={styles.inputIcon}
              size="small"
            />
          )}
          {clearable && !disabled && isNotEmpty && (
            <IconButton
              icon={X}
              size={size}
              ariaLabel="Clear field"
              onClick={handleClear}
              className={styles.clearButton}
              data-test={dataTest ? `${dataTest}-clear` : undefined}
            />
          )}
          {inputContainerChild}
          {inputTrailingIcon && inputTrailingIconLabel && (
            <Icon
              icon={inputTrailingIcon}
              ariaLabel={inputTrailingIconLabel}
              containerClassName={cn(styles.inputIconContainer, styles.inputTrailingIconContainer)}
              className={styles.inputIconTrailing}
              size={iconSize}
            />
          )}
        </div>
      </div>
      <Error truncated error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}

const TextFieldWithRef = forwardRef(TextFieldInternal)

export const TextField = <T extends TextFieldTypes>({ mRef, ...props }: TextFieldProps<T> & { mRef?: Ref<HTMLInputElement> }) => (
  <TextFieldWithRef ref={mRef} {...props} />
)
