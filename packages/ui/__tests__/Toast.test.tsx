import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'react-feather'
import { Toast, ToastType, IconDescriptor } from '../src/Toast'

const content = 'Toast Content'

describe('Toast', () => {
  const toastBasicTestData: [ToastType, IconDescriptor][] = [
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

    expect(wrapper.findDataTest('toast-icon').props()).toMatchObject({
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
})
