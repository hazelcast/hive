import React, { ChangeEvent, FC, useCallback } from 'react'
import { format, parse } from 'date-fns'

import { Button } from '../../Button'
import { timePoints } from '../helpers/consts'
import { getSafeTimeString } from '../helpers/time'
import { TimeField } from '../../TimeField'

import styles from './CalendarTime.module.scss'

// Note: AM/PM 1-12 hours time
const DATE_FORMAT = 'hh:mm a'
// Note: 0-23 hours time
const DATE_FORMAT_NO_MERIDIEM = 'HH:mm'

export type CalendarTimeInternalProps = {
  date: Date
  onChange: (timeString: string) => void
  value: string
}

export const CalendarTimeInternal: FC<CalendarTimeInternalProps> = ({ date, value, onChange }) => {
  const handleTimeInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(getSafeTimeString(e.target.value, date))
    },
    [onChange, date],
  )

  const handleDateClick = useCallback(
    (dp) => () => {
      // Note: Input time (derived from timePoints) is in 'DATE_FORMAT'
      const parsedDate = parse(dp, DATE_FORMAT, date)
      // Note: Output time, that we feed back to 'react-datetime' is in 'DATE_FORMAT_NO_MERIDIEM' format
      const timeStringWithoutAm = format(parsedDate, DATE_FORMAT_NO_MERIDIEM)
      onChange(getSafeTimeString(timeStringWithoutAm, parsedDate))
    },
    [onChange, date],
  )

  return (
    <div data-test="calendar-time" className={styles.container}>
      <div data-test="calendar-time-header" className={styles.header}>
        <TimeField aria-label="Time Input" className={styles.input} name="time" value={value} onChange={handleTimeInputChange} />
      </div>
      <div data-test="calendar-time-timePoints" className={styles.timePoints}>
        {timePoints.map((tP) => (
          <Button
            className={styles.timePoint}
            bodyClassName={styles.timePointBody}
            key={tP}
            kind="transparent"
            onClick={handleDateClick(tP)}
          >
            {tP}
          </Button>
        ))}
      </div>
    </div>
  )
}

/*
 * Note:
 * The types are not available, the element is internally instantiated via React.cloneElement
 * We need to accept the props as unknown and cast them in place
 * Otherwise "Calendar.customTimeInput" would require us to pass them explicitly
 */
export type CalendarTimeProps = unknown

export const CalendarTime: FC<CalendarTimeProps> = (props) => {
  // Note: Cast the "unknown" props to the actual type
  const propsTyped = props as CalendarTimeInternalProps

  return <CalendarTimeInternal {...propsTyped} />
}
