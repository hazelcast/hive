import React, { useCallback, useState } from 'react'
import { Calendar } from '../src/Calendar/Calendar'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/Calendar',
  component: Calendar,
}

const dateDefault = new Date(2020, 11, 20)
const onDateChange = (d: Date) => console.log(d)
const inputLabel = 'Calendar Input'

export const Default = () => {
  const [date, setDate] = useState<Date>(dateDefault)

  const onDateChange = useCallback(
    (d: Date) => {
      setDate(d)
    },
    [setDate],
  )

  return (
    <div className={utilsStyles.calendarWrapper}>
      <Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} />
    </div>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Open = () => (
  <div className={utilsStyles.calendarWrapper}>
    <Calendar date={dateDefault} onDateChange={onDateChange} inputLabel={inputLabel} open />
  </div>
)

export const Disabled = () => (
  <div className={utilsStyles.calendarWrapper}>
    <Calendar disabled date={dateDefault} onDateChange={onDateChange} inputLabel={inputLabel} />
  </div>
)

export const WithTime = () => {
  const [date, setDate] = useState<Date>(dateDefault)

  const onDateChange = useCallback(
    (d: Date) => {
      setDate(d)
    },
    [setDate],
  )

  return (
    <div className={utilsStyles.calendarWrapper}>
      <Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} showTimeInput />
    </div>
  )
}
