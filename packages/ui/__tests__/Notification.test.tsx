import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import cn from 'classnames'
import { AlertTriangle, CheckCircle, AlertCircle, Info, ChevronRight } from 'react-feather'

import { Notification, NotificationType, NotificationIconDescriptor } from '../src/Notification'

import styles from './Notification.module.scss'

const text = 'Lorem ipsum dolor sit amet'

describe('Notification', () => {
  const typeTestData: [NotificationType, string, NotificationIconDescriptor][] = [
    [
      'success',
      styles.success,
      {
        icon: CheckCircle,
        ariaLabel: 'Check circle icon',
      },
    ],
    [
      'warning',
      styles.warning,
      {
        icon: AlertTriangle,
        ariaLabel: 'Warning triangle icon',
      },
    ],
    [
      'info',
      styles.info,
      {
        icon: Info,
        ariaLabel: 'Info circle icon',
      },
    ],
    [
      'error',
      styles.error,
      {
        icon: AlertCircle,
        ariaLabel: 'Info error circle icon',
      },
    ],
  ]

  it.each(typeTestData)('Renders all necessary components for type %s', async (type, className, { icon, ariaLabel }) => {
    const wrapper = await mountAndCheckA11Y(<Notification type={type}>{text}</Notification>)

    expect(wrapper.findDataTest('notification').props()).toMatchObject({
      className: cn(styles.notification, className),
    })
    expect(wrapper.findDataTestFirst('notification-icon').props()).toMatchObject({
      ariaLabel,
      icon,
    })
    expect(wrapper.findDataTest('notification-content').text()).toBe(text)
    expect(wrapper.findDataTest('notification-link').exists()).toBeFalsy()
  })

  it('Renders link', async () => {
    const link = '/'
    const linkHref = 'href'

    const wrapper = await mountAndCheckA11Y(
      <Notification type="success" link={link} linkHref={linkHref}>
        {text}
      </Notification>,
    )

    expect(wrapper.findDataTest('notification').props()).toMatchObject({
      className: cn(styles.notification, styles.success),
    })
    expect(wrapper.findDataTestFirst('notification-icon').props()).toMatchObject({
      ariaLabel: 'Check circle icon',
      icon: CheckCircle,
    })
    expect(wrapper.findDataTest('notification-content').text()).toBe(text)
    expect(wrapper.findDataTestFirst('notification-link').props()).toMatchObject({
      component: 'a',
      size: 'small',
      href: linkHref,
      icon: ChevronRight,
      ariaLabel: 'Icon chevron right',
      bold: true,
    })
    expect(wrapper.findDataTestFirst('notification-link').text()).toBe(link)
  })

  it('Renders close button and calls onClose when callback is passed', async () => {
    const onClose = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Notification type="success" onClose={onClose}>
        {text}
      </Notification>,
    )

    const closeButton = wrapper.findDataTestFirst('notification-close')
    expect(closeButton.exists()).toBeTruthy()

    expect(onClose).toBeCalledTimes(0)
    closeButton.simulate('click')
    expect(onClose).toBeCalledTimes(1)
  })
})
