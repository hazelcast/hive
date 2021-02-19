import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { format, parse } from 'date-fns'

import { Button } from '../../Button'
import { timePoints } from '../helpers/consts'
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
  const [time, setTime] = useState(value)
  const [timeInputError, setTimeInputError] = useState<string | undefined>()

  /*
   * Note:
   * We cannot override how react-datepicker handles time values.
   * It always expects format of "xx:xx" to parse the hours and minutes from. (See Source 2. link below)
   *
   * This is not an issue for majority of browsers, however as for IE11, where <input type="time" />
   * fall back to <input type="text" />, this becomes an issue.
   *
   * Furthermore, the package even does not handle potential thrown error by date-fns' parse.
   * Even the live demos do crash on an input like "10:10q" (See source 1. link below).
   *
   * For this reasons we need to provide our own wrapper around the functionality to achieve 2 things:
   * - Provide IE11 with a proper fallback
   * - Prevent the invalid input value crash
   * - Provide the user with an input error in case the value is invalid
   *
   * Source(1): https://reactdatepicker.com/#example-custom-time-input
   * Source(2): https://github.com/Hacker0x01/react-datepicker/blob/master/src/inputTime.jsx#L32
   */
  useEffect(() => {
    setTime(value)
  }, [value])

  const handleTimeInputChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setTime(value)
      const parsedDate = parse(value, DATE_FORMAT_NO_MERIDIEM, date)

      if (!isNaN(parsedDate.valueOf())) {
        setTimeInputError(undefined)
        onChange(value)
      } else {
        setTimeInputError('Invalid time')
      }
    },
    [onChange, date],
  )

  const handleDateClick = useCallback(
    (dp) => () => {
      // Note: Input time (derived from timePoints) is in 'DATE_FORMAT'
      const parsedDate = parse(dp, DATE_FORMAT, date)
      // Note: Output time, that we feed back to 'react-datetime' is in 'DATE_FORMAT_NO_MERIDIEM' format
      const timeStringWithoutAm = format(parsedDate, DATE_FORMAT_NO_MERIDIEM)
      onChange(timeStringWithoutAm)
    },
    [onChange, date],
  )

  return (
    <div data-test="calendar-time" className={styles.container}>
      <div data-test="calendar-time-header" className={styles.header}>
        <TimeField
          ariaLabel="Time Input"
          error={timeInputError}
          className={styles.input}
          name="time"
          value={time.toString()}
          onChange={handleTimeInputChange}
        />
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
