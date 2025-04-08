export const safeDivision = (dividend: number | null | undefined, divisor: number | null | undefined): number | null => {
  if (dividend === null || dividend === undefined || !divisor) {
    return null
  }

  return dividend / divisor
}
