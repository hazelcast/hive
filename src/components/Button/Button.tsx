import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes, ReactElement } from 'react'
import { useUID } from 'react-uid'

import { Icon, IconProps, IconSize } from '../Icon'
import { TruncatedText } from '../TruncatedText'
import { SimpleTooltip, TooltipPlacement } from '../Tooltip'
import { LinkRel, LinkTarget } from '../Link'
import { Loader } from '../Loader'
import { DataTestProp } from '../../helpers/types'
import { cn } from '../../lib/utils'
import { buttonVariants } from './ButtonPrimitive'

export type ButtonVariant = 'contained' | 'outlined' | 'text'
export type ButtonColor = 'primary' | 'secondary' | 'warning' | 'brand' | 'authPrimary' | 'authSecondary' | 'light'

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
  disabledTooltip?: string
  disabled: boolean
  disabledTooltipVisible?: boolean
  disabledTooltipPlacement?: TooltipPlacement
}

/**
 * @deprecated outline/outlineClassName are no-ops in v4.
 * Focus is now handled by the CSS ring (shadcn default).
 */
export type ButtonOutlineType = 'outline' | 'inset'

// Common props for all button "kinds"
export type ButtonCommonProps = {
  children: string | ReactElement
  iconSize?: IconSize
  color?: ButtonColor
  capitalize?: boolean
  bodyClassName?: string
  variant?: ButtonVariant
  /** @deprecated no-op in v4, will be removed */
  outlineClassName?: string
  /** @deprecated no-op in v4, will be removed */
  outline?: ButtonOutlineType
  tooltip?: string
  tooltipPlacement?: TooltipPlacement
  active?: boolean
  truncate?: boolean
} & (ButtonDisabledProps | ButtonNotDisabledProps) &
  Pick<HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'className' | 'onClick' | 'tabIndex' | 'style'>

export type ButtonTypeAnchorProps = {
  component: 'a'
  href: string
  target?: LinkTarget
  rel?: LinkRel | LinkRel[]
  type?: never
  loading?: never
}

export type ButtonTypeButtonProps = {
  component?: 'button'
  href?: never
  target?: never
  rel?: never
  loading?: boolean
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'autoFocus' | 'type'>

export type ButtonTypeProps = ButtonTypeAnchorProps | ButtonTypeButtonProps

export type ButtonProps<T = ButtonTypeProps> = ButtonCommonProps &
  T &
  ButtonAccessibleIconLeftProps &
  ButtonAccessibleIconRightProps &
  DataTestProp

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
      component: Component = 'button',
      className,
      bodyClassName,
      // outline / outlineClassName are no-ops in v4 (ring handles focus)
      outline: _outline,
      outlineClassName: _outlineClassName,
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
      variant = 'contained',
      color = 'primary',
      tooltip,
      active,
      truncate = true,
      iconSize: propIconSize,
      tooltipPlacement,
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useUID()
    const iconSize: IconSize = propIconSize ?? 'small'
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel
    const loadingAnimationOnRight = loading && iconRight && iconRightAriaLabel && !(iconLeft && iconLeftAriaLabel)
    const tooltipContent = disabled ? disabledTooltip : tooltip
    const tooltipOpen = disabled && typeof disabledTooltipVisible === 'boolean' ? disabledTooltipVisible : undefined
    const tooltipSide = disabledTooltipPlacement ?? tooltipPlacement

    const buttonElement = (
      <Component
        data-test="button"
        data-active={active || undefined}
        className={cn(buttonVariants({ color, variant }), className)}
        aria-describedby={tooltipContent ? tooltipId : undefined}
        disabled={disabled ?? loading}
        rel={Component === 'a' ? relFinal : undefined}
        target={Component === 'a' ? target : undefined}
        type={Component === 'button' ? type : undefined}
        ref={ref as React.Ref<any>}
        {...rest}
      >
        <span className={cn('flex flex-row items-center justify-center max-w-full w-full h-full px-5 box-border', bodyClassName)}>
          {loading && !loadingAnimationOnRight && <Loader className="shrink-0 mr-2" size={iconSize} />}

          {iconLeft && iconLeftAriaLabel && !loading && (
            <Icon
              icon={iconLeft}
              ariaLabel={iconLeftAriaLabel}
              data-test="button-icon-left"
              className={cn('shrink-0 mr-2', iconLeftClassName)}
              size={iconSize}
              color={iconLeftColor}
            />
          )}

          {truncate ? (
            <TruncatedText
              text={capitalize && typeof children === 'string' ? children.toUpperCase() : children}
              /*
               * If a button is disabled and text is long we don't want to show 2 popups.
               * 1. In case a button is disabled and no `disabledTooltipVisible` is enforced, we just hide truncated popup.
               * 2. In case a button is disabled and disabledTooltip is hidden with a false flag, there is a space to show
               *    the truncated popup -> setting it to undefined will leave the default behaviour.
               */
              tooltipVisible={disabled && disabledTooltipVisible !== false ? false : undefined}
            />
          ) : (
            children
          )}

          {loadingAnimationOnRight && <Loader className="shrink-0 ml-2" size={iconSize} />}

          {!loadingAnimationOnRight && iconRight && iconRightAriaLabel && (
            <Icon
              icon={iconRight}
              ariaLabel={iconRightAriaLabel}
              data-test="button-icon-right"
              className={cn('shrink-0 ml-2', iconRightClassName)}
              size={iconSize}
              color={iconRightColor}
            />
          )}
        </span>
      </Component>
    )

    return (
      <SimpleTooltip content={tooltipContent} open={tooltipOpen} placement={tooltipSide} id={tooltipId}>
        {buttonElement}
      </SimpleTooltip>
    )
  },
)

Button.displayName = 'Button'
