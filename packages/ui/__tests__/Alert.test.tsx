import { act } from 'react-dom/test-utils'
import React from 'react'

import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { AlertCircle, AlertTriangle, CheckCircle, Clipboard, Info } from 'react-feather'
import { ToastIconDescriptor, ToastType } from '../src/Toast'
import { Alert, AlertActionButton, AlertActionLink } from '../src/Alert'

import styles from '../src/Alert.module.scss'

const title = 'Alert Title'
const content = 'Alert Content'
const noOp = jest.fn()

const AlertAction1: AlertActionButton = {
  text: 'Copy',
  onClick: noOp,
  icon: Clipboard,
  ariaLabel: 'Icon copy to clipboard',
}

const AlertAction2: AlertActionLink = {
  text: 'Link',
  href: '#',
  target: '_blank',
  rel: ['nofollow'],
}

describe('Alert', () => {
  const alertBasicTestData: [ToastType, ToastIconDescriptor, string][] = [
    [
      'success',
      {
        icon: CheckCircle,
        ariaLabel: 'Check circle icon',
      },
      styles.success,
    ],
    [
      'info',
      {
        icon: Info,
        ariaLabel: 'Info circle icon',
      },
      styles.info,
    ],
    [
      'warning',
      {
        icon: AlertTriangle,
        ariaLabel: 'Warning triangle icon',
      },
      styles.warning,
    ],
    [
      'critical',
      {
        icon: AlertCircle,
        ariaLabel: 'Info critical circle icon',
      },
      styles.critical,
    ],
  ]

  it.each(alertBasicTestData)(
    'Renders %s Alert with correct className, icon, title and content',
    async (type, { icon, ariaLabel }, className) => {
      const wrapper = await mountAndCheckA11Y(<Alert type={type} title={title} content={content} closeToast={noOp} />)

      const AlertElement = wrapper.find(Alert)

      expect(AlertElement.findDataTest('alert').prop('className')).toBe(`alert ${className}`)
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
    },
  )

  it('Correct props are passed to an underlying Link Action component', async () => {
    const wrapper = await mountAndCheckA11Y(<Alert type="success" title={title} content={content} actions={[AlertAction2]} />)

    expect(wrapper.findDataTest('alert-actions').children().props()).toMatchObject({
      href: AlertAction2.href,
      target: AlertAction2.target,
      rel: AlertAction2.rel,
    })
  })

  it('Correct props are passed to an underlying Button Action component', async () => {
    const wrapper = await mountAndCheckA11Y(<Alert type="success" title={title} content={content} actions={[AlertAction1]} />)

    expect(wrapper.findDataTest('alert-actions').children().props()).toMatchObject({
      children: AlertAction1.text,
      onClick: AlertAction1.onClick,
      iconLeft: AlertAction1.icon,
      iconLeftAriaLabel: AlertAction1.ariaLabel,
    })
  })

  it('Close button calls closeToast prop handler', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.findDataTest('alert-close').at(1).simulate('click')
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  const alertActionsTestData: Array<[string, Array<AlertActionLink | AlertActionButton>]> = [
    ['1 action', [AlertAction1]],
    ['2 actions', [AlertAction1, AlertAction2]],
  ]

  it.each(alertActionsTestData)('Renders correct text properties for Alert with %s', async (x, actions) => {
    const wrapper = await mountAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={noOp} actions={actions} />)

    wrapper
      .findDataTest('alert-actions')
      .children()
      .forEach((child, cI) => {
        expect(child.props()).toHaveProperty('children', actions[cI].text)
      })
  })

  it('Alert.closeToast called after simulating Escape key', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  it('Alert.dismissableByEscKey = false means no Esc key handling', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Alert type="success" dismissableByEscKey={false} title={title} content={content} closeToast={closeToast} />,
    )

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      document.dispatchEvent(event)
    })
    wrapper.update()

    expect(closeToast).toHaveBeenCalledTimes(0)
  })
})
