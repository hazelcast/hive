import { DataTestProp } from '@hazelcast/helpers'
import React, {
  FC,
  FocusEvent,
  ChangeEvent,
  ReactElement,
  InputHTMLAttributes,
  useMemo,
  useState,
  useImperativeHandle,
  Dispatch,
  SetStateAction,
  Ref,
} from 'react'
import { Eye, EyeOff } from 'react-feather'
import cn from 'classnames'

import { TextField } from './TextField'
import { IconButton } from './IconButton'

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
  required?: boolean
  helperText?: string | ReactElement
  className?: string
  inputClassName?: string
  errorClassName?: string
  placeholder?: string
  visibleRef?: Ref<VisibleRef>
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'disabled' | 'autoComplete'>
type PasswordFieldProps = PasswordFieldCoreProps & PasswordFieldExtraProps

export type VisibleRef = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

export const PasswordField: FC<PasswordFieldProps> = ({
  showIconLabel = 'Show password',
  hideIconLabel = 'Hide password',
  inputClassName,
  disabled,
  visibleRef,
  ...props
}) => {
  const [visible, setVisible] = useState(false)

  const overlay = useMemo(
    () => (
      <IconButton
        size="small"
        icon={visible ? EyeOff : Eye}
        iconAriaLabel={visible ? hideIconLabel : showIconLabel}
        className={styles.toggle}
        onClick={() => setVisible((prev) => !prev)}
        disabled={disabled}
        kind="primary"
        data-test="password-field-toggle"
        type="button"
      />
    ),
    [visible, hideIconLabel, showIconLabel, disabled],
  )

  useImperativeHandle(
    visibleRef,
    () => ({
      visible,
      setVisible,
    }),
    [visible, setVisible],
  )

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      inputContainerChild={overlay}
      inputClassName={cn(styles.inputContainer, inputClassName)}
      disabled={disabled}
    />
  )
}
