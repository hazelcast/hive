import { safeDivision } from './math'

export const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0)

export const average = (numbers: number[]) => safeDivision(sum(numbers), numbers.length)

export const flatten = <T>(arrays: T[][]) => arrays.reduce((a, b) => [...a, ...b], [])

export const difference = <T>(array1: T[], array2: T[]) => {
  const set1 = new Set(array1)
  const set2 = new Set(array2)
  return [...set1].filter((x) => !set2.has(x))
}

export const range = (from: number, to: number, step: number = 1) => {
  let nextElement = from
  const result = []

  while (nextElement <= to) {
    result.push(nextElement)
    nextElement += step
  }

  return result
}
