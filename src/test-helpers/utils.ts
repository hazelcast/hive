import { logger } from '../../src'

const sleep = (timeout = 100) => new Promise((resolve) => setTimeout(resolve, timeout))

interface WaitUntilOptions {
  timeout?: number
  debug?: boolean
}
const waitUntil = async (condition: () => Promise<void> | void, { timeout = 100, debug = false }: WaitUntilOptions = {}): Promise<void> => {
  try {
    await condition()
  } catch (e) {
    if (debug) {
      logger.error('waitUntil', e)
    }
    await sleep(timeout)
    await waitUntil(condition)
  }
}

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
