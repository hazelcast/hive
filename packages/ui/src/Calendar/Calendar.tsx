import React, { FC } from 'react'
import cn from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { CalendarInput } from './CalendarInput'
import { CalendarHeader } from './CalendarHeader'
import { CalendarTime } from './CalendarTime'

import styles from './Calendar.module.scss'

import 'react-datepicker/dist/react-datepicker.css'

const CalendarPopperContainer: FC = ({ children }) => <div data-test="date-picker-popper-container">{children}</div>

type CalendarInputProps = {
  calendarClassName?: string
  containerClassName?: string
  className?: string
  date: ReactDatePickerProps['selected']
  onDateChange: ReactDatePickerProps['onChange']
} & Omit<ReactDatePickerProps, 'value' | 'onChange'>

export const Calendar: FC<CalendarInputProps> = ({ calendarClassName, containerClassName, className, date, onDateChange, ...props }) => {
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
         *
         * TODO: Type the props on our end properly, so we at least have awareness about the API
         * TODO: Memo the component(s)
         */
        customInput={<CalendarInput />}
        customTimeInput={<CalendarTime />}
        dateFormat="yyyy-MM-dd hh:mm a"
        onChange={onDateChange}
        popperContainer={CalendarPopperContainer}
        renderCustomHeader={CalendarHeader}
        selected={date}
        showPopperArrow={false}
      />
    </div>
  )
}
