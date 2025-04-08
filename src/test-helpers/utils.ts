export const jestFnControlledPromise = () => {
  type Res = {
    resolve: (arg?: unknown) => void
    promise: Promise<unknown>
    fn: jest.Mock
  }
  const res = {} as Res
  res.fn = jest.fn().mockImplementation(() => {
    res.promise = new Promise((resolveInternal) => {
      res.resolve = resolveInternal
    })
    return res.promise
  })
  return res
}
