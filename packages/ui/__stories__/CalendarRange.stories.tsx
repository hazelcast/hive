import React, { useCallback, useState } from 'react'
import { CalendarRange } from '../src/Calendar/CalendarRange'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/CalendarRange',
  component: CalendarRange,
}

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
    <div className={utilsStyles.modalWrapper}>
      <CalendarRange startDate={startDate} onStartDateChange={onStartDateChange} endDate={endDate} onEndDateChange={onEndDateChange} />
    </div>
  )
}
