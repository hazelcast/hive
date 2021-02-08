import React, { FC, useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { DateTimeInput } from './DateTimeInput'
import { DateTimeHeader } from './DateTimeHeader'

import styles from './DateTimeInput.module.scss'

import 'react-datepicker/dist/react-datepicker.css'

const DatePickerPopperContainer: FC = ({ children }) => <div data-test="date-picker-popper-container">{children}</div>

type DateTimeInputProps = {
  calendarClassName?: string
  containerClassName?: string
  className?: string
  timestamp: number | undefined
  onTimestampChange: (timestamp?: number) => void
} & Omit<ReactDatePickerProps, 'onChange'>

export const DateTimeField: FC<DateTimeInputProps> = ({
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
        customInput={<DateTimeInput />}
        dateFormat="yyyy-MM-dd HH:mm"
        onChange={onChange}
        popperContainer={DatePickerPopperContainer}
        renderCustomHeader={DateTimeHeader}
        selected={internalValue}
        showPopperArrow={false}
      />
    </div>
  )
}
