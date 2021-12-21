import { act } from 'react-dom/test-utils'
import { ReactWrapper } from 'enzyme'

export const waitForComponentToPaint = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    ;(wrapper as ReactWrapper<any>).update()
  })
}
