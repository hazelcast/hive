import React, { FC, useMemo } from 'react'
import { format } from 'date-fns'

import { Button } from '../Button'
import { getDatesSequence } from './helpers/time'

import styles from './CalendarTime.module.scss'

export type CalendarTimeProps = {
  date: Date
  // TODO: Specify
  onChange: Function
  value: string
}

export const CalendarTime: FC<CalendarTimeProps> = ({ date, value, onChange }) => {
  const datesSequence: string[] = useMemo(() => getDatesSequence(date).map((d) => format(d, 'hh:mm a')), [date])

  return (
    <div className={styles.container}>
      <div className={styles.header}>{value}</div>
      <div className={styles.datePoints}>
        {datesSequence.map((dP) => (
          <Button className={styles.datePoint} bodyClassName={styles.datePointBody} key={dP} kind="transparent" onClick={onChange}>
            {dP}
          </Button>
        ))}
      </div>
    </div>
  )
}
