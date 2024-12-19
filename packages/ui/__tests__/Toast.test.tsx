import React from 'react'
import { act } from 'react-dom/test-utils'
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'react-feather'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Toast, ToastType, ToastIconDescriptor } from '../src/Toast'

const content = 'Toast Content'

describe('Toast', () => {
  const toastBasicTestData: [ToastType, ToastIconDescriptor][] = [
    [
      'success',
      {
        icon: CheckCircle,
        ariaLabel: 'Check circle icon',
      },
    ],
    [
      'info',
      {
        icon: Info,
        ariaLabel: 'Info circle icon',
      },
    ],
    [
      'warning',
      {
        icon: AlertTriangle,
        ariaLabel: 'Warning triangle icon',
      },
    ],
    [
      'critical',
      {
        icon: AlertCircle,
        ariaLabel: 'Info critical circle icon',
      },
    ],
  ]

  it.each(toastBasicTestData)('Renders %s Toast with correct icon and content', async (type, { icon, ariaLabel }) => {
    const wrapper = await mountAndCheckA11Y(<Toast type={type} content={content} />)

    const AlertElement = wrapper.find(Toast)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('toast-content').text()).toBe(content)

    expect(wrapper.findDataTestFirst('toast-icon').props()).toMatchObject({
      icon,
      ariaLabel,
    })
  })

  it('Renders X as a close button when onClose is passed', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Toast type="success" content={content} closeToast={closeToast} />)

    expect(wrapper.findDataTest('toast-close').exists()).toBeTruthy()
    expect(closeToast).toBeCalledTimes(0)

    act(() => {
      wrapper.findDataTest('toast-close').at(1).simulate('click')
    })

    expect(closeToast).toBeCalledTimes(1)
  })

  it('Toast.closeToast called after simulating Escape key', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Toast type="success" content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  it('Toast.dismissableByEscKey = false means no Esc key handling', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Toast type="success" content={content} dismissableByEscKey={false} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(0)
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
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      document.dispatchEvent(event)
    })
    wrapper.update()

    // first in first out
    expect(closeToast1).toHaveBeenCalledTimes(1)
    expect(closeToast2).toHaveBeenCalledTimes(0)

    // second press
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast1).toHaveBeenCalledTimes(1)
    expect(closeToast2).toHaveBeenCalledTimes(1)
  })
})
