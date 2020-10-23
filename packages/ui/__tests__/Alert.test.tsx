import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import React from 'react'
import { AlertTriangle, CheckCircle, Info, Clipboard, AlertCircle } from 'react-feather'
import { ToastType, IconDescriptor } from '../src/Toast'
import { Alert, AlertActionButton, AlertActionLink } from '../src/Alert'

const title = 'Alert Title'
const content = 'Alert Content'
const noOp = jest.fn()

const AlertAction1: AlertActionButton = {
  text: 'Copy',
  onClick: noOp,
  icon: Clipboard,
  iconAriaLabel: 'Icon copy to clipboard',
}

const AlertAction2: AlertActionLink = {
  text: 'Link',
  href: '#',
}

describe('Alert', () => {
  const alertBasicTestData: [ToastType, IconDescriptor][] = [
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

  it.each(alertBasicTestData)('Renders %s Alert with correct theme class, icon, title and content', (type, { icon, ariaLabel }) => {
    const wrapper = mount(<Alert type={type} title={title} content={content} closeToast={noOp} />)

    const AlertElement = wrapper.find(Alert)

    expect(AlertElement.findDataTest('alert').prop('className')).toBe(`alert ${type}`)
    expect(AlertElement.findDataTest('alert-title').text()).toBe(title)
    expect(AlertElement.findDataTest('alert-content').props()).toMatchObject({
      children: content,
    })
    expect(wrapper.findDataTest('alert-icon').props()).toMatchObject({
      icon,
      ariaLabel,
    })
    expect(wrapper.findDataTest('alert-close').exists()).toBeTruthy()
    expect(wrapper.findDataTest('alert-actions').exists()).toBeFalsy()
  })

  it('Close button calls closeToast prop handler', () => {
    const closeToast = jest.fn()

    const wrapper = mount(<Alert type="success" title={title} content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.findDataTest('alert-close').at(1).simulate('click')
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  const alertActionsTestData = [
    ['1 action', [AlertAction1]],
    ['2 actions', [AlertAction1, AlertAction2]],
  ]

  it.each(alertActionsTestData)('Renders Alert with %s', (_, actions) => {
    const wrapper = mount(<Alert type="success" title={title} content={content} closeToast={noOp} />)

    wrapper
      .findDataTest('alert-actions')
      .children()
      .forEach((child, cI) => {
        expect(child.props()).toMatchObject(actions[cI])
      })
  })
})
