import React, { FC, FormEvent, useState, useEffect, forwardRef, useCallback } from 'react'
import cn from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Calendar, ChevronLeft, ChevronRight } from 'react-feather'
import { format } from 'date-fns'

import { TextField } from '../src/TextField'
import { IconButton } from '../src/IconButton'

import 'react-datepicker/dist/react-datepicker.css'

import styles from './DateTimeInput.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

const DatePickerPopperContainer: FC = ({ children }) => <div data-test="date-picker-popper-container">{children}</div>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractFnArgumentType<T> = T extends (arg: infer U) => any ? U : never

/*
 * Note:
 * react-datepicker does expose header props type as "renderCustomHeader", however the property is defined
 * as a render-prop.
 * This way we can pick the argument type from the render function and convert the property
 * to use a regular component, rather than a render-prop.
 *
 * There is no significant benefit other than readability and potentially couple of saved renders.
 */
type DatePickerHeaderProps = ExtractFnArgumentType<ReactDatePickerProps['renderCustomHeader']>

export const DatePickerHeader: FC<DatePickerHeaderProps> = ({ date, decreaseMonth, increaseMonth }) => {
  return (
    <div data-test="date-picker-header" className={styles.headerContainer}>
      <IconButton
        data-test="date-picker-header-icon-previous"
        icon={ChevronLeft}
        ariaLabel="Previous month"
        iconColor={styleConsts.colorPrimary}
        onClick={decreaseMonth}
      />
      <div className={styles.headerMonthAndYear}>{format(date, 'MMMM y')}</div>
      <IconButton
        data-test="date-picker-header-icon-next"
        icon={ChevronRight}
        ariaLabel="Next month"
        iconColor={styleConsts.colorPrimary}
        onClick={increaseMonth}
      />
    </div>
  )
}

/* type DatePickerInputProps = {
  value: string
  onChange: (dateTime: Date) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> */

type DatePickerInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/*
 * Note: Cannot be typed due to cloneElement nature
 *
 * TODO: Pass the reference to TextField
 * TODO: Go over the props that are spread to TextField and ensure there are no shenanigans going on
 */
export const DatePickerInput: FC<DatePickerInputProps> = forwardRef(({ className, value, onChange, ...props }, ref) => {
  const onChangeWrapper = (e: FormEvent<HTMLInputElement>) => {}

  return (
    <TextField<'text'>
      {...props}
      data-test="date-picker-input"
      value={value as string}
      onChange={onChangeWrapper}
      inputContainerClassName={cn(styles.dateTimeCustomInputContainer, className)}
      type="text"
      name="date-picker-input"
      label="Date picker input"
      inputTrailingIcon={Calendar}
      inputTrailingIconLabel="Calendar Icon"
      inputTrailingIconColor={styleConsts.colorPrimary}
    />
  )
})

DatePickerInput.displayName = 'DatePickerInput'

type DateTimeInputProps = {
  calendarClassName?: string
  containerClassName?: string
  className?: string
  timestamp: number | undefined
  onTimestampChange: (timestamp?: number) => void
} & Omit<ReactDatePickerProps, 'onChange'>

export const DateTimeInput: FC<DateTimeInputProps> = ({
  calendarClassName,
  containerClassName,
  className,
  timestamp,
  onTimestampChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(timestamp ? new Date(timestamp) : undefined)

  useEffect(() => {
    setInternalValue(timestamp ? new Date(timestamp) : undefined)
  }, [timestamp])

  const onChange = useCallback(
    (date: Date) => {
      onTimestampChange(date.valueOf())
    },
    [onTimestampChange],
  )

  return (
    <div className={cn(styles.container, containerClassName)}>
      <DatePicker
        {...props}
        calendarClassName={cn(styles.calendar, calendarClassName)}
        className={cn(styles.input, className)}
        /*
         * Note: We cannot pass any custom props to 'customInput'
         * The library instantiates the component using React.cloneElement
         * Source: https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L926
         */
        customInput={<DatePickerInput />}
        dateFormat="yyyy-MM-dd HH:mm"
        onChange={onChange}
        popperContainer={DatePickerPopperContainer}
        renderCustomHeader={DatePickerHeader}
        selected={internalValue}
        showPopperArrow={false}
      />
    </div>
  )
}
