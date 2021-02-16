import { addMinutes, isValid } from 'date-fns'

export const getDatesSequence = (date: Date) => {
  // Our interval's seed is 15-minutes
  const interval = 15
  // 15 * 4 * 24 === 1440
  const minutesInADay = 15 * 4 * 24
  // Convert to UTC timestamp
  const dateSeed = new Date(date.setUTCHours(0, 0, 0, 0))

  const dateSequence: Date[] = []
  // We're starting with 00:00, therefore 23:59:59 is the end of the day
  for (let minutes = 0; minutes < minutesInADay; minutes += interval) {
    dateSequence.push(addMinutes(dateSeed, minutes))
  }

  return dateSequence
}

export const ensureZeroPrefix = (i: number) => (i < 10 ? `0${i}` : `${i}`)

/*
 * Extending react-datepicker with custom time input is not the most seamless
 * According to following sources this logic is needed for to integrate safely.
 *
 * - Source1: https://github.com/Hacker0x01/react-datepicker/blob/7485ce6dba179cff4adbd10112e059917ca91105/src/calendar.jsx#L897
 * - Source2: https://github.com/Hacker0x01/react-datepicker/blob/master/src/inputTime.jsx#L32
 */
export const getSafeTimeString = (timeString: string | undefined, dateFallback: Date) => {
  if (timeString) {
    return timeString
  }

  const timeValid = isValid(dateFallback) && Boolean(dateFallback)
  const timeStringFallback = timeValid
    ? `${ensureZeroPrefix(dateFallback.getUTCHours())}:${ensureZeroPrefix(dateFallback.getUTCMinutes())}`
    : ''

  return timeStringFallback
}
