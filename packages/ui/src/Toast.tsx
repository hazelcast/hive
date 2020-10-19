import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
import { AlertTriangle, CheckCircle, Info, Icon, X } from 'react-feather'
import { IconButton } from './IconButton'

import styles from './Toast.module.scss'

export type ToastType = 'success' | 'info' | 'warning' | 'critical'

const ToastIcon: { [key in ToastType]: Icon } = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  critical: Info,
}

type ToastProps = {
  type: ToastType
  content: ReactNode
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Toast: FC<ToastProps> = ({ type, content, onClose }) => {
  const ToastIconComponent = ToastIcon[type]

  return (
    <div
      className={cn(styles.toast, {
        [styles.success]: type === 'success',
        [styles.info]: type === 'info',
        [styles.warning]: type === 'warning',
        [styles.critical]: type === 'critical',
      })}
    >
      <ToastIconComponent className={styles.icon} />
      <div data-test="toast-content" className={styles.content}>
        {content}
      </div>
      {onClose && <IconButton className={styles.close} data-test="toast-close" Icon={X} onClick={onClose} />}
    </div>
  )
}
