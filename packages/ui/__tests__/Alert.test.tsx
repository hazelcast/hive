import { act } from 'react-dom/test-utils'
import React from 'react'

import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import {
  AlertTriangle,
  CheckCircle,
  Info,
  Clipboard,
  AlertCircle,
} from 'react-feather'
import { ToastType, IconDescriptor } from '../src/Toast'
import {
  Alert,
  AlertActionButton,
  AlertActionLink,
} from '../src/Alert'

import styles from '../src/Alert.module.scss'

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
  const alertBasicTestData: [ToastType, IconDescriptor, string][] = [
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
      const wrapper = await mountAndCheckA11Y(
        <Alert
          type={type}
          title={title}
          content={content}
          closeToast={noOp}
        />,
      )

      const AlertElement = wrapper.find(Alert)

      expect(
        AlertElement.findDataTest('alert').prop('className'),
      ).toBe(`alert ${className}`)
      expect(AlertElement.findDataTest('alert-title').text()).toBe(
        title,
      )
      expect(
        AlertElement.findDataTest('alert-content').props(),
      ).toMatchObject({
        children: content,
      })
      expect(
        wrapper.findDataTest('alert-icon').props(),
      ).toMatchObject({
        icon,
        ariaLabel,
      })
      expect(
        wrapper.findDataTest('alert-close').exists(),
      ).toBeTruthy()
      expect(
        wrapper.findDataTest('alert-actions').exists(),
      ).toBeFalsy()
    },
  )

  it('Close button calls closeToast prop handler', async () => {
    const closeToast = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Alert
        type="success"
        title={title}
        content={content}
        closeToast={closeToast}
      />,
    )

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

  it.each(alertActionsTestData)(
    'Renders Alert with %s',
    async (_, actions) => {
      const wrapper = await mountAndCheckA11Y(
        <Alert
          type="success"
          title={title}
          content={content}
          closeToast={noOp}
        />,
      )

      wrapper
        .findDataTest('alert-actions')
        .children()
        .forEach((child, cI) => {
          expect(child.props()).toMatchObject(actions[cI])
        })
    },
  )
})
