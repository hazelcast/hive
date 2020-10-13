import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon } from 'react-feather'

import styles from './Button.module.scss'

export type ButtonKind = 'primary' | 'secondary' | 'status' | 'dashed' | 'danger'

export type ButtonStatusKind = 'success' | 'info' | 'warning' | 'critical'

export type ButtonStatusKindModifier = 'primary' | 'secondary'

// Left icon is always present with proper aria-label attribute
type AccessibleIconLeftProps =
  | {
      IconLeft: Icon
      iconLeftAriaLabel: string
    }
  | {
      IconLeft?: never
      iconLeftAriaLabel?: never
    }

// Right icon is always present with proper aria-label attribute
type AccessibleIconRightProps =
  | {
      IconRight: Icon
      iconRightAriaLabel: string
    }
  | {
      IconRight?: never
      iconRightAriaLabel?: never
    }

// Common props for all button "kinds"
type ButtonKindCommonProps = {
  // We support single Button.size, which is "normal", rest should be added ad-hoc
  size?: 'normal'
  children: string
  fullWidth?: boolean
}

// Primary and Secondary buttons share common behavior
type ButtonKindPrimarySecondaryProps = {
  kind?: 'primary' | 'secondary'
  statusKind?: undefined
  statusKindModifier?: undefined
} & ButtonKindCommonProps &
  AccessibleIconLeftProps &
  AccessibleIconRightProps

// Dashed and Danger buttons share common behavior
type ButtonKindDashedDangerProps = {
  kind?: 'dashed' | 'danger'
  statusKind?: undefined
  statusKindModifier?: undefined
  IconRight?: undefined
  iconRightAriaLabel?: undefined
} & ButtonKindCommonProps &
  AccessibleIconLeftProps

// Status button behavior
type ButtonKindStatusProps = {
  kind?: 'status'
  statusKind: ButtonStatusKind
  statusKindModifier: ButtonStatusKindModifier
  IconLeft?: undefined
  iconLeftAriaLabel?: undefined
  IconRight?: undefined
  iconRightAriaLabel?: undefined
} & ButtonKindCommonProps

export type ButtonProps = (ButtonKindPrimarySecondaryProps | ButtonKindDashedDangerProps | ButtonKindStatusProps) &
  ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  kind = 'secondary',
  statusKind,
  statusKindModifier,
  size = 'normal',
  IconLeft,
  iconLeftAriaLabel,
  IconRight,
  iconRightAriaLabel,
  fullWidth = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={cn(className, styles.button, {
        // Kind
        [styles.primary]: kind === 'primary',
        [styles.secondary]: kind === 'secondary',
        [styles.status]: kind === 'status',
        [styles.dashed]: kind === 'dashed',
        [styles.danger]: kind === 'danger',
        // StatusKind
        [styles.statusSuccess]: statusKind === 'success',
        [styles.statusInfo]: statusKind === 'info',
        [styles.statusWarning]: statusKind === 'warning',
        [styles.statusCritical]: statusKind === 'critical',
        // StatusKindModifier
        [styles.statusPrimary]: statusKindModifier === 'primary',
        [styles.statusSecondary]: statusKindModifier === 'secondary',
        // Size
        [styles.normal]: size === 'normal',
        // FullWidth
        [styles.fullWidth]: fullWidth,
      })}
      {...rest}
    >
      <div className={styles.body}>
        {IconLeft && (
          // Icon colour & size is defined in SCSS
          <IconLeft aria-label={iconLeftAriaLabel} data-test="button-icon-left" className={cn(styles.icon, styles.iconLeft)} />
        )}
        {children}
        {IconRight && (
          // Icon colour & size are defined in SCSS
          <IconRight aria-label={iconRightAriaLabel} data-test="button-icon-right" className={cn(styles.icon, styles.iconRight)} />
        )}
      </div>
    </button>
  )
}
