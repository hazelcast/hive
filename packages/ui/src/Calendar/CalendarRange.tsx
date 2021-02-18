import React, { FC } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'
import { ArrowRight } from 'react-feather'
import { Icon } from '../Icon'
import { Calendar, CalendarProps } from './Calendar'

import styles from './CalendarRange.module.scss'

export type CalendarRangeProps = {
  startDate: CalendarProps['date']
  startInputLabel?: string
  startOpen?: boolean
  onStartDateChange: CalendarProps['onDateChange']
  endDate: CalendarProps['date']
  endInputLabel?: string
  endOpen?: boolean
  onEndDateChange: CalendarProps['onDateChange']
} & Pick<ReactDatePickerProps, 'showTimeInput'>

export const CalendarRange: FC<CalendarRangeProps> = ({
  startDate,
  startInputLabel = 'From',
  startOpen,
  onStartDateChange,
  endDate,
  endInputLabel = 'To',
  endOpen,
  onEndDateChange,
  showTimeInput,
}) => {
  return (
    <div className={styles.container}>
      <Calendar
        data-test="calendar-range-start"
        date={startDate}
        onDateChange={onStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        inputLabel={startInputLabel}
        showTimeInput={showTimeInput}
        open={startOpen}
      />
      <Icon data-test="calendar-range-icon" className={styles.arrowRight} icon={ArrowRight} ariaLabel="Arrow Right" />
      <Calendar
        data-test="calendar-range-end"
        date={endDate}
        onDateChange={onEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        inputLabel={endInputLabel}
        showTimeInput={showTimeInput}
        open={endOpen}
      />
    </div>
  )
}
