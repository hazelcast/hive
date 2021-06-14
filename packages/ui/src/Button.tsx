import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes } from 'react'
import cn from 'classnames'
import mergeRefs from 'react-merge-refs'
import { useUID } from 'react-uid'

import { Icon, IconProps } from './Icon'
import { TruncatedText } from './TruncatedText'
import { Tooltip, TooltipProps } from './Tooltip'
import { LinkRel, LinkTarget } from './Link'
import { Loader } from './Loader'

import styles from './Button.module.scss'

export type ButtonKind = 'primary' | 'secondary' | 'danger' | 'transparent'

export type ButtonSize = 'medium' | 'small'

// Left icon is always present with proper aria-label attribute
export type ButtonAccessibleIconLeftProps =
  | {
      iconLeft: IconProps['icon']
      iconLeftAriaLabel: string
      iconLeftColor?: IconProps['color']
      iconLeftClassName?: string
    }
  | {
      iconLeft?: never
      iconLeftAriaLabel?: never
      iconLeftColor?: never
      iconLeftClassName?: never
    }

// Right icon is always present with proper aria-label attribute
export type ButtonAccessibleIconRightProps =
  | {
      iconRight: IconProps['icon']
      iconRightAriaLabel: string
      iconRightColor?: IconProps['color']
      iconRightClassName?: string
    }
  | {
      iconRight?: never
      iconRightAriaLabel?: never
      iconRightColor?: never
      iconRightClassName?: never
    }

type ButtonNotDisabledProps = {
  disabled?: never
  disabledTooltip?: never
  disabledTooltipVisible?: never
  disabledTooltipPlacement?: never
}

export type ButtonDisabledProps = {
  disabledTooltip: string
  disabled: boolean
  disabledTooltipVisible?: boolean
  disabledTooltipPlacement?: TooltipProps['placement']
}

export type ButtonOutlineType = 'outline' | 'inset'

// Common props for all button "kinds"
export type ButtonCommonProps = {
  kind?: ButtonKind
  size?: ButtonSize
  children: string
  capitalize?: boolean
  bodyClassName?: string
  outlineClassName?: string
  outline?: ButtonOutlineType
} & Pick<HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'className' | 'onClick' | 'tabIndex' | 'style'>

export type ButtonTypeAnchorProps = {
  component: 'a'
  href: string
  target?: LinkTarget
  rel?: LinkRel | LinkRel[]
  type?: never
  loading?: never
} & ButtonNotDisabledProps

export type ButtonTypeButtonProps = {
  component?: 'button'
  href?: never
  target?: never
  rel?: never
  loading?: boolean
} & (ButtonDisabledProps | ButtonNotDisabledProps) &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'autoFocus' | 'type'>

export type ButtonTypeProps = ButtonTypeAnchorProps | ButtonTypeButtonProps

export type ButtonProps<T = ButtonTypeProps> = ButtonCommonProps & ButtonAccessibleIconLeftProps & ButtonAccessibleIconRightProps & T

/**
 * ### Purpose
 * Make it clear what users should do to continue with their main flow by using buttons to highlight the main actions they can take.
 * Prioritize the actions on a page and use the button sizes and types to make it clear to users which are the most important. If you have many actions, consider using button links to offer less important ones.
 *
 * ### General Info
 * - Use 4 types of Button: Primary, Secondary, Danger and Transparent
 * - There are two sizes: `small` with height of `30px` and `medium` with height of `40px`
 * - Button can stand only with the label, icon on the left side, icon on the right side, icon on both left and right side, or only icon (depends on the type of the button).
 * - You can use an icon with the label to draw more attention.
 * - Button label is always in upper-case
 * - The labels should be actionable (e.g. "EDIT" or "ADD NEW FILTER") and it should be clear from the button label what will happen when the user interacts with it. Make button labels short and clear. Avoid long explanations in the button text.
 * - You can change underlying semantics with a component property. Typescript will guard you on providing other properties related to the component type.
 *
 * ### Usage
 * - **Primary**: Use primary button for the single primary action on the screen. To call attention to an action on a form, or highlight the strongest call to action on a page. Primary button should only appear once per screen. Not every screen requires a primary button.
 * - **Secondary**: Use secondary buttons for all remaining actions. Secondary button is the standard button for most use cases.
 * - **Danger**: Use danger button for potentially destructive actions.
 * - **Transparent**: Use for IconButton and similar use-cases.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      kind = 'primary',
      size = 'medium',
      component: Component = 'button',
      className,
      bodyClassName,
      outlineClassName,
      outline = 'outline',
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
      iconLeftColor,
      iconLeftClassName,
      // Right icon
      iconRight,
      iconRightAriaLabel,
      iconRightColor,
      iconRightClassName,
      rel = 'noopener',
      target,
      type = 'button',
      loading,
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useUID()
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel
    const loadingAnimationOnRight = loading && iconRight && iconRightAriaLabel && !(iconLeft && iconLeftAriaLabel)

    return (
      <Tooltip
        id={tooltipId}
        content={disabled ? disabledTooltip : undefined}
        visible={disabledTooltipVisible}
        placement={disabledTooltipPlacement}
      >
        {(tooltipRef) => (
          <Component
            data-test="button"
            className={cn(
              styles.button,
              {
                [styles.small]: size === 'small',
                [styles.primary]: kind === 'primary',
                [styles.secondary]: kind === 'secondary',
                [styles.danger]: kind === 'danger',
                [styles.transparent]: kind === 'transparent',
              },
              className,
            )}
            aria-describedby={disabled ? tooltipId : undefined}
            disabled={disabled ?? loading}
            rel={Component === 'a' ? relFinal : undefined}
            target={Component === 'a' ? target : undefined}
            type={Component === 'button' ? type : undefined}
            {...rest}
          >
            <span data-test="button-outline" className={cn(styles.outline, { [styles.inset]: outline === 'inset' }, outlineClassName)} />
            <span className={cn(styles.body, bodyClassName)} ref={mergeRefs([ref, tooltipRef])}>
              {loading && !loadingAnimationOnRight && <Loader className={styles.iconLeft} size={size} />}
              {iconLeft && iconLeftAriaLabel && !loading && (
                <Icon
                  icon={iconLeft}
                  ariaLabel={iconLeftAriaLabel}
                  data-test="button-icon-left"
                  className={cn(styles.iconLeft, iconLeftClassName)}
                  size={size}
                  color={iconLeftColor}
                />
              )}
              <TruncatedText
                text={capitalize ? children.toUpperCase() : children}
                /*
                  If a button is disabled and text is long we don't want to show 2 popups.
                  1. In case a button is disabled and no `disabledTooltipVisible` is enforced, we just hide truncated popup.
                  2. In case a button is disabled and disabledTooltip is hidden with a false flag, there is a space to show
                  the truncated popup -> setting it to undefined will leave the default behaviour.
                */
                tooltipVisible={disabled && disabledTooltipVisible !== false ? false : undefined}
              />
              {loadingAnimationOnRight && <Loader className={styles.iconRight} size={size} />}
              {!loadingAnimationOnRight && iconRight && iconRightAriaLabel && (
                <Icon
                  icon={iconRight}
                  ariaLabel={iconRightAriaLabel}
                  data-test="button-icon-right"
                  className={cn(styles.iconRight, iconRightClassName)}
                  size={size}
                  color={iconRightColor}
                />
              )}
            </span>
          </Component>
        )}
      </Tooltip>
    )
  },
)

Button.displayName = 'Button'
