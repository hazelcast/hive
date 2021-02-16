import React, { FC, MouseEvent, useCallback, useMemo } from 'react'
import { format, parse } from 'date-fns'

import { Button } from '../Button'
import { getDatesSequence, getSafeTimeString } from './helpers/time'
import { TimeField } from '../TimeField'

import styles from './CalendarTime.module.scss'

/* export type CalendarTimeProps = {
  date: Date
  // TODO: Specify
  onChange: Function
  value: string
} */

const DATE_FORMAT = 'hh:mm a'
const DATE_FORMAT_NO_MERIDIEM = 'hh:mm'

export const CalendarTime: FC<any> = ({ date, value, onChange }) => {
  const datesSequence: string[] = useMemo(() => getDatesSequence(date).map((d) => format(d, DATE_FORMAT)), [date])

  const handleTimeInputChange = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      onChange(getSafeTimeString(e.currentTarget.value, date))
    },
    [onChange, date],
  )

  const handleDateClick = useCallback(
    (dp) => () => {
      const parsedDate = parse(dp, DATE_FORMAT, date)
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
      <div className={styles.datePoints}>
        {datesSequence.map((dP) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Button
            className={styles.datePoint}
            bodyClassName={styles.datePointBody}
            key={dP}
            kind="transparent"
            onClick={handleDateClick(dP)}
          >
            {dP}
          </Button>
        ))}
      </div>
    </div>
  )
}
