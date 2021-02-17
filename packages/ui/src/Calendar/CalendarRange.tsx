import React, { FC } from 'react'
import { ArrowRight } from 'react-feather'
import { Icon } from '../Icon'
import { Calendar, CalendarProps } from './Calendar'

import styles from './CalendarRange.module.scss'

export type CalendarRangeProps = {
  startDate: CalendarProps['date']
  startInputLabel?: string
  onStartDateChange: CalendarProps['onDateChange']
  endDate: CalendarProps['date']
  endInputLabel?: string
  onEndDateChange: CalendarProps['onDateChange']
}

export const CalendarRange: FC<CalendarRangeProps> = (props) => {
  const { startDate, startInputLabel = 'From', onStartDateChange, endDate, endInputLabel = 'To', onEndDateChange } = props

  return (
    <div className={styles.container}>
      <Calendar
        date={startDate}
        onDateChange={onStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        inputLabel={startInputLabel}
        showTimeInput
      />
      <Icon className={styles.arrowRight} icon={ArrowRight} ariaLabel="Arrow Right" />
      <Calendar
        date={endDate}
        onDateChange={onEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        inputLabel={endInputLabel}
        showTimeInput
        /* popperModifiers={{
        offset: {
          enabled: true,
          offset: "-250px"
        },
      }} */
      />
    </div>
  )
}
