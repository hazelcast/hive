import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
import { AlertTriangle, CheckCircle, AlertCircle, Info, ChevronRight, Icon as IconType } from 'react-feather'

import { Icon } from './Icon'
import { Link } from './Link'

import styles from './Notification.module.scss'

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type NotificationIconDescriptor = {
  icon: IconType
  ariaLabel: string
}

export const BadgeIcon: { [key in NotificationType]: NotificationIconDescriptor } = {
  success: {
    icon: CheckCircle,
    ariaLabel: 'Check circle icon',
  },
  info: {
    icon: Info,
    ariaLabel: 'Info circle icon',
  },
  warning: {
    icon: AlertTriangle,
    ariaLabel: 'Warning triangle icon',
  },
  error: {
    icon: AlertCircle,
    ariaLabel: 'Info error circle icon',
  },
}

type NotificationLink =
  | {
      link: ReactNode
      linkHref: string
    }
  | {
      link?: never
      linkHref?: never
    }

export type NotificationProps = {
  className?: string
  type: NotificationType
  children: ReactNode
} & NotificationLink

export const Notification: FC<NotificationProps> = ({ type, children, className, link, linkHref }) => {
  const { icon, ariaLabel } = BadgeIcon[type]

  return (
    <div
      data-test="notification"
      className={cn(
        styles.notification,
        {
          [styles.success]: type === 'success',
          [styles.info]: type === 'info',
          [styles.warning]: type === 'warning',
          [styles.error]: type === 'error',
        },
        className,
      )}
    >
      <Icon data-test="notification-icon" ariaLabel={ariaLabel} icon={icon} className={styles.icon} />
      <div data-test="notification-content" className={styles.content}>
        {children}
      </div>
      {link && linkHref && (
        <Link
          data-test="notification-link"
          component="a"
          size="small"
          className={styles.link}
          href={linkHref}
          icon={ChevronRight}
          ariaLabel="Icon chevron right"
        >
          {link}
        </Link>
      )}
    </div>
  )
}
