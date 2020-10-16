import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
import { CheckCircle, Info, AlertTriangle, X, Icon } from 'react-feather'

import styles from './Alert.module.scss'

export type AlertType = 'success' | 'info' | 'warning' | 'critical'

export const AlertIcon: { [key in AlertType]: Icon } = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  critical: Info,
}

export type AlertAction = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

// 0, 1 or 2 actions are permitted
export type AlertActions = [] | [AlertAction] | [AlertAction, AlertAction]

type AlertCommonProps = {
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

// Matches "Only title" specification
type AlertPropsNoBody = {
  type: AlertType
  title: string
  content?: undefined
  actions?: undefined
} & AlertCommonProps

// Matches everything but "Only title" specification
type AlertPropsWithBody = {
  type: AlertType
  title: string
  content?: ReactNode
  actions?: AlertActions
} & AlertCommonProps

export type AlertProps = AlertPropsNoBody | AlertPropsWithBody

/*
 * TODO: Add binding to react-toastify
 * Link styles
 */
export const Alert: FC<AlertProps> = ({ type, title, onClose, content, actions, className }) => {
  const AlertIconComponent = AlertIcon[type]

  const hasBody = content // || actions?.length

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
        <AlertIconComponent className={styles.icon} />
        <div data-test="alert-title" className={styles.title}>
          {title}
        </div>
        {onClose && (
          <button data-test="alert-close" className={styles.close} type="button" onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        )}
      </div>
      {hasBody && (
        <div data-test="alert-body" className={styles.body}>
          {content && (
            <div data-test="alert-content" className={styles.content}>
              {content}
            </div>
          )}
          {/* {actions?.length && (
            <div data-test="alert-actions" className={styles.actions}>
              {actions.map(({ text, onClick }, aI) => {
                const buttonStatusKindModifier: ButtonStatusKindModifier =
                  aI === 0 ? 'primary' : 'secondary'

                return (
                  <Button
                    data-test="alert-action"
                    key={aI}
                    className={styles.action}
                    kind="status"
                    statusKind={type}
                    statusKindModifier={buttonStatusKindModifier}
                    onClick={onClick}
                    fullWidth
                  >
                    {text}
                  </Button>
                )
              })}
            </div>
          )} */}
        </div>
      )}
    </div>
  )
}
