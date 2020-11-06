import { DataTestProp } from '@hazelcast/helpers'
import React, { FC, FocusEvent, ChangeEvent, ReactElement, InputHTMLAttributes } from 'react'
import { Plus, Minus } from 'react-feather'
import cn from 'classnames'

import { TextField } from './TextField'
import { IconButton } from './IconButton'

import styles from './NumberField.module.scss'

type NumberFieldCoreProps = {
  name: string
  value?: number
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}
export type NumberFieldExtraProps = {
  incrementIconAriaLabel?: string
  decrementIconAriaLabel?: string
  onIncrement?: () => void
  onDecrement?: () => void
  label: string
  required?: boolean
  helperText?: string | ReactElement
  className?: string
  inputClassName?: string
  errorClassName?: string
  placeholder: string
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'disabled' | 'autoComplete'>
type NumberFieldProps = NumberFieldCoreProps & NumberFieldExtraProps

export const NumberField: FC<NumberFieldProps> = ({
  incrementIconAriaLabel = 'Increment',
  decrementIconAriaLabel = 'Decrement',
  onIncrement,
  onDecrement,
  className,
  ...props
}) => {
  const overlay = (
    <>
      <IconButton
        size="small"
        icon={Minus}
        iconAriaLabel={decrementIconAriaLabel}
        className={styles.decrement}
        onClick={onDecrement}
        disabled={!onDecrement}
        kind="primary"
      />
      <IconButton
        size="small"
        icon={Plus}
        iconAriaLabel={incrementIconAriaLabel}
        className={styles.increment}
        onClick={onIncrement}
        disabled={!onIncrement}
        kind="primary"
      />
    </>
  )

  return <TextField {...props} type="number" inputContainerChild={overlay} inputClassName={cn(styles.inputContainer, className)} />
}
