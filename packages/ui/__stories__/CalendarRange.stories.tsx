import React, { useCallback, useState } from 'react'
import { CalendarRange } from '../src/Calendar/CalendarRange'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/CalendarRange',
  component: CalendarRange,
}

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = new Date(timestamp)
const onDateChange = (d: Date) => console.log(d)

export const Default = () => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const onStartDateChange = useCallback(
    (d: Date) => {
      setStartDate(d)
    },
    [setStartDate],
  )

  const onEndDateChange = useCallback(
    (d: Date) => {
      setEndDate(d)
    },
    [setEndDate],
  )

  return (
    <div className={utilsStyles.calendarWrapper}>
      <CalendarRange startDate={startDate} onStartDateChange={onStartDateChange} endDate={endDate} onEndDateChange={onEndDateChange} />
    </div>
  )
}

export const StartOpen = () => (
  <div className={utilsStyles.calendarWrapper}>
    <CalendarRange startDate={date} onStartDateChange={onDateChange} endDate={date} onEndDateChange={onDateChange} startOpen />
  </div>
)

export const EndOpen = () => (
  <div className={utilsStyles.calendarWrapper}>
    <CalendarRange startDate={date} onStartDateChange={onDateChange} endDate={date} onEndDateChange={onDateChange} endOpen />
  </div>
)
