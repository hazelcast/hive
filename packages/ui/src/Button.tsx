import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import mergeRefs from 'react-merge-refs'
import { v4 as uuid } from 'uuid'

import { Icon, IconProps } from './Icon'
import { TruncatedText } from './TruncatedText'
import { Tooltip, TooltipProps } from './Tooltip'

import styles from './Button.module.scss'

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
  | { disabledTooltip: string; disabled: boolean; disabledTooltipVisible?: boolean; disabledTooltipPlacement?: TooltipProps['placement'] }
  | {
      disabled?: never
      disabledTooltip?: never
      disabledTooltipVisible?: never
      disabledTooltipPlacement?: never
    }

// Common props for all button "kinds"
type ButtonCommonProps = {
  kind?: ButtonKind
  children: string
  capitalize?: boolean
  bodyClassName?: string
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
export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      kind = 'primary',
      className,
      bodyClassName,
      children,
      capitalize = true,
      // Disabled tooltip
      disabled,
      disabledTooltip,
      disabledTooltipVisible,
      disabledTooltipPlacement,
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
  ) => {
    /* Generate backup tooltip id if prop is empty */
    const tooltipId = `${uuid()}-button-tooltip`

    return (
      <Tooltip
        id={tooltipId}
        content={disabled ? disabledTooltip : undefined}
        visible={disabledTooltipVisible}
        placement={disabledTooltipPlacement}
      >
        {(tooltipRef) => (
          <button
            data-test="button"
            className={cn(
              styles.button,
              {
                [styles.primary]: kind === 'primary',
                [styles.secondary]: kind === 'secondary',
                [styles.transparent]: kind === 'transparent',
              },
              className,
            )}
            aria-describedby={disabled ? tooltipId : undefined}
            disabled={disabled}
            {...rest}
          >
            <span className={styles.outline} />
            <span className={cn(styles.body, bodyClassName)} ref={mergeRefs([ref, tooltipRef])}>
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
    )
  },
)

Button.displayName = 'Button'
