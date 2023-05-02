import { TimeService } from '@hazelcast/services'

export const mockCurrentTimestamp = () => {
  const currentTimestamp = TimeService.currentTimestamp()
  const spyTimeServiceCurrentTimestamp = jest.spyOn(TimeService, 'currentTimestamp').mockImplementation(() => currentTimestamp)
  return { currentTimestamp, spyTimeServiceCurrentTimestamp }
}

export const getFixedTimezoneDate = (timestamp: number, timeZone = 'Europe/Istanbul'): Date =>
  new Date(new Date(timestamp).toLocaleString('en-US', { timeZone, hour12: false }))
