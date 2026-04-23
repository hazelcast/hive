import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { Icon, IconProps, IconSize } from './Icon'
import { TruncatedText } from './TruncatedText'
import { Tooltip, TooltipSide } from './Tooltip'
import { LinkRel, LinkTarget } from './Link'
import { Loader } from './Loader'
import { DataTestProp } from '../helpers/types'

import styles from './Button.module.scss'

export type ButtonVariant = 'contained' | 'outlined' | 'text'
export type ButtonColor = 'primary' | 'secondary' | 'warning' | 'brand' | 'authPrimary' | 'authSecondary' | 'light'

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
  disabledTooltipPlacement?: TooltipSide
}

export type ButtonOutlineType = 'outline' | 'inset'

export type ButtonCommonProps = {
  children: string | ReactElement
  iconSize?: IconSize
  color?: ButtonColor
  capitalize?: boolean
  bodyClassName?: string
  variant?: ButtonVariant
  outlineClassName?: string
  outline?: ButtonOutlineType
  tooltip?: string
  tooltipColor?: 'dark' | 'secondary'
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

const capitalizeFirstCharacter = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      component: Component = 'button',
      className,
      bodyClassName,
      outlineClassName,
      outline = 'outline',
      children,
      capitalize = true,
      disabled,
      disabledTooltip,
      disabledTooltipVisible,
      disabledTooltipPlacement,
      iconLeft,
      iconLeftAriaLabel,
      iconLeftColor,
      iconLeftClassName,
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
      tooltipColor,
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useUID()
    const iconSize: IconSize = propIconSize ?? 'small'
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel
    const loadingAnimationOnRight = loading && iconRight && iconRightAriaLabel && !(iconLeft && iconLeftAriaLabel)

    return (
      <Tooltip
        id={tooltipId}
        color={tooltipColor}
        content={disabled ? disabledTooltip : tooltip}
        open={disabled && disabledTooltipVisible}
        side={disabledTooltipPlacement}
      >
        <Component
          data-test="button"
          className={cn(
            styles.button,
            {
              [styles[`color${capitalizeFirstCharacter(color)}`]]: true,
              [styles[`variant${capitalizeFirstCharacter(variant)}`]]: true,
              [styles.active]: active,
            },
            className,
          )}
          aria-describedby={disabled ? tooltipId : undefined}
          disabled={disabled ?? loading}
          rel={Component === 'a' ? relFinal : undefined}
          target={Component === 'a' ? target : undefined}
          type={Component === 'button' ? type : undefined}
          ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
          {...rest}
        >
          <span data-test="button-outline" className={cn(styles.outline, { [styles.inset]: outline === 'inset' }, outlineClassName)} />
          <span className={cn(styles.body, bodyClassName)}>
            {loading && !loadingAnimationOnRight && <Loader className={styles.iconLeft} size={iconSize} />}
            {iconLeft && iconLeftAriaLabel && !loading && (
              <Icon
                icon={iconLeft}
                ariaLabel={iconLeftAriaLabel}
                data-test="button-icon-left"
                className={cn(styles.iconLeft, iconLeftClassName)}
                size={iconSize}
                color={iconLeftColor}
              />
            )}
            {truncate ? (
              <TruncatedText
                text={capitalize && typeof children === 'string' ? children.toUpperCase() : children}
                /*
                  If a button is disabled and text is long we don't want to show 2 popups.
                  1. In case a button is disabled and no `disabledTooltipVisible` is enforced, we just hide truncated popup.
                  2. In case a button is disabled and disabledTooltip is hidden with a false flag, there is a space to show
                  the truncated popup -> setting it to undefined will leave the default behaviour.
                */
                tooltipVisible={disabled && disabledTooltipVisible !== false ? false : undefined}
              />
            ) : (
              children
            )}
            {loadingAnimationOnRight && <Loader className={styles.iconRight} size={iconSize} />}
            {!loadingAnimationOnRight && iconRight && iconRightAriaLabel && (
              <Icon
                icon={iconRight}
                ariaLabel={iconRightAriaLabel}
                data-test="button-icon-right"
                className={cn(styles.iconRight, iconRightClassName)}
                size={iconSize}
                color={iconRightColor}
              />
            )}
          </span>
        </Component>
      </Tooltip>
    )
  },
)

Button.displayName = 'Button'
