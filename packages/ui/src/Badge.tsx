import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
import { AlertTriangle, CheckCircle, AlertCircle, Info, Icon as IconType } from 'react-feather'

import { Icon } from '../src/Icon'

import styles from './Badge.module.scss'

export type BadgeType = 'neutral' | 'success' | 'info' | 'warning' | 'critical'

export type IconDescriptor = {
  icon: IconType
  ariaLabel: string
}

export const BadgeIcon: { [key in BadgeType]: IconDescriptor } = {
  neutral: {
    icon: Info,
    ariaLabel: 'Info circle icon',
  },
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

export type BadgeSize = 'small' | 'normal'

export type BadgeProps = {
  type: BadgeType
  size?: BadgeSize
  content: ReactNode
}

export const Badge: FC<BadgeProps> = ({ type, content, size = 'normal' }) => {
  const { icon, ariaLabel } = BadgeIcon[type]

  return (
    <div
      data-test="badge-container"
      className={cn(styles.badge, {
        // Colors
        [styles.neutral]: type === 'neutral',
        [styles.success]: type === 'success',
        [styles.info]: type === 'info',
        [styles.warning]: type === 'warning',
        [styles.critical]: type === 'critical',
        // Size
        [styles.normal]: size === 'normal',
        [styles.small]: size === 'small',
      })}
    >
      <Icon data-test="badge-icon" ariaLabel={ariaLabel} icon={icon} className={styles.icon} size={size} />
      <div data-test="badge-content" className={styles.content}>
        {content}
      </div>
    </div>
  )
}
