import React, { FC, InputHTMLAttributes, ChangeEvent, useState, useCallback, memo } from 'react'
import cn from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Calendar, ChevronLeft, ChevronRight } from 'react-feather'
import { format } from 'date-fns'

import { TextField } from '../src/TextField'
import { IconButton } from '../src/IconButton'

import 'react-datepicker/dist/react-datepicker.css'

import styles from './DateTimeInput.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

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

const DatePickerHeader: FC<DatePickerHeaderProps> = ({
  date,
  decreaseMonth,
  increaseMonth,
  //prevMonthButtonDisabled,
  //nextMonthButtonDisabled
  ...props
}) => {
  console.log(props)

  return (
    <div className={styles.headerContainer}>
      <IconButton
        icon={ChevronLeft}
        ariaLabel="Next month"
        iconColor={styleConsts.colorPrimary}
        onClick={decreaseMonth}
        // TODO: What about disabling?
        // disabled={prevMonthButtonDisabled}
      />
      <div className={styles.headerMonthAndYear}>{format(date, 'MMMM y')}</div>
      <IconButton
        icon={ChevronRight}
        ariaLabel="Previous month"
        iconColor={styleConsts.colorPrimary}
        onClick={increaseMonth}
        // TODO: What about disabling?
        // disabled={prevMonthButtonDisabled}
      />
    </div>
  )
}

type DatePickerCustomInputProps = {
  value: string | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

const DatePickerCustomInput: FC<DatePickerCustomInputProps> = ({ className, ...props }) => {
  console.log(props)

  return (
    <TextField<'text'>
      {...props}
      inputContainerClassName={cn(styles.dateTimeCustomInputContainer, className)}
      type="text"
      name="date-picker-input"
      label="Date picker input"
      inputTrailingIcon={Calendar}
      inputTrailingIconLabel="Calendar Icon"
      inputTrailingIconColor={styleConsts.colorPrimary}
    />
  )
}

type DateTimeInputProps = {
  calendarClassName?: string
  containerClassName?: string
  className?: string
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ calendarClassName, containerClassName, className }) => {
  const [value, setValue] = useState(new Date())

  const onChange = useCallback((val) => {
    setValue(val)
  }, [])

  return (
    <div className={cn(styles.container, containerClassName)}>
      <DatePicker
        calendarClassName={cn(styles.calendar, calendarClassName)}
        className={cn(styles.input, className)}
        dateFormat="yyyy-MM-dd HH:mm a"
        selected={value}
        onChange={onChange}
        //value={value}
        //showTimeInput
        showPopperArrow={false}
        customInput={<DatePickerCustomInput onChange={onChange} value={value.toString()} />}
        renderCustomHeader={DatePickerHeader}
        //popperPlacement={position}
        //placeholderText="Now"
        //disabled={disabled}
        //highlightDates={[new Date()]}
        //maxDate={new Date()}
        //minDate={maxOffset ? new Date(Date.now() - maxOffset) : undefined}
      />
    </div>
  )
}
