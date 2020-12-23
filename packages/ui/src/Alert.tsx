import React, { AnchorHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'
import { X, ChevronRight } from 'react-feather'

import { PartialRequired } from '@hazelcast/helpers'

import { Link } from './Link'
import { Button, ButtonAccessibleIconLeftProps } from './Button'
import { ToastIcon, ToastType } from './Toast'
import { Icon, IconProps } from './Icon'
import { IconButton } from './IconButton'

import styles from './Alert.module.scss'

type AlertAccessibleActionButtonIconProps =
  | {
      icon: IconProps['icon']
      ariaLabel: string
    }
  | {
      icon?: never
      ariaLabel?: never
    }

export type AlertActionButton = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
} & AlertAccessibleActionButtonIconProps

export type AlertActionLink = {
  text: string
} & PartialRequired<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export type AlertAction = AlertActionButton | AlertActionLink

const isAlertActionButton = (action: AlertAction): action is AlertActionButton => (action as AlertActionButton).onClick !== undefined

export type AlertProps = {
  type: ToastType
  title: string
  content: ReactNode
  actions?: AlertAction[]
  className?: string
  closeToast?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Alert: FC<AlertProps> = ({ type, title, content, actions, className, closeToast }) => {
  const { icon, ariaLabel } = ToastIcon[type]

  return (
    <div
      data-test="alert"
      className={cn(
        styles.alert,
        {
          [styles.success]: type === 'success',
          [styles.info]: type === 'info',
          [styles.warning]: type === 'warning',
          [styles.critical]: type === 'critical',
        },
        className,
      )}
    >
      <div className={styles.header}>
        <Icon data-test="alert-icon" ariaLabel={ariaLabel} icon={icon} className={styles.icon} />
        <div data-test="alert-title" className={styles.title}>
          {title}
        </div>
        {!!closeToast && <IconButton data-test="alert-close" kind="transparent" ariaLabel="Close icon" icon={X} onClick={closeToast} />}
      </div>
      <div data-test="alert-body" className={styles.body}>
        <div data-test="alert-content">{content}</div>
        {actions?.length && (
          <div data-test="alert-actions" className={styles.actions}>
            {actions.map((action, aI) => {
              if (isAlertActionButton(action)) {
                const { text, icon, ariaLabel, onClick } = action
                const iconLeftProps: ButtonAccessibleIconLeftProps =
                  icon && ariaLabel
                    ? {
                        iconLeft: icon,
                        iconLeftAriaLabel: ariaLabel,
                        iconLeftClassName: styles.actionButtonIcon,
                        iconLeftSize: 'small',
                      }
                    : {}

                return (
                  <Button
                    key={aI}
                    kind="transparent"
                    capitalize={false}
                    className={cn(styles.action, styles.actionButton)}
                    bodyClassName={styles.actionButtonBody}
                    onClick={onClick}
                    {...iconLeftProps}
                  >
                    {text}
                  </Button>
                )
              }

              const { text, href } = action

              return (
                <Link key={aI} href={href} icon={ChevronRight} ariaLabel="Icon chevron right" className={styles.action} size="small">
                  {text}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
