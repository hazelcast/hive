import { sum, average, flatten, range, difference } from '../src/array'

describe('array helpers', () => {
  describe('sum', () => {
    const data: [number[], number][] = [
      [[], 0],
      [[1], 1],
      [[1, 2, 3, 4, 5], 15],
      [[-1, 2, -3, 4, -5], -3],
    ]

    test.each(data)('sum(%j) => %s', (numbers, result) => {
      expect(sum(numbers)).toEqual(result)
    })
  })

  describe('average', () => {
    const data: [number[], number | null][] = [
      [[], null],
      [[1], 1],
      [[1, 2, 3, 4, 5], 3],
      [[-1, 3], 1],
    ]

    test.each(data)('sum(%j) => %s', (numbers, result) => {
      expect(average(numbers)).toEqual(result)
    })
  })

  describe('flatOne', () => {
    const data: [number[][], number[]][] = [
      [[], []],
      [[[]], []],
      [[[], [], []], []],
      [
        [[1], [2, 3], [4, 5, 6]],
        [1, 2, 3, 4, 5, 6],
      ],
    ]

    test.each(data)('flatOne(%j) => %j', (array, result) => {
      expect(flatten(array)).toEqual(result)
    })
  })

  describe('difference', () => {
    const data: [number[], number[], number[]][] = [
      [[], [], []],
      [[1, 2], [1, 2], []],
      [
        [1, 2],
        [3, 4],
        [1, 2],
      ],
      [[1, 2, 3], [2, 3, 4], [1]],
      [[1, 2, 3, 1], [2, 3, 4], [1]],
    ]

    test.each(data)('difference(%j, %j) => %j', (array1, array2, result) => {
      expect(difference(array1, array2)).toEqual(result)
    })
  })

  describe('range', () => {
    const data: [number, number, number, number[]][] = [
      [1, 0, 1, []],
      [1, 1, 1, [1]],
      [1, 5, 1, [1, 2, 3, 4, 5]],
      [1, 15, 3, [1, 4, 7, 10, 13]],
    ]

    test.each(data)('range(%j, %j, %j) => %j', (from, to, step, result) => {
      expect(range(from, to, step)).toEqual(result)
    })
  })
})
