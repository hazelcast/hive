import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon } from 'react-feather'

import styles from './Button.module.scss'

export type ButtonKind = 'primary' | 'secondary'
/* 
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
   */

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
  children: string
}

// Primary and Secondary buttons share common behavior
type ButtonKindPrimarySecondaryProps = {
  kind?: 'primary' | 'secondary'
} & ButtonKindCommonProps &
  AccessibleIconLeftProps &
  AccessibleIconRightProps

/* 
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
*/

export type ButtonProps = ButtonKindPrimarySecondaryProps &
  /* | ButtonKindDashedDangerProps | ButtonKindStatusProps */ ButtonHTMLAttributes<HTMLButtonElement>

/**
 * ### Purpose
 * Make it clear what users should do to continue with their main flow by using buttons to highlight the main actions they can take.
 * Prioritize the actions on a page and use the button sizes and types to make it clear to users which are the most important. If you have many actions, consider using button links to offer less important ones.
 *
 * ### General Info
 * - Use 2 types of Button: Primary and Secondary
 * - All buttons have unified "normal" height of 40px
 * - Button can stand only with the label, icon on the left side, icon on the right side, icon on both left and right side, or only icon (depends on the type of the button).
 * - You can use an icon with the label to draw more attention.
 * - Button label is always in upper-case
 * - The labels should be actionable (e.g. "EDIT" or "ADD NEW FILTER") and it should be clear from the button label what will happen when the user interacts with it. Make button labels short and clear. Avoid long explanations in the button text.
 *
 * ### Usage
 * - **Primary**: Use primary button for the single primary action on the screen. To call attention to an action on a form, or highlight the strongest call to action on a page. Primary button should only appear once per screen. Not every screen requires a primary button.
 * - **Secondary**: Use secondary buttons for all remaining actions. Secondary button is the standard button for most use cases.
 */
export const Button: FC<ButtonProps> = ({
  kind = 'primary',
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
        /*
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
        */
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
