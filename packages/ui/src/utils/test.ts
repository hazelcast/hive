import { act } from 'react-dom/test-utils'
import { ReactWrapper } from 'enzyme'
import { Component } from 'react'

export const waitForComponentToPaint = async <T = Component>(wrapper: ReactWrapper<T>) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    wrapper.update()
  })
}
