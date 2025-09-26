import React, { FC, PropsWithChildren, useMemo } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import DatePicker, { DatePickerProps } from 'react-datepicker'

import { DataTestProp } from '../../helpers/types'
import { CalendarInput } from './components/CalendarInput'
import { CalendarHeader } from './components/CalendarHeader'
import { CalendarTime } from './components/CalendarTime'
import { getPortalContainer, PortalContainer } from '../../utils/portal'

import styles from './Calendar.module.scss'

const DATE_FORMAT = 'yyyy-MM-dd'
const TIME_FORMAT = 'HH:mm'

const CalendarPopperContainer =
  (container: HTMLElement | null, inPortal: boolean): FC =>
  ({ children }: PropsWithChildren<unknown>) => {
    const content = (
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
  onDateChange: (date: Date | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
  selectsRange?: never
  selectsMultiple?: never
  size?: CalendarSize
  container?: PortalContainer
  inPortal?: boolean // prevents creating its own portal
  dateFormat?: string
} & Omit<DatePickerProps, 'value' | 'onChange' | 'dateFormat' | 'selectsMultiple' | 'selectsRange' | 'showMonthYearDropdown'> &
  DataTestProp

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
  'data-test': dataTest = 'calendar',
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
        data-test={dataTest}
        calendarClassName={cn(styles.calendar, calendarClassName)}
        className={className}
        customInput={<CalendarInput data-test={`${dataTest}-input`} label={inputLabel} textFieldSize={size} className={inputClassName} />}
        customTimeInput={<CalendarTime data-test={`${dataTest}-time`} />}
        dateFormat={showTimeInput ? `${dateFormat} ${timeFormat}` : dateFormat}
        onChange={onDateChange}
        popperContainer={PopperContainer}
        renderCustomHeader={({ ...props }) => <CalendarHeader {...props} />}
        selected={date}
        timeFormat={timeFormat}
        showPopperArrow={false}
        showTimeInput={showTimeInput}
      />
    </div>
  )
}
