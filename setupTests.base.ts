// https://stackoverflow.com/a/57439821
import 'regenerator-runtime/runtime'

jest.setTimeout(10000)

beforeEach(() => {
  localStorage.clear()
})

let isConsoleErrorOrWarning: boolean

beforeEach(() => {
  isConsoleErrorOrWarning = false
  const originalError = console.error
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    isConsoleErrorOrWarning = true
    originalError(...args)
  })
  const originalWarn = console.warn
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    isConsoleErrorOrWarning = true
    originalWarn(...args)
  })
})

afterEach(() => {
  if (isConsoleErrorOrWarning) {
    throw new Error('Console warnings and errors are not allowed')
  }
})
