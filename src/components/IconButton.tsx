import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'
import { useUID } from 'react-uid'

import { Icon, IconProps, IconAriaProps } from './Icon'
import { SimpleTooltip, TooltipPlacement } from './Tooltip'
import { LinkRel, LinkTarget } from './Link'
import { Loader } from './Loader'
import { DataTestProp } from '../helpers/types'

import styles from './IconButton.module.scss'

export type IconButtonKind = 'primary' | 'transparent'

type IconButtonCommonProps = {
  icon: FeatherIcon
  iconClassName?: string
  iconColor?: string
  iconRole?: string
  loaderRole?: string
  kind?: IconButtonKind
  size?: IconProps['size']
  padding?: 'normal'
  tooltip?: string
  tooltipVisible?: boolean
  tooltipPlacement?: TooltipPlacement
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
  disabledTooltipPlacement?: TooltipPlacement
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
      size,
      kind = 'transparent',
      ariaHidden,
      ariaLabelledBy,
      ariaLabel,
      // Disabled tooltip
      disabled,
      disabledTooltip,
      disabledTooltipVisible,
      disabledTooltipPlacement,
      rel = 'noopener',
      target,
      type = 'button',
      loading,
      padding,
      tooltip,
      tooltipPlacement,
      tooltipVisible,
      'data-test': dataTest = 'icon-button',
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useUID()
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel
    const tooltipContent = disabled ? disabledTooltip : tooltip
    const tooltipSide = disabled ? disabledTooltipPlacement : tooltipPlacement
    const tooltipOpen =
      // eslint-disable-next-line no-nested-ternary
      typeof (disabled ? disabledTooltipVisible : tooltipVisible) === 'boolean'
        ? disabled
          ? disabledTooltipVisible
          : tooltipVisible
        : undefined
    const labelledByFinal = [ariaLabelledBy, tooltipContent ? tooltipId : undefined].filter(Boolean).join(' ')

    const buttonElement = (
      <Component
        className={cn(
          styles.iconButton,
          {
            [styles.primary]: kind === 'primary',
            [styles.transparent]: kind === 'transparent',
            [styles.paddingNormal]: padding === 'normal',
          },
          className,
        )}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        aria-labelledby={labelledByFinal || undefined}
        disabled={disabled ?? loading}
        rel={Component === 'a' ? relFinal : undefined}
        target={Component === 'a' ? target : undefined}
        type={Component === 'button' ? type : undefined}
        data-test={dataTest}
        ref={ref as React.Ref<any>}
        {...rest}
      >
        <span className={styles.body}>
          {loading && <Loader role={loaderRole} size={size} />}
          {!loading && (
            <Icon
              role={iconRole}
              className={iconClassName}
              color={iconColor}
              data-test={`${dataTest}-icon`}
              icon={icon}
              size={size}
              ariaHidden
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
IconButton.displayName = 'IconButton'
