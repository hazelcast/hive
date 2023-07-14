import React, { FC, useMemo } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { CalendarInput } from './components/CalendarInput'
import { CalendarHeader } from './components/CalendarHeader'
import { CalendarTime } from './components/CalendarTime'

import styles from './Calendar.module.scss'
import { getPortalContainer, PortalContainer } from '../utils/portal'

const DATE_FORMAT = 'yyyy-MM-dd'
const TIME_FORMAT = 'HH:mm'

const CalendarPopperContainer =
  (container: HTMLElement | null, inPortal: boolean): FC =>
  // eslint-disable-next-line react/display-name
  ({ children }) => {
    const content = // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      (
        <div className={styles.popper}>
          <div data-test="date-picker-popper-container" className="hz-date-picker-popper-container">
            {children}
          </div>
        </div>
      )

    if (inPortal) {
      return content
    }

    return container && children ? createPortal(content, container) : null
  }

export type CalendarSize = 'medium' | 'small'

export type CalendarProps = {
  containerClassName?: string
  date: Date | null
  inputLabel?: string
  inputClassName?: string
  onDateChange: ReactDatePickerProps['onChange']
  size?: CalendarSize
  container?: PortalContainer
  inPortal?: boolean // prevents creating its own portal
  dateFormat?: string
} & Omit<ReactDatePickerProps, 'value' | 'onChange' | 'dateFormat'>

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
  container = `body`,
  inPortal = false,
  dateFormat = DATE_FORMAT,
  timeFormat = TIME_FORMAT,
  ...props
}) => {
  const PopperContainer = useMemo(() => CalendarPopperContainer(getPortalContainer(container), inPortal), [container, inPortal])

  return (
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
        dateFormat={showTimeInput ? `${dateFormat} ${timeFormat}` : dateFormat}
        onChange={onDateChange}
        popperContainer={PopperContainer}
        /*
         * Note:
         * 'renderCustomHeader' is the only child component override prop that is not instantiated
         * via React.cloneElement. So at least we can utilise a typed React.Component over React.ReactNode here
         */
        renderCustomHeader={CalendarHeader}
        selected={date}
        timeFormat={timeFormat}
        showPopperArrow={false}
        showTimeInput={showTimeInput}
      />
    </div>
  )
}
