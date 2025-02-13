import React from 'react'
import cn from 'classnames'
import userEvent from '@testing-library/user-event'
import { screen, within } from '@testing-library/react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { AlertTriangle, CheckCircle, AlertCircle, Info } from 'react-feather'

import { Notification, NotificationType, NotificationIconDescriptor } from '../src/Notification'

import styles from './Notification.module.scss'
import linkStyles from '../src/Link.module.scss'

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

  it.each(typeTestData)('Renders all necessary components for type %s', async (type, className, { ariaLabel }) => {
    await renderAndCheckA11Y(<Notification type={type}>{text}</Notification>)

    expect(screen.getByTestId('notification')).toHaveClass(cn(styles.notification, className))
    expect(screen.queryByLabelText(ariaLabel)).toBeInTheDocument()
    expect(screen.queryByTestId('notification-content')).toHaveTextContent(text)
    expect(screen.queryByTestId('notification-link')).not.toBeInTheDocument()
  })

  it('Renders link', async () => {
    const link = '/'
    const linkHref = 'href'

    await renderAndCheckA11Y(
      <Notification type="success" link={link} linkHref={linkHref}>
        {text}
      </Notification>,
    )

    expect(screen.getByTestId('notification')).toHaveClass(cn(styles.notification, styles.success))
    expect(screen.queryByLabelText('Check circle icon')).toBeInTheDocument()
    expect(screen.queryByTestId('notification-content')).toHaveTextContent(text)

    const linkEl = screen.getByTestId('notification-link')
    expect(linkEl).toHaveClass(linkStyles.small)
    expect(linkEl).toHaveClass(linkStyles.bold)
    expect(linkEl).toHaveAttribute('href', linkHref)
    expect(linkEl).toHaveTextContent(link)
    expect(within(linkEl).queryByLabelText('Icon chevron right')).toBeInTheDocument()
  })

  it('Renders close button and calls onClose when callback is passed', async () => {
    const onClose = jest.fn()

    await renderAndCheckA11Y(
      <Notification type="success" onClose={onClose}>
        {text}
      </Notification>,
    )

    const closeButton = screen.getByTestId('notification-close')

    expect(onClose).toBeCalledTimes(0)
    await userEvent.click(closeButton)
    expect(onClose).toBeCalledTimes(1)
  })
})
