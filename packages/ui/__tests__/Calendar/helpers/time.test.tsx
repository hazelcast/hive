import { dateSequence1_1_2021 } from '../../../src/Calendar/helpers/consts'
import { getDatesSequence } from '../../../src/Calendar/helpers/time'

// 9-2-2021-9:00:00am CET (epoch in millis)
const timestamp = 1612861200000

describe('Time helpers', () => {
  describe('getDatesSequence', () => {
    it('Generates Dates sequence from 00:00 AM to 23:45 PM, seeded with 15-minutes slots', () => {
      const now = new Date(timestamp)

      expect(getDatesSequence(now).map((d) => d.toISOString())).toEqual(dateSequence1_1_2021)
    })
  })
})
