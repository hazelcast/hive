import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
import { AlertTriangle, CheckCircle, AlertCircle, Info, Icon as IconType, X } from 'react-feather'

import { IconButton } from './IconButton'
import { Icon } from './Icon'

import styles from './Toast.module.scss'

export type ToastType = 'success' | 'info' | 'warning' | 'critical'

export type IconDescriptor = {
  icon: IconType
  ariaLabel: string
}

export const ToastIcon: { [key in ToastType]: IconDescriptor } = {
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
  critical: {
    icon: AlertCircle,
    ariaLabel: 'Info critical circle icon',
  },
}

export type ToastProps = {
  type: ToastType
  content: ReactNode
  closeToast?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * ### Purpose
 * A toast is a non-modal dialog that appears and disappears in the span of a few seconds. It may also optionally have a small close “X”. Typically, toast messages display one or two-line non-critical messages that do not require user interaction. For example: In a map client, once you hit the search button the toast may display a message that looks something like “Searching for location” which disappears once the matching results or “no results found” is displayed.
 *
 * ### Accessibility
 * Without taking extra steps, toasts can have numerous accessibility issues that can impact both people with and without disabilities.
 *
 * ### Note
 * The toast is designed to be integrated with https://fkhadra.github.io/react-toastify/introduction/
 */
export const Toast: FC<ToastProps> = ({ type, content, closeToast }) => {
  const { icon, ariaLabel } = ToastIcon[type]

  return (
    <div
      className={cn(styles.toast, {
        [styles.success]: type === 'success',
        [styles.info]: type === 'info',
        [styles.warning]: type === 'warning',
        [styles.critical]: type === 'critical',
      })}
    >
      <Icon data-test="toast-icon" ariaLabel={ariaLabel} icon={icon} className={styles.icon} />
      <div data-test="toast-content" className={styles.content}>
        {content}
      </div>
      {closeToast && (
        <IconButton
          data-test="toast-close"
          className={styles.close}
          iconClassName={styles.closeIcon}
          iconAriaLabel="Close icon"
          icon={X}
          onClick={closeToast}
        />
      )}
    </div>
  )
}
