import React, { FC, useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { CalendarInput } from './CalendarInput'
import { CalendarHeader } from './CalendarHeader'
import { CalendarTime, CalendarTimeProps } from './CalendarTime'

import styles from './Calendar.module.scss'

import 'react-datepicker/dist/react-datepicker.css'

const CalendarPopperContainer: FC = ({ children }) => <div data-test="date-picker-popper-container">{children}</div>

type CalendarInputProps = {
  calendarClassName?: string
  containerClassName?: string
  className?: string
  timestamp: number | undefined
  onTimestampChange: (timestamp?: number) => void
} & Omit<ReactDatePickerProps, 'onChange'>

export const Calendar: FC<CalendarInputProps> = ({
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
        timeClassName={() => styles.swag}
        /*
         * Note: We cannot pass any custom props to 'customInput'
         * The library instantiates the component using React.cloneElement
         * Source: https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L926
         *
         * TODO: Type the props on our end properly, so we at least have awareness about the API
         * TODO: Memo the component(s)
         */
        // customInput={(props: CalendarInputProps) => <CalendarInput {...props} />}
        customTimeInput={<CalendarTime />}
        dateFormat="yyyy-MM-dd HH:mm"
        onChange={onChange}
        popperContainer={CalendarPopperContainer}
        renderCustomHeader={CalendarHeader}
        selected={internalValue}
        showPopperArrow={false}
      />
    </div>
  )
}
