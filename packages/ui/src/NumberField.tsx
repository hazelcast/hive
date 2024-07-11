import { DataTestProp } from '@hazelcast/helpers'
import React, { FC, FocusEvent, ChangeEvent, InputHTMLAttributes, useCallback, useMemo, useState } from 'react'
import { PlusCircle, MinusCircle } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import cn from 'classnames'

import { TextField, TextFieldProps, TextFieldSize } from './TextField'
import { IconButton, IconButtonDisabledProps, IconButtonNotDisabledProps } from './IconButton'

import styles from './NumberField.module.scss'

type NumberFieldCoreProps = {
  name: string
  value?: number
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (newValue?: number) => void
  error?: string
}

export type NumberFieldExtraProps = Omit<TextFieldProps<'number'>, 'onChange' | 'inputTrailingIcon' | 'inputTrailingIconLabel'> & {
  incrementIconAriaLabel?: string
  decrementIconAriaLabel?: string
  step?: number
  min?: number
  max?: number
  defaultValue?: number
  numberType?: 'int' | 'float'
  iconPosition?: 'separate' | 'together'
  showIconButtons?: boolean
  label?: string
  showAriaLabel?: boolean
  size?: TextFieldSize
  className?: string
  labelClassName?: string
  inputClassName?: string
  inputContainerClassName?: string
  errorClassName?: string
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'autoFocus' | 'disabled' | 'autoComplete' | 'required' | 'placeholder'>

export type NumberFieldProps = NumberFieldCoreProps & NumberFieldExtraProps

export const NumberField: FC<NumberFieldProps> = ({
  incrementIconAriaLabel = 'Increment',
  decrementIconAriaLabel = 'Decrement',
  step = 1,
  min,
  max,
  value,
  numberType = 'int',
  iconPosition = 'together',
  showIconButtons = true,
  inputClassName,
  inputContainerClassName,
  onChange,
  disabled,
  size,
  ...props
}) => {
  const [field, setField] = useState<HTMLInputElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (field) {
      const handleWheel = (e: WheelEvent) => {
        const target = e.target as HTMLInputElement
        target.blur()
      }
      field.addEventListener('wheel', handleWheel)
      return () => {
        field.removeEventListener('wheel', handleWheel)
      }
    }
  }, [field])

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
    let newValue: number

    if (value === undefined && min !== undefined) {
      newValue = min
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      newValue = value! + step
    }

    if (max !== undefined && newValue > max) {
      newValue = max
    }
    onChange(newValue)
  }, [value, onChange, step, max, min])

  const overlay = useMemo(() => {
    if (!showIconButtons) {
      return undefined
    }

    let decrementDisabledProps: IconButtonDisabledProps | IconButtonNotDisabledProps = {}
    if (value === undefined) {
      decrementDisabledProps = {
        disabled: true,
        disabledTooltip: 'Please, fill in the initial value',
      }
    } else if (min !== undefined && value <= min) {
      decrementDisabledProps = {
        disabled: true,
        disabledTooltip: `Value can't be less than ${min}`,
      }
    } else if (disabled) {
      // The entire input is disabled. No need for a tooltip.
      decrementDisabledProps = {
        disabled: true,
        disabledTooltip: '',
        disabledTooltipVisible: false,
      }
    }

    let incrementDisabledProps: IconButtonDisabledProps | IconButtonNotDisabledProps = {}
    if (value === undefined && min === undefined) {
      incrementDisabledProps = {
        disabled: true,
        disabledTooltip: 'Please, fill in the initial value',
      }
    } else if (max !== undefined && value !== undefined && value >= max) {
      incrementDisabledProps = {
        disabled: true,
        disabledTooltip: `Value can't be greater than ${max}`,
      }
    } else if (disabled) {
      // The entire input is disabled. No need for a tooltip.
      incrementDisabledProps = {
        disabled: true,
        disabledTooltip: '',
        disabledTooltipVisible: false,
      }
    }

    return (
      <>
        <IconButton
          size={size === 'small' ? 'small' : 'smallMedium'}
          icon={MinusCircle}
          ariaLabel={decrementIconAriaLabel}
          className={cn(styles.decrement, {
            [styles.decrementSmall]: size === 'small',
            [styles.decrementIconsSeparate]: iconPosition === 'separate',
            [styles.disabled]: disabled,
          })}
          onClick={onDecrement}
          kind="transparent"
          data-test="number-field-decrement"
          type="button"
          {...decrementDisabledProps}
        />
        <IconButton
          size={size === 'small' ? 'small' : 'smallMedium'}
          icon={PlusCircle}
          ariaLabel={incrementIconAriaLabel}
          className={cn(styles.increment, {
            [styles.disabled]: disabled,
          })}
          onClick={onIncrement}
          kind="transparent"
          data-test="number-field-increment"
          type="button"
          {...incrementDisabledProps}
        />
      </>
    )
  }, [
    showIconButtons,
    onIncrement,
    onDecrement,
    decrementIconAriaLabel,
    incrementIconAriaLabel,
    value,
    disabled,
    min,
    max,
    size,
    iconPosition,
  ])

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
      mRef={setField}
      value={value}
      onChange={onChangeWrapped}
      type="number"
      inputContainerChild={overlay}
      inputContainerClassName={cn(
        styles.inputContainer,
        {
          [styles.buttons]: showIconButtons,
          [styles.buttonsIconsSeparate]: iconPosition === 'separate',
          [styles.buttonsRegularIconsSeparate]: iconPosition === 'separate' && size !== 'small',
        },
        inputContainerClassName,
      )}
      inputClassName={inputClassName}
      disabled={disabled}
      size={size}
    />
  )
}
