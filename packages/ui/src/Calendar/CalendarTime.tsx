import React, { ChangeEvent, FC, useCallback } from 'react'
import { format, parse } from 'date-fns'

import { Button } from '../Button'
import { timePoints } from './helpers/consts'
import { getSafeTimeString } from './helpers/time'
import { TimeField } from '../TimeField'

import styles from './CalendarTime.module.scss'

// Note: AM/PM 1-12 hours time
const DATE_FORMAT = 'hh:mm a'
// Note: 0-23 hours time
const DATE_FORMAT_NO_MERIDIEM = 'H:mm'

export const CalendarTime: FC<any> = ({ date, value, onChange }) => {
  const handleTimeInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(getSafeTimeString(e.currentTarget.value, date))
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
    <div className={styles.container}>
      <div className={styles.header}>
        <TimeField className={styles.input} name="time" value={value as string} onChange={handleTimeInputChange} />
      </div>
      <div className={styles.timePoints}>
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
