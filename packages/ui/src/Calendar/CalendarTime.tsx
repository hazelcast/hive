import React, { FC, useCallback, useMemo } from 'react'
import { format } from 'date-fns'

import { Button } from '../Button'
import { getDatesSequence } from './helpers/time'

import styles from './CalendarTime.module.scss'

/* export type CalendarTimeProps = {
  date: Date
  // TODO: Specify
  onChange: Function
  value: string
} */

export const CalendarTime: FC<any> = ({ date, value, onChange }) => {
  const datesSequence: string[] = useMemo(() => getDatesSequence(date).map((d) => format(d, 'hh:mm a')), [date])

  const onChangeHandler = useCallback(
    (e) => {
      console.log(e.target.value)
      onChange(e.target.value)
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
      <input type="time" className={styles.input} onChange={onChangeHandler} value={value} />
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
