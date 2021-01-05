import { DataTestProp } from '@hazelcast/helpers'
import React, { FC, FocusEvent, ChangeEvent, ReactElement, InputHTMLAttributes, useCallback, useMemo } from 'react'
import { Plus, Minus } from 'react-feather'
import cn from 'classnames'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'

import { TextField } from './TextField'
import { IconButton } from './IconButton'

import styles from './NumberField.module.scss'

type NumberFieldCoreProps = {
  name: string
  value?: number
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (newValue?: number) => void
  error?: string
}

export type NumberFieldExtraProps = {
  incrementIconAriaLabel?: string
  decrementIconAriaLabel?: string
  step?: number
  min?: number
  max?: number
  defaultValue?: number
  numberType?: 'int' | 'float'
  label: string
  helperText?: string | ReactElement
  className?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'disabled' | 'autoComplete' | 'required' | 'placeholder'>
type NumberFieldProps = NumberFieldCoreProps & NumberFieldExtraProps

export const NumberField: FC<NumberFieldProps> = ({
  incrementIconAriaLabel = 'Increment',
  decrementIconAriaLabel = 'Decrement',
  step = 1,
  min,
  max,
  value,
  numberType = 'int',
  inputClassName,
  onChange,
  disabled,
  ...props
}) => {
  useIsomorphicLayoutEffect(() => {
    if (min !== undefined && value !== undefined && value < min) {
      onChange(min)
    }
    if (max !== undefined && value !== undefined && value > max) {
      onChange(max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max])

  const onDecrement = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let newValue = value! - step
    if (min !== undefined && newValue < min) {
      newValue = min
    }
    onChange(newValue)
  }, [value, onChange, step, min])

  const onIncrement = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let newValue = value! + step
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
          ariaLabel={decrementIconAriaLabel}
          className={styles.decrement}
          onClick={onDecrement}
          disabled={disabled || value === undefined || (min !== undefined && value <= min)}
          kind="primary"
          data-test="number-field-decrement"
          type="button"
        />
        <IconButton
          size="small"
          icon={Plus}
          ariaLabel={incrementIconAriaLabel}
          className={styles.increment}
          onClick={onIncrement}
          disabled={disabled || value === undefined || (max !== undefined && value >= max)}
          kind="primary"
          data-test="number-field-increment"
          type="button"
        />
      </>
    ),
    [onIncrement, onDecrement, decrementIconAriaLabel, incrementIconAriaLabel, min, max, value, disabled],
  )

  const onChangeWrapped = useCallback(
    ({ target: { value: newValue } }: ChangeEvent<HTMLInputElement>) => {
      let newValueParsed: number | undefined
      if (newValue !== '') {
        newValueParsed = numberType === 'int' ? parseInt(newValue, 10) : parseFloat(newValue)
      }

      if (min !== undefined && newValueParsed !== undefined && newValueParsed < min) {
        newValueParsed = min
      }
      if (max !== undefined && newValueParsed !== undefined && newValueParsed > max) {
        newValueParsed = max
      }

      onChange(newValueParsed)
    },
    [onChange, numberType, min, max],
  )

  return (
    <TextField
      {...props}
      value={value}
      onChange={onChangeWrapped}
      type="number"
      inputContainerChild={overlay}
      inputClassName={cn(styles.inputContainer, inputClassName)}
      disabled={disabled}
    />
  )
}
