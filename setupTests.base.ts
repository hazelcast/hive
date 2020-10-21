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
    console.log('ERROR', ...args)
  })
  const originalWarn = console.warn
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    isConsoleErrorOrWarning = true
    originalWarn(...args)
    console.log('WARN')
  })
})

afterEach(() => {
  if (isConsoleErrorOrWarning) {
    throw new Error('Console warnings and errors are not allowed')
  }
})
