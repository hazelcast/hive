import { ensureZeroPrefix, getSafeTimeString } from '../../../src/Calendar/helpers/time'

// 9-2-2021-9:00:00am CET (epoch in millis)
const timestamp = 1612861200000

describe('Time helpers', () => {
  describe('ensureZeroPrefix', () => {
    it('Returns 01 when 1 is passed', () => {
      const input = 1
      const output = '01'

      expect(ensureZeroPrefix(input)).toBe(output)
    })

    it('Returns 11 (identity) when 11 is passed', () => {
      const input = 11
      const output = '11'

      expect(ensureZeroPrefix(input)).toBe(output)
    })
  })

  describe('getSafeTimeString', () => {
    it("Returns input timeString when it's defined", () => {
      const timeString = '09:00'
      const date = new Date(timestamp)
      const safeTimeString = '09:00'

      expect(getSafeTimeString(timeString, date)).toBe(safeTimeString)
    })

    it("Returns input timeString when it's defined", () => {
      const timeString = undefined
      const date = new Date(timestamp)
      const safeTimeString = '09:00'

      expect(getSafeTimeString(timeString, date)).toBe(safeTimeString)
    })
  })
})
