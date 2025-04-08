import React, { FC, ReactNode, useCallback } from 'react'
import cn from 'classnames'
import { ChevronRight, X } from 'react-feather'

import { PartialRequired } from '../../src'

import useKey from 'react-use/lib/useKey'
import { escKeyFilterPredicate } from '../utils/keyboard'
import { Link, LinkProps } from './Link'
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

/*
 We want to:
 1) Enforce size in this component
 2) 'text' string prop is being used instead of 'children'
 */
export type AlertActionLink = {
  text: string
} & Omit<PartialRequired<LinkProps, 'href'>, 'children' | 'size'>

export type AlertAction = AlertActionButton | AlertActionLink

const isAlertActionButton = (action: AlertAction): action is AlertActionButton => (action as AlertActionButton).onClick !== undefined

export type AlertProps = {
  type: ToastType
  title?: ReactNode
  content?: ReactNode
  actions?: AlertAction[]
  className?: string
  titleClassName?: string
  bodyClassName?: string
  dismissableByEscKey?: boolean
  closeToast?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export const Alert: FC<AlertProps> = ({
  type,
  title,
  content,
  actions,
  className,
  dismissableByEscKey = true,
  closeToast,
  titleClassName,
  bodyClassName,
}) => {
  const { icon, ariaLabel } = ToastIcon[type]

  const closeByEsc = useCallback(
    (nativeEvent: KeyboardEvent) => {
      if (dismissableByEscKey) {
        closeToast?.()
        nativeEvent.stopImmediatePropagation()
      }
    },
    [closeToast, dismissableByEscKey],
  )

  useKey(escKeyFilterPredicate, closeByEsc, { options: { once: true } }, [closeByEsc, dismissableByEscKey])

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
      <Icon data-test="alert-icon" ariaLabel={ariaLabel} icon={icon} className={styles.icon} />
      <div className={styles.rightSide}>
        <div className={styles.header}>
          {title && (
            <div data-test="alert-title" className={cn(styles.title, titleClassName)}>
              {title}
            </div>
          )}
          {!!closeToast && <IconButton data-test="alert-close" kind="transparent" ariaLabel="Close icon" icon={X} onClick={closeToast} />}
        </div>
        <div data-test="alert-body" className={cn(styles.body, bodyClassName)}>
          {content && <div data-test="alert-content">{content}</div>}
          {actions?.length ? (
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
                        }
                      : {}

                  return (
                    <Button
                      key={aI}
                      variant="text"
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

                const { text, href, ...props } = action

                return (
                  <Link
                    key={aI}
                    href={href}
                    icon={ChevronRight}
                    ariaLabel="Icon chevron right"
                    className={styles.action}
                    size="small"
                    {...props}
                  >
                    {text}
                  </Link>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
