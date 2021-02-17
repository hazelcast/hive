import { isValid } from 'date-fns'

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

  console.log('oops,', timeString)

  const timeValid = isValid(dateFallback) && Boolean(dateFallback)
  const timeStringFallback = timeValid
    ? `${ensureZeroPrefix(dateFallback.getUTCHours())}:${ensureZeroPrefix(dateFallback.getUTCMinutes())}`
    : ''

  return timeStringFallback
}
