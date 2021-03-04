import React, { useCallback, useState } from 'react'
import { CalendarRange } from '../src/Calendar/CalendarRange'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/CalendarRange',
  component: CalendarRange,
}

const date = new Date(2020, 11, 20)
const onDateChange = (d: Date) => console.log(d)

export const Default = () => {
  const [startDate, setStartDate] = useState<Date>(date)
  const [endDate, setEndDate] = useState<Date>(date)

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

export const WithTimeInputs = () => {
  const [startDate, setStartDate] = useState<Date>(date)
  const [endDate, setEndDate] = useState<Date>(date)

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
      <CalendarRange
        startDate={startDate}
        onStartDateChange={onStartDateChange}
        endDate={endDate}
        onEndDateChange={onEndDateChange}
        showTimeInput
      />
    </div>
  )
}
