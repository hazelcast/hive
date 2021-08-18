import React, { FC } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { CalendarInput } from './components/CalendarInput'
import { CalendarHeader } from './components/CalendarHeader'
import { CalendarTime } from './components/CalendarTime'
import { canUseDOM } from '../utils/ssr'

import styles from './Calendar.module.scss'

const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_FORMAT_WITH_TIME = 'yyyy-MM-dd hh:mm a'

const CalendarPopperContainer: FC = ({ children }) =>
  canUseDOM && children
    ? createPortal(
        <div data-test="date-picker-popper-container" className="hz-date-picker-popper-container">
          {children}
        </div>,
        document.body,
      )
    : null

export type CalendarSize = 'medium' | 'small'

export type CalendarProps = {
  containerClassName?: string
  date: Date | null
  inputLabel: string
  inputClassName?: string
  onDateChange: ReactDatePickerProps['onChange']
  size?: CalendarSize
} & Omit<ReactDatePickerProps, 'value' | 'onChange'>

export const Calendar: FC<CalendarProps> = ({
  calendarClassName,
  className,
  containerClassName,
  date,
  inputLabel,
  inputClassName,
  onDateChange,
  showTimeInput,
  size = 'medium',
  ...props
}) => (
  <div
    className={cn(
      styles.container,
      {
        [styles.time]: showTimeInput,
      },
      containerClassName,
    )}
  >
    <DatePicker
      {...props}
      calendarClassName={cn(styles.calendar, calendarClassName)}
      className={className}
      /*
       * Note: The library instantiates the component using React.cloneElement
       * Source: https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L926
       */
      customInput={<CalendarInput label={inputLabel} textFieldSize={size} className={inputClassName} />}
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
