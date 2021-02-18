import React, { FC } from 'react'
import cn from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { CalendarInput } from './components/CalendarInput'
import { CalendarHeader } from './components/CalendarHeader'
import { CalendarTime } from './components/CalendarTime'

import styles from './Calendar.module.scss'

// Note: We build on top of these default styles in Calendar.module.scss
import 'react-datepicker/dist/react-datepicker.css'

const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_FORMAT_WITH_TIME = 'yyyy-MM-dd hh:mm a'

const CalendarPopperContainer: FC = ({ children }) => <div data-test="date-picker-popper-container">{children}</div>

export type CalendarProps = {
  containerClassName?: string
  date: ReactDatePickerProps['selected']
  inputLabel: string
  onDateChange: ReactDatePickerProps['onChange']
} & Omit<ReactDatePickerProps, 'value' | 'onChange'>

/*
 * TODO:
 * [x] - Complete stories set for Calendar (at least add open)
 * [x] - Complete stories set for CalendarRange (at least add open)
 * [x] - Complete tests set for Calendar
 * [x] - Complete tests set for CalendarRange
 * [x] - Complete tests set for CalendarHeader
 * [x] - Complete tests set for CalendarInput
 * [x] - Complete tests set for CalendarTime
 * [] - Revisit and clean up styles
 * [] - Revisit TimeField component and check code status
 * [] - Revisit TimeField component and check stories
 * [] - Revisit TimeField component and check tests status
 * [] - Fix time selection on IE11
 * [] - Debounce the input when the value is incorrect
 *    - [] Resolve inline errors
 * [] - Resolve leftover TODOs
 */
export const Calendar: FC<CalendarProps> = ({
  calendarClassName,
  className,
  containerClassName,
  date,
  inputLabel,
  onDateChange,
  showTimeInput,
  ...props
}) => (
  <div className={cn(styles.container, containerClassName)}>
    <DatePicker
      {...props}
      calendarClassName={cn(styles.calendar, calendarClassName)}
      className={cn(styles.input, className)}
      /*
       * Note: The library instantiates the component using React.cloneElement
       * Source: https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L926
       *
       * TODO: Type the props on our end properly, so we at least have awareness about the API
       */
      customInput={<CalendarInput label={inputLabel} />}
      customTimeInput={<CalendarTime />}
      dateFormat={showTimeInput ? DATE_FORMAT_WITH_TIME : DATE_FORMAT}
      onChange={onDateChange}
      popperContainer={CalendarPopperContainer}
      /*
       * Note:
       * 'renderCustomHeader' is the only child component override prop that is not instantiated
       * via React.cloneElement. So at least we can utilise a typed React.Component over React.ReactNode here
       */
      renderCustomHeader={CalendarHeader}
      selected={date}
      showPopperArrow={false}
      showTimeInput={showTimeInput}
    />
  </div>
)
