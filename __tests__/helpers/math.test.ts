import { safeDivision } from '../../src'

describe('math', () => {
  describe('safeDivision', () => {
    test('Falls back to division if divisor is not 0', () => {
      expect(safeDivision(2, 2)).toEqual(1)
    })
    test('Returns null when divisor is 0', () => {
      expect(safeDivision(2, 0)).toEqual(null)
    })
  })
})
