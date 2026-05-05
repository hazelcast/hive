import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'
import { useUID } from 'react-uid'

import { Icon, IconAriaProps, IconSize } from './Icon'
import { ButtonVariant, ButtonColor, ButtonSize } from './Button'
import { Tooltip, TooltipSide } from './Tooltip'
import { LinkRel, LinkTarget } from './Link'
import { Loader } from './Loader'
import { DataTestProp } from '../helpers/types'

import styles from './IconButton.module.css'

type IconButtonCommonProps = {
  icon: FeatherIcon
  iconClassName?: string
  iconColor?: string
  iconRole?: string
  loaderRole?: string
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  tooltip?: string
  tooltipVisible?: boolean
  tooltipPlacement?: TooltipSide
} & DataTestProp &
  IconAriaProps &
  Pick<ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'onClick' | 'onMouseDown' | 'className' | 'tabIndex' | 'style'>

export type IconButtonNotDisabledProps = {
  disabledTooltip?: never
  disabled?: never
  disabledTooltipPlacement?: never
  disabledTooltipVisible?: never
}
export type IconButtonDisabledProps = {
  disabledTooltip: string
  disabled: boolean
  disabledTooltipPlacement?: TooltipSide
  disabledTooltipVisible?: boolean
}
type IconButtonComponentProps =
  | ({
      component: 'a'
      href: string
      target?: LinkTarget
      rel?: LinkRel | LinkRel[]
      type?: never
      loading?: never
    } & IconButtonNotDisabledProps)
  | ({
      component?: 'button'
      href?: never
      target?: never
      rel?: never
      loading?: boolean
    } & (IconButtonDisabledProps | IconButtonNotDisabledProps) &
      Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'autoFocus' | 'type'>)
export type IconButtonProps = IconButtonCommonProps & IconButtonComponentProps

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

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  (
    {
      component: Component = 'button',
      icon,
      iconClassName,
      iconColor,
      iconRole,
      loaderRole,
      className,
      variant = 'contained',
      color = 'primary',
      size = 'regular',
      ariaHidden,
      ariaLabelledBy,
      ariaLabel,
      disabled,
      disabledTooltip,
      disabledTooltipVisible,
      disabledTooltipPlacement,
      rel = 'noopener',
      target,
      type = 'button',
      loading,
      tooltip,
      tooltipPlacement,
      tooltipVisible,
      'data-test': dataTest = 'icon-button',
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useUID()
    const iconSize: IconSize = size === 'small' ? 'small' : 'medium'
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel
    const labelledByFinal = [ariaLabelledBy, disabled ? tooltipId : undefined].filter(Boolean).join(' ')

    return (
      <Tooltip
        id={tooltipId}
        content={disabled ? disabledTooltip : tooltip}
        side={disabled ? disabledTooltipPlacement : tooltipPlacement}
        open={disabled ? disabledTooltipVisible : tooltipVisible}
      >
        <Component
          className={cn(styles.iconButton, variantClass[variant], colorClass[color], sizeClass[size], className)}
          aria-hidden={ariaHidden}
          aria-label={ariaLabel}
          aria-labelledby={labelledByFinal}
          disabled={disabled ?? loading}
          rel={Component === 'a' ? relFinal : undefined}
          target={Component === 'a' ? target : undefined}
          type={Component === 'button' ? type : undefined}
          data-test={dataTest}
          {...rest}
        >
          <span className={styles.body} ref={ref}>
            {loading && <Loader role={loaderRole} size={iconSize} />}
            {!loading && (
              <Icon
                role={iconRole}
                className={iconClassName}
                color={iconColor}
                data-test={`${dataTest}-icon`}
                icon={icon}
                size={iconSize}
                ariaHidden
              />
            )}
          </span>
        </Component>
      </Tooltip>
    )
  },
)
IconButton.displayName = 'IconButton'
