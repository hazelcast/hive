import React, { FC, InputHTMLAttributes, ChangeEvent, useState, useCallback } from 'react'
import cn from 'classnames'
import DatePicker from 'react-datepicker'
import { Calendar } from 'react-feather'

import { TextField } from '../src/TextField'

import 'react-datepicker/dist/react-datepicker.css'

import styles from './DateTimeInput.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

type DatePickerCustomInputProps = {
  value: string | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

const DatePickerCustomInput: FC<DatePickerCustomInputProps> = ({ className, ...props }) => {
  console.log(props)

  return (
    <TextField<'text'>
      {...props}
      className={cn(styles.dateTimeCustomInput, className)}
      type="text"
      name="date-picker-input"
      label="Date picker input"
      inputTrailingIcon={Calendar}
      inputTrailingIconLabel="Calendar Icon"
      inputTrailingIconColor={styleConsts.colorInfoDark}
    />
  )
}

type DateTimeInputProps = {
  containerClassName?: string
  className?: string
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ containerClassName, className }) => {
  const [value, setValue] = useState(new Date())

  const onChange = useCallback((val) => {
    setValue(val)
  }, [])

  return (
    <div className={cn(styles.dateTimeContainer, containerClassName)}>
      <DatePicker
        className={cn(styles.dateTimeInput, className)}
        dateFormat="yyyy-MM-dd hh:mm a"
        selected={undefined}
        onChange={onChange}
        value={value.toString()}
        showTimeInput
        showPopperArrow={false}
        customInput={<DatePickerCustomInput onChange={onChange} value={value.toString()} />}
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
