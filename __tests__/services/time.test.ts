import { TimeService } from '../../src'

describe(TimeService.name, () => {
  describe('currentTimestamp', () => {
    it('returns current time', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 10000)

      expect(TimeService.currentTimestamp()).toBe(10000)
    })
  })
})
