import { TimeService } from '@hazelcast/services'

export const mockCurrentTimestamp = () => {
  const currentTimestamp = TimeService.currentTimestamp()
  const spyTimeServiceCurrentTimestamp = jest.spyOn(TimeService, 'currentTimestamp').mockImplementation(() => currentTimestamp)
  return { currentTimestamp, spyTimeServiceCurrentTimestamp }
}
