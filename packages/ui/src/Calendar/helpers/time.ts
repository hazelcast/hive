import { addMinutes } from 'date-fns'

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
