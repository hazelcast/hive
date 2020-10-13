import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon } from 'react-feather'

import styles from './Button.module.scss'

export type ButtonKind =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'successSecondary'
  | 'info'
  | 'infoSecondary'
  | 'warning'
  | 'warningSecondary'
  | 'dashed'
  | 'critical'
  | 'criticalSecondary'
  | 'danger'

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
}

// Primary and Secondary buttons share common behavior
type ButtonKindPrimarySecondaryProps = {
  kind?: 'primary' | 'secondary'
} & ButtonKindCommonProps &
  AccessibleIconLeftProps &
  AccessibleIconRightProps

// Dashed and Danger buttons share common behavior
type ButtonKindDashedDangerProps = {
  kind?: 'dashed' | 'danger'
  IconRight?: undefined
  iconRightAriaLabel?: undefined
} & ButtonKindCommonProps &
  AccessibleIconLeftProps

// Status button behavior
type ButtonKindStatusProps = {
  kind?: 'success' | 'successSecondary' | 'info' | 'infoSecondary' | 'warning' | 'warningSecondary' | 'critical' | 'criticalSecondary'
  IconLeft?: undefined
  iconLeftAriaLabel?: undefined
  IconRight?: undefined
  iconRightAriaLabel?: undefined
} & ButtonKindCommonProps

export type ButtonProps = (ButtonKindPrimarySecondaryProps | ButtonKindDashedDangerProps | ButtonKindStatusProps) &
  ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  kind = 'primary',
  size = 'normal',
  IconLeft,
  iconLeftAriaLabel,
  IconRight,
  iconRightAriaLabel,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={cn(className, styles.button, {
        // Kind
        // Kind === primary
        [styles.primary]: kind === 'primary',
        // Kind === secondary
        [styles.secondary]: kind === 'secondary',
        // Kind === success
        [styles.success]: kind === 'success' || kind === 'successSecondary',
        [styles.successSecondary]: kind === 'successSecondary',
        // Kind === info
        [styles.info]: kind === 'info' || kind === 'infoSecondary',
        [styles.infoSecondary]: kind === 'infoSecondary',
        // Kind === warning
        [styles.warning]: kind === 'warning' || kind === 'warningSecondary',
        [styles.warningSecondary]: kind === 'warningSecondary',
        // Kind === danger
        [styles.critical]: kind === 'critical' || kind === 'criticalSecondary',
        [styles.criticalSecondary]: kind === 'criticalSecondary',
        // Kind === dashed
        [styles.dashed]: kind === 'dashed',
        // Kind === danger
        [styles.danger]: kind === 'danger',

        // Size
        [styles.normal]: size === 'normal',
      })}
      {...rest}
    >
      <div className={styles.body}>
        {IconLeft && (
          // Icon colour & size is defined in SCSS
          <IconLeft aria-label={iconLeftAriaLabel} data-test="button-icon-left" className={cn(styles.icon, styles.iconLeft)} />
        )}
        {children.toUpperCase()}
        {IconRight && (
          // Icon colour & size are defined in SCSS
          <IconRight aria-label={iconRightAriaLabel} data-test="button-icon-right" className={cn(styles.icon, styles.iconRight)} />
        )}
      </div>
    </button>
  )
}
