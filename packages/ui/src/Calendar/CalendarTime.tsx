import React, { FC, useCallback, useMemo } from 'react'
import { format, isValid } from 'date-fns'

import { Button } from '../Button'
import { getDatesSequence } from './helpers/time'
import { TimeField } from '../TimeField'

import styles from './CalendarTime.module.scss'

/* export type CalendarTimeProps = {
  date: Date
  // TODO: Specify
  onChange: Function
  value: string
} */

const addZero = (i: number) => (i < 10 ? `0${i}` : `${i}`)

export const CalendarTime: FC<any> = ({ date, value, onChange }) => {
  const datesSequence: string[] = useMemo(() => getDatesSequence(date).map((d) => format(d, 'hh:mm a')), [date])

  const onChangeHandler = useCallback(
    (e) => {
      const d = date as Date

      const timeValid = isValid(d) && Boolean(d)
      const timeString = timeValid ? `${addZero(d.getHours())}:${addZero(d.getMinutes())}` : ''

      onChange(e.target.value || timeString)
    },
    [onChange],
  )

  const onDateClickHandler = useCallback(
    (dp) => () => {
      console.log(dp)
    },
    [],
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TimeField className={styles.input} name="time" value={value as string} onChange={onChangeHandler} />
      </div>
      <div className={styles.datePoints}>
        {datesSequence.map((dP) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Button
            className={styles.datePoint}
            bodyClassName={styles.datePointBody}
            key={dP}
            kind="transparent"
            onClick={onDateClickHandler(dP)}
          >
            {dP}
          </Button>
        ))}
      </div>
    </div>
  )
}
