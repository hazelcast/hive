import React, { ButtonHTMLAttributes, forwardRef, HTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { Icon, IconProps, IconSize } from './Icon'
import { TruncatedText } from './TruncatedText'
import { Tooltip, TooltipSide } from './Tooltip'
import { LinkRel, LinkTarget } from './Link'
import { Loader } from './Loader'
import { DataTestProp } from '../helpers/types'

import styles from './Button.module.css'

export type ButtonVariant = 'contained' | 'outlined' | 'ghost' | 'link'
export type ButtonColor = 'primary' | 'secondary' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'regular'
export type ButtonOutlineType = 'outline' | 'inset'

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

export type ButtonCommonProps = {
  children: string | ReactElement
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  bodyClassName?: string
  outline?: ButtonOutlineType
  tooltip?: string
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

const variantClass: Record<ButtonVariant, string> = {
  contained: styles.variantContained,
  outlined: styles.variantOutlined,
  ghost: styles.variantGhost,
  link: styles.variantLink,
}

const colorClass: Record<ButtonColor, string> = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  warning: styles.colorWarning,
  danger: styles.colorDanger,
}

const sizeClass: Record<ButtonSize, string> = {
  small: styles.sizeSmall,
  regular: styles.sizeRegular,
}

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      component: Component = 'button',
      className,
      bodyClassName,
      outline = 'outline',
      children,
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
      size = 'regular',
      tooltip,
      active,
      truncate = true,
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useUID()
    const iconSize: IconSize = size === 'small' ? 'small' : 'medium'
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel
    const loadingAnimationOnRight = loading && iconRight && iconRightAriaLabel && !(iconLeft && iconLeftAriaLabel)

    return (
      <Tooltip
        id={tooltipId}
        content={disabled ? disabledTooltip : tooltip}
        open={disabled && disabledTooltipVisible}
        side={disabledTooltipPlacement}
      >
        <Component
          data-test="button"
          className={cn(
            styles.button,
            variantClass[variant],
            colorClass[color],
            sizeClass[size],
            {
              [styles.active]: active,
              [styles.inset]: outline === 'inset',
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
          <span className={cn(styles.body, bodyClassName)}>
            {loading && !loadingAnimationOnRight && <Loader className={styles.iconLeft} size={iconSize} />}
            {iconLeft && iconLeftAriaLabel && !loading && (
              <Icon
                icon={iconLeft}
                ariaLabel={iconLeftAriaLabel}
                data-test="button-icon-left"
                containerClassName={cn(styles.iconLeft, iconLeftClassName)}
                size={iconSize}
                color={iconLeftColor}
              />
            )}
            {truncate ? (
              <TruncatedText text={children} tooltipVisible={disabled && disabledTooltipVisible !== false ? false : undefined} />
            ) : (
              children
            )}
            {loadingAnimationOnRight && <Loader className={styles.iconRight} size={iconSize} />}
            {!loadingAnimationOnRight && iconRight && iconRightAriaLabel && (
              <Icon
                icon={iconRight}
                ariaLabel={iconRightAriaLabel}
                data-test="button-icon-right"
                containerClassName={cn(styles.iconRight, iconRightClassName)}
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
