import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'

import { Icon, IconProps } from './Icon'
import { TruncatedText } from './TruncatedText'
import { Tooltip } from '../src/Tooltip'

import styles from './Button.module.scss'
import mergeRefs from 'react-merge-refs'

export type ButtonKind = 'primary' | 'secondary' | 'transparent'

// Left icon is always present with proper aria-label attribute
export type ButtonAccessibleIconLeftProps =
  | {
      iconLeft: IconProps['icon']
      iconLeftAriaLabel: string
      iconLeftSize?: IconProps['size']
      iconLeftColor?: IconProps['color']
      iconLeftClassName?: string
    }
  | {
      iconLeft?: never
      iconLeftAriaLabel?: never
      iconLeftSize?: never
      iconLeftColor?: never
      iconLeftClassName?: never
    }

// Right icon is always present with proper aria-label attribute
export type ButtonAccessibleIconRightProps =
  | {
      iconRight: IconProps['icon']
      iconRightAriaLabel: string
      iconRightSize?: IconProps['size']
      iconRightColor?: IconProps['color']
      iconRightClassName?: string
    }
  | {
      iconRight?: never
      iconRightAriaLabel?: never
      iconRightSize?: never
      iconRightColor?: never
      iconRightClassName?: never
    }

export type ButtonDisabledProps =
  | ({ disabledTooltip: string; disabledTooltipId: string } & Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>>)
  | {
      disabled?: never
      disabledTooltip?: never
      disabledTooltipId: never
    }

// Common props for all button "kinds"
type ButtonCommonProps = {
  kind?: ButtonKind
  children: string
  capitalize?: boolean
}

export type ButtonProps = ButtonCommonProps &
  ButtonAccessibleIconLeftProps &
  ButtonAccessibleIconRightProps &
  ButtonDisabledProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className' | 'autoFocus' | 'type'>

/**
 * ### Purpose
 * Make it clear what users should do to continue with their main flow by using buttons to highlight the main actions they can take.
 * Prioritize the actions on a page and use the button sizes and types to make it clear to users which are the most important. If you have many actions, consider using button links to offer less important ones.
 *
 * ### General Info
 * - Use 2 types of Button: Primary and Secondary
 * - All buttons have unified height of 40px
 * - Button can stand only with the label, icon on the left side, icon on the right side, icon on both left and right side, or only icon (depends on the type of the button).
 * - You can use an icon with the label to draw more attention.
 * - Button label is always in upper-case
 * - The labels should be actionable (e.g. "EDIT" or "ADD NEW FILTER") and it should be clear from the button label what will happen when the user interacts with it. Make button labels short and clear. Avoid long explanations in the button text.
 *
 * ### Usage
 * - **Primary**: Use primary button for the single primary action on the screen. To call attention to an action on a form, or highlight the strongest call to action on a page. Primary button should only appear once per screen. Not every screen requires a primary button.
 * - **Secondary**: Use secondary buttons for all remaining actions. Secondary button is the standard button for most use cases.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      kind = 'primary',
      className,
      disabled,
      disabledTooltip,
      disabledTooltipId,
      children,
      capitalize = true,
      // Left icon
      iconLeft,
      iconLeftAriaLabel,
      iconLeftSize,
      iconLeftColor,
      iconLeftClassName,
      // Right icon
      iconRight,
      iconRightAriaLabel,
      iconRightSize,
      iconRightColor,
      iconRightClassName,
      ...rest
    },
    ref,
  ) => (
    <Tooltip id={disabledTooltipId} content={disabled ? disabledTooltip : undefined}>
      {(tooltipRef) => (
        <button
          data-test="button"
          ref={mergeRefs([ref, tooltipRef])}
          className={cn(className, styles.button, {
            [styles.primary]: kind === 'primary',
            [styles.secondary]: kind === 'secondary',
            [styles.transparent]: kind === 'transparent',
          })}
          disabled={disabled}
          {...rest}
        >
          <span className={styles.outline} />
          <span className={styles.body}>
            {iconLeft && iconLeftAriaLabel && (
              <Icon
                icon={iconLeft}
                ariaLabel={iconLeftAriaLabel}
                data-test="button-icon-left"
                className={cn(styles.iconLeft, iconLeftClassName)}
                size={iconLeftSize}
                color={iconLeftColor}
              />
            )}
            <TruncatedText text={capitalize ? children.toUpperCase() : children} />
            {iconRight && iconRightAriaLabel && (
              <Icon
                icon={iconRight}
                ariaLabel={iconRightAriaLabel}
                data-test="button-icon-right"
                className={cn(styles.iconRight, iconRightClassName)}
                size={iconRightSize}
                color={iconRightColor}
              />
            )}
          </span>
        </button>
      )}
    </Tooltip>
  ),
)

Button.displayName = 'Button'
