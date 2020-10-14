import { serializeError } from 'serialize-error'

const stringifyMessage = (logMessage: unknown[]) => {
  const stringifiableLog = logMessage.map((m) => {
    if (m instanceof Error) {
      // We're getting rid of `stack` property as it depends on the place where Error was thrown
      const { name, message } = serializeError(m)
      return { name, message }
    }
    return m
  })

  return JSON.stringify(stringifiableLog)
}

type LogLevel = 'log' | 'warn' | 'error'

class Logger {
  private readonly whiteListedMessages = {
    log: new Map<string, number>(),
    warn: new Map<string, number>(),
    error: new Map<string, number>(),
  }

  // Only use this method in tests
  // Usage has effect in `test` environment only
  public async expectMessage(logLevel: LogLevel, message: unknown[], cb: () => void | Promise<void>) {
    const stringifiedMessage = stringifyMessage(message)
    const messagesNumber = this.whiteListedMessages[logLevel].get(stringifiedMessage)
    this.whiteListedMessages[logLevel].set(stringifiedMessage, messagesNumber ? messagesNumber + 1 : 1)

    try {
      await cb()

      Object.entries(this.whiteListedMessages).forEach(([output, messagesMap]) => {
        messagesMap.forEach((numberOfCalls, whiteListedMessage) => {
          if (numberOfCalls !== 0) {
            throw new Error(`Expected console ${output}: ${whiteListedMessage}, but none was found`)
          }
        })
      })
    } finally {
      Object.values(this.whiteListedMessages).forEach((map) => map.clear())
    }
  }

  public log(...args: unknown[]) {
    const shouldOutput = this.checkMessages('log', ...args)
    if (shouldOutput) {
      // eslint-disable-next-line no-console
      console.log(...args)
    }
  }

  public warn(...args: unknown[]) {
    const shouldOutput = this.checkMessages('warn', ...args)
    if (shouldOutput) {
      console.warn(...args)
    }
  }

  public error(...args: unknown[]) {
    const shouldOutput = this.checkMessages('error', ...args)
    if (shouldOutput) {
      console.error(...args)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public debug(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.debug(...args)
  }

  // eslint-disable-next-line class-methods-use-this
  public info(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.info(...args)
  }

  private checkMessages(logLevel: LogLevel, ...args: unknown[]) {
    if (process.env.NODE_ENV === 'test') {
      const stringifiedMessage = stringifyMessage(args)
      const messagesNumber = this.whiteListedMessages[logLevel].get(stringifiedMessage)
      if (messagesNumber === undefined || messagesNumber === 0) {
        // eslint-disable-next-line no-console
        console[logLevel](...args)
        throw new Error(`Console ${logLevel} is not allowed. Found: ${stringifiedMessage}`)
      }
      this.whiteListedMessages[logLevel].set(stringifiedMessage, messagesNumber - 1)
      return false
    }
    return true
  }
}

export const logger = new Logger()
