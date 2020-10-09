import { logger } from '../src/logger'

describe('logger', () => {
  it('outputs message and throws error for unexpected console outputs', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    expect(() => {
      logger.log('testLog')
    }).toThrow(Error(`Console log is not allowed. Found: ${JSON.stringify(['testLog'])}`))
    expect(() => {
      logger.warn('testWarn')
    }).toThrow(Error(`Console warn is not allowed. Found: ${JSON.stringify(['testWarn'])}`))
    expect(() => {
      logger.error('testError')
    }).toThrow(Error(`Console error is not allowed. Found: ${JSON.stringify(['testError'])}`))

    expect(consoleLogSpy).toBeCalledTimes(1)
    expect(consoleLogSpy).toBeCalledWith('testLog')
    expect(consoleWarnSpy).toBeCalledTimes(1)
    expect(consoleWarnSpy).toBeCalledWith('testWarn')
    expect(consoleErrorSpy).toBeCalledTimes(1)
    expect(consoleErrorSpy).toBeCalledWith('testError')
  })

  it('throws error if expected console output is not found', async () => {
    await expect(logger.expectMessage('log', ['testLog'], () => {})).rejects.toThrow(
      `Expected console log: ${JSON.stringify(['testLog'])}, but none was found`,
    )
    await expect(logger.expectMessage('warn', ['testWarn'], () => {})).rejects.toThrow(
      `Expected console warn: ${JSON.stringify(['testWarn'])}, but none was found`,
    )
    await expect(logger.expectMessage('error', ['testError'], () => {})).rejects.toThrow(
      `Expected console error: ${JSON.stringify(['testError'])}, but none was found`,
    )
  })

  it('silences console outputs if they are expected', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    await logger.expectMessage('log', ['testLog'], () => {
      logger.log('testLog')
    })
    await logger.expectMessage('warn', ['testWarn'], () => {
      logger.warn('testWarn')
    })
    await logger.expectMessage('error', ['testError'], () => {
      logger.error('testError')
    })

    expect(consoleLogSpy).toBeCalledTimes(0)
    expect(consoleWarnSpy).toBeCalledTimes(0)
    expect(consoleErrorSpy).toBeCalledTimes(0)
  })

  it('calls standard console methods when calling debug and info methods', () => {
    const consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation()
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation()

    logger.debug('testDebug')
    logger.info('testInfo')

    expect(consoleDebugSpy).toBeCalledTimes(1)
    expect(consoleDebugSpy).toBeCalledWith('testDebug')
    expect(consoleInfoSpy).toBeCalledTimes(1)
    expect(consoleInfoSpy).toBeCalledWith('testInfo')
  })

  it('calls standard console methods outside test environment', () => {
    process.env.NODE_ENV = 'devTest'

    const consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation()
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation()
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    logger.debug('testDebug')
    logger.info('testInfo')
    logger.log('testLog')
    logger.warn('testWarn')
    logger.error('testError')

    expect(consoleDebugSpy).toBeCalledTimes(1)
    expect(consoleDebugSpy).toBeCalledWith('testDebug')
    expect(consoleInfoSpy).toBeCalledTimes(1)
    expect(consoleInfoSpy).toBeCalledWith('testInfo')
    expect(consoleLogSpy).toBeCalledTimes(1)
    expect(consoleLogSpy).toBeCalledWith('testLog')
    expect(consoleWarnSpy).toBeCalledTimes(1)
    expect(consoleWarnSpy).toBeCalledWith('testWarn')
    expect(consoleErrorSpy).toBeCalledTimes(1)
    expect(consoleErrorSpy).toBeCalledWith('testError')
  })
})
