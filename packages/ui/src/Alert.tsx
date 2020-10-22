import React, { AnchorHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'
import { X } from 'react-feather'

import { PartialRequired } from '@hazelcast/helpers'

import { Link } from './Link'
import { ToastIcon, ToastType } from './Toast'
import { Icon } from './Icon'
import { IconButton } from './IconButton'

import styles from './Alert.module.scss'

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>

export type AlertAction = {
  text: string
} & PartialRequired<AnchorAttributes, 'href'>

// 0, 1 or 2 actions are permitted
export type AlertActions = [] | [AlertAction] | [AlertAction, AlertAction]

type AlertProps = {
  type: ToastType
  title: string
  content: ReactNode
  actions?: AlertActions
  className?: string
  closeToast: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Alert: FC<AlertProps> = ({ type, title, content, actions, className, closeToast }) => {
  const { icon, ariaLabel } = ToastIcon[type]

  return (
    <div
      className={cn(className, styles.alert, {
        // Type
        [styles.success]: type === 'success',
        [styles.info]: type === 'info',
        [styles.warning]: type === 'warning',
        [styles.critical]: type === 'critical',
      })}
    >
      <div className={styles.header}>
        <Icon ariaLabel={ariaLabel} icon={icon} className={styles.icon} />
        <div data-test="alert-title" className={styles.title}>
          {title}
        </div>
        {closeToast && (
          <IconButton
            data-test="alert-close"
            className={styles.close}
            iconClassName={styles.closeIcon}
            iconAriaLabel="Close icon"
            icon={X}
            onClick={closeToast}
          />
        )}
      </div>
      <div data-test="alert-body" className={styles.body}>
        <div data-test="alert-content" className={styles.content}>
          {content}
        </div>
        {actions?.length && (
          <div data-test="alert-actions" className={styles.actions}>
            {actions.map(({ text, href }, aI) => (
              <Link key={aI} data-test="alert-action" className={styles.action} type="primary" href={href}>
                {text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
