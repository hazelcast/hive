import React, { AnchorHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'
import { X, ChevronRight } from 'react-feather'

import { PartialRequired } from '@hazelcast/helpers'

import { Link } from './Link'
import { Button } from './Button'
import { ToastIcon, ToastType } from './Toast'
import { Icon, IconProps } from './Icon'
import { IconButton } from './IconButton'

import styles from './Alert.module.scss'

type AccessibleActionButtonIconProps =
  | {
      icon: IconProps['icon']
      iconAriaLabel: string
    }
  | {
      icon?: never
      iconAriaLabel?: never
    }

export type AlertActionButton = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
} & AccessibleActionButtonIconProps

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
  closeToast: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Alert: FC<AlertProps> = ({ type, title, content, actions, className, closeToast }) => {
  const { icon, ariaLabel } = ToastIcon[type]

  return (
    <div
      className={cn(className, styles.alert, {
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
        <div data-test="alert-content">{content}</div>
        {actions?.length && (
          <div data-test="alert-actions" className={styles.actions}>
            {actions.map((action, aI) => {
              if (isAlertActionButton(action)) {
                const { text, icon, iconAriaLabel, onClick } = action

                // TODO: Resolve type
                return (
                  <Button
                    key={aI}
                    kind="transparent"
                    capitalize={false}
                    className={cn(styles.action, styles.actionButton)}
                    iconLeft={icon}
                    iconLeftAriaLabel={iconAriaLabel}
                    iconLeftClassName={styles.actionButtonIcon}
                    iconLeftSize="small"
                    onClick={onClick}
                  >
                    {text}
                  </Button>
                )
              }

              const { text, href } = action

              return (
                <Link key={aI} type="primary" href={href} Icon={ChevronRight} iconAriaLabel="Icon chevron right" className={styles.action}>
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
