import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { AlertTriangle, CheckCircle, Info, Icon } from 'react-feather'
import { ToastType } from '../src/Toast'
import { Toast } from '../src/Toast'

const content = 'Toast Content'

describe('Toast', () => {
  const toastBasicTestData: [ToastType, Icon][] = [
    ['success', CheckCircle],
    ['info', Info],
    ['warning', AlertTriangle],
    ['critical', Info],
  ]

  it.each(toastBasicTestData)('Renders %s Toast with correct icon and content', (type, Icon) => {
    const wrapper = mount(<Toast type={type} content={content} />)

    const AlertElement = wrapper.find(Toast)

    expect(AlertElement.exists()).toBeTruthy()
    expect(AlertElement.findDataTest('toast-content').text()).toBe(content)

    expect(wrapper.find(Icon).exists()).toBeTruthy()
  })

  it('Renders X as a close button when onClose is passed', () => {
    const closeToast = jest.fn()

    const wrapper = mount(<Toast type="success" content={content} closeToast={closeToast} />)

    expect(wrapper.findDataTest('toast-close').exists()).toBeTruthy()
    expect(closeToast).toBeCalledTimes(0)

    act(() => {
      wrapper.findDataTest('toast-close').at(1).simulate('click')
    })

    expect(closeToast).toBeCalledTimes(1)
  })
})
