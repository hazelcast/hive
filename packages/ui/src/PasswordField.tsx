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
import { Eye, EyeOff, Lock } from 'react-feather'

import { TextField } from './TextField'
import { IconButton, IconButtonDisabledProps, IconButtonNotDisabledProps } from './IconButton'

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
  helperText?: string | ReactElement
  labelClassName?: string
  className?: string
  inputClassName?: string
  errorClassName?: string
  withIcon?: boolean
  visibleRef?: Ref<VisibleRef>
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'autoFocus' | 'disabled' | 'autoComplete' | 'required' | 'placeholder'>
type PasswordFieldProps = PasswordFieldCoreProps & PasswordFieldExtraProps

export type VisibleRef = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

export const PasswordField: FC<PasswordFieldProps> = ({
  showIconLabel = 'Show password',
  hideIconLabel = 'Hide password',
  inputClassName,
  withIcon,
  disabled,
  visibleRef,
  ...props
}) => {
  const [visible, setVisible] = useState(false)

  const overlay = useMemo(() => {
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
        data-test="password-field-toggle"
        type="button"
        {...disabledProps}
      />
    )
  }, [visible, hideIconLabel, showIconLabel, disabled])

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
      inputContainerClassName={styles.inputContainer}
      inputClassName={inputClassName}
      inputIcon={withIcon ? Lock : undefined}
      disabled={disabled}
    />
  )
}
