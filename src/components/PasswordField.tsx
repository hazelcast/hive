import React, { FC, FocusEvent, ChangeEvent, InputHTMLAttributes, useMemo, useState } from 'react'
import { Eye, EyeOff, Lock } from 'react-feather'
import cls from 'classnames'

import { DataTestProp } from '../helpers/types'
import { TextField, TextFieldSize, TextFieldVariant } from './TextField'
import { IconButton, IconButtonDisabledProps, IconButtonNotDisabledProps } from './IconButton'
import { HelpProps } from './Help'

import styles from './PasswordField.module.scss'

type PasswordFieldCoreProps = {
  name: string
  value?: string
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}
export type PasswordFieldExtraProps = {
  showIconLabel?: string
  hideIconLabel?: string
  label: string
  helperText?: HelpProps['helperText']
  size?: TextFieldSize
  variant?: TextFieldVariant
  labelClassName?: string
  className?: string
  inputClassName?: string
  errorClassName?: string
  withIcon?: boolean
  initiallyVisible?: boolean
  hideToggle?: boolean
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'autoFocus' | 'disabled' | 'autoComplete' | 'required' | 'placeholder'>
export type PasswordFieldProps = PasswordFieldCoreProps & PasswordFieldExtraProps

export const PasswordField: FC<PasswordFieldProps> = ({
  showIconLabel = 'Show password',
  hideIconLabel = 'Hide password',
  inputClassName,
  withIcon,
  disabled,
  initiallyVisible = false,
  hideToggle = false,
  'data-test': dataTest = 'password-field',
  ...props
}) => {
  const [visible, setVisible] = useState(initiallyVisible)

  const overlay = useMemo(() => {
    if (hideToggle) {
      return undefined
    }

    let disabledProps: IconButtonDisabledProps | IconButtonNotDisabledProps = {}
    if (disabled) {
      // The IconButton is disabled only when the entire input is disabled. No need for a tooltip.
      disabledProps = {
        disabled: true,
        disabledTooltip: '',
        disabledTooltipVisible: false,
      }
    }

    return (
      <IconButton
        size="small"
        icon={visible ? EyeOff : Eye}
        ariaLabel={visible ? hideIconLabel : showIconLabel}
        className={styles.toggle}
        onClick={() => setVisible((prev) => !prev)}
        kind="primary"
        data-test={`${dataTest}-toggle`}
        type="button"
        {...disabledProps}
      />
    )
  }, [visible, dataTest, hideToggle, hideIconLabel, showIconLabel, disabled])

  return (
    <TextField
      {...props}
      data-test={dataTest}
      type={visible ? 'text' : 'password'}
      inputContainerChild={overlay}
      inputContainerClassName={cls(styles.inputContainer, { [styles.withoutToggle]: hideToggle })}
      inputClassName={inputClassName}
      inputIcon={withIcon ? Lock : undefined}
      disabled={disabled}
    />
  )
}
