/**
 * Deep equal for arrays. Doesn't respect order of items in arrays, i.e. [1,2] would be considered equal to [2,1].
 */
export const expectArraysDeepEqual = <T>(...arrays: T[][]) => {
  const sorted = arrays.map((array) =>
    [...array].sort((a, b) => {
      const aSerialized = JSON.stringify(a)
      const bSerialized = JSON.stringify(b)
      if (aSerialized < bSerialized) {
        return 1
      }
      if (aSerialized === bSerialized) {
        return 0
      }
      return -1
    }),
  )
  const target = sorted.pop()
  sorted.forEach((item) => expect(target).toEqual(item))
}
