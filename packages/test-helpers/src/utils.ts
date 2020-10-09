import { logger } from '@hazelcast/services'

export const sleep = (timeout: number = 100) => new Promise((resolve) => setTimeout(resolve, timeout))

interface WaitUntilOptions {
  timeout?: number
  debug?: boolean
}
export const waitUntil = async (
  condition: () => Promise<void> | void,
  { timeout = 100, debug = false }: WaitUntilOptions = {},
): Promise<void> => {
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

/*
 * Creates event with dataTransfer mock
 * To be used when simulating events, that include a file transfer payload
 * @param - Array of (mocked) files
 * @return - event with dataTransfer, including the files
 */
export const createDataTransferWithFiles = (files: File[] = []) => ({
  dataTransfer: {
    files,
    items: files.map((file) => ({
      kind: 'file',
      size: file.size,
      type: file.type,
      getAsFile: () => file,
    })),
    types: ['Files'],
  },
})

/*
 * Creates minimal File for mocking purposes
 * @param - File name
 * @size - File size
 * @type - File type string
 * @return - Constructed minimal File object
 */
export const createFile = (name: string, size: number, type: string): File => {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
}

export const jestFnControlledPromise = () => {
  type Res = {
    resolve: (arg?: any) => void
    promise: Promise<any>
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
