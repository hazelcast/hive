import { DataTestProp } from '@hazelcast/helpers'
import React, { FC, FocusEvent, ChangeEvent, ReactElement, InputHTMLAttributes, useCallback, useLayoutEffect, useMemo } from 'react'
import { Plus, Minus } from 'react-feather'
import cn from 'classnames'

import { TextField } from './TextField'
import { IconButton } from './IconButton'

import styles from './NumberField.module.scss'

type NumberFieldCoreProps = {
  name: string
  value: number
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (newValue: number) => void
  error?: string
}
export type NumberFieldExtraProps = {
  incrementIconAriaLabel?: string
  decrementIconAriaLabel?: string
  step?: number
  min?: number
  max?: number
  numberType?: 'int' | 'float'
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
  step = 1,
  min,
  max,
  value,
  numberType = 'int',
  className,
  onChange,
  name,
  ...props
}) => {
  useLayoutEffect(() => {
    if (min !== undefined && value < min) {
      onChange(min)
    }
    if (max !== undefined && value > max) {
      onChange(max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max])

  const onDecrement = useCallback(() => {
    let newValue = value - step
    if (min !== undefined && newValue < min) {
      newValue = min
    }
    onChange(newValue)
  }, [value, onChange, step, min])

  const onIncrement = useCallback(() => {
    let newValue = value + step
    if (max !== undefined && newValue > max) {
      newValue = max
    }
    onChange(newValue)
  }, [value, onChange, step, max])

  const overlay = useMemo(
    () => (
      <>
        <IconButton
          size="small"
          icon={Minus}
          iconAriaLabel={decrementIconAriaLabel}
          className={styles.decrement}
          onClick={onDecrement}
          disabled={min !== undefined && value <= min}
          kind="primary"
          data-test="number-field-decrement"
        />
        <IconButton
          size="small"
          icon={Plus}
          iconAriaLabel={incrementIconAriaLabel}
          className={styles.increment}
          onClick={onIncrement}
          disabled={max !== undefined && value >= max}
          kind="primary"
          data-test="number-field-increment"
        />
      </>
    ),
    [onIncrement, onDecrement, decrementIconAriaLabel, incrementIconAriaLabel, min, max, value],
  )

  const onChangeWrapped = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(numberType === 'int' ? parseInt(e.target.value, 10) : parseFloat(e.target.value))
    },
    [onChange, numberType],
  )

  return (
    <TextField
      {...props}
      name={name}
      value={value}
      onChange={onChangeWrapped}
      type="number"
      inputContainerChild={overlay}
      inputClassName={cn(styles.inputContainer, className)}
    />
  )
}
