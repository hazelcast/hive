import { act } from 'react-dom/test-utils'
import React from 'react'

import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Alert } from '../../../src/Alert'
import { Toast } from '../../../src/Toast'

const title = 'Alert Title'
const content = 'Alert or Toast Content'

describe('useCloseByEscKey', () => {
  it('Alert.closeToast called after simulating Escape key', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  it('Toast.closeToast called after simulating Escape key', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Toast type="success" content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  it('2 instances of Toast should close in order', async () => {
    const closeToast1 = jest.fn()
    const closeToast2 = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <div>
        <Toast type="success" content={content} closeToast={closeToast1} />
        <Toast type="info" content={content} closeToast={closeToast2} />
      </div>,
    )

    expect(closeToast1).toHaveBeenCalledTimes(0)
    expect(closeToast2).toHaveBeenCalledTimes(0)

    // first press
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast2).toHaveBeenCalledTimes(1)
    expect(closeToast1).toHaveBeenCalledTimes(0)

    // second press
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast2).toHaveBeenCalledTimes(1)
    expect(closeToast1).toHaveBeenCalledTimes(1)
  })
})
