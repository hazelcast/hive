import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon } from 'react-feather'

import styles from './Button.module.scss'

const getIconSize = (size: ButtonSize) => {
  if (size === 'small' || size === 'normal') {
    return 16
  }

  return 24
}

export type ButtonKind = 'primary' | 'secondary' | 'status' | 'dashed' | 'danger'

export type ButtonStatusKind = 'success' | 'info' | 'warning' | 'critical'

export type ButtonStatusKindModifier = 'primary' | 'secondary'

export type ButtonSize = 'small' | 'normal' | 'large'

// Left icon is always present with proper aria-label attribute
type AccessibleIconLeftProps =
  | {
      IconLeft: Icon
      iconLeftAriaLabel: string
    }
  | {
      IconLeft?: undefined
      iconLeftAriaLabel?: undefined
    }

// Right icon is always present with proper aria-label attribute
type AccessibleIconRightProps =
  | {
      IconRight: Icon
      iconRightAriaLabel: string
    }
  | {
      IconRight?: undefined
      iconRightAriaLabel?: undefined
    }

// Common props for all button "kinds"
type ButtonKindCommonProps = {
  size?: ButtonSize
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

/*
 * TODO: Style-guide is missing "Only Icon" button spec
 */
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
  const iconSize = getIconSize(size)

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
        [styles.small]: size === 'small',
        [styles.normal]: size === 'normal',
        [styles.large]: size === 'large',
        // FullWidth
        [styles.fullWidth]: fullWidth,
      })}
      {...rest}
    >
      <div className={styles.body}>
        {IconLeft && (
          // Icon colour is defined in SCSS
          <IconLeft
            aria-label={iconLeftAriaLabel}
            data-test="button-icon-left"
            className={cn(styles.icon, styles.iconLeft)}
            size={iconSize}
          />
        )}
        {children}
        {IconRight && (
          // Icon colour is defined in SCSS
          <IconRight
            aria-label={iconRightAriaLabel}
            data-test="button-icon-right"
            className={cn(styles.icon, styles.iconRight)}
            size={iconSize}
          />
        )}
      </div>
    </button>
  )
}
