import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'
import { useUID } from 'react-uid'
import mergeRefs from 'react-merge-refs'

import { Icon, IconProps, IconAriaProps } from './Icon'
import { Tooltip, TooltipProps } from './Tooltip'
import { LinkRel, LinkTarget } from './Link'
import { Loader } from './Loader'

import styles from './IconButton.module.scss'

export type IconButtonKind = 'primary' | 'transparent'

type IconButtonCommonProps = {
  icon: FeatherIcon
  size?: IconProps['size']
  iconClassName?: string
  kind?: IconButtonKind
} & IconAriaProps &
  Pick<ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'onClick' | 'className' | 'tabIndex'>

export type IconButtonNotDisabledProps = {
  disabledTooltip?: never
  disabled?: never
  disabledTooltipPlacement?: never
  disabledTooltipVisible?: never
}
export type IconButtonDisabledProps = {
  disabledTooltip: string
  disabled: boolean
  disabledTooltipPlacement?: TooltipProps['placement']
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
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useUID()
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel
    const labelledByFinal = [ariaLabelledBy, disabled ? tooltipId : undefined].filter(Boolean).join(' ')

    return (
      <Tooltip
        id={tooltipId}
        content={disabled ? disabledTooltip : undefined}
        placement={disabledTooltipPlacement}
        visible={disabledTooltipVisible}
      >
        {(tooltipRef) => (
          <Component
            className={cn(
              styles.iconButton,
              {
                [styles.primary]: kind === 'primary',
                [styles.transparent]: kind === 'transparent',
              },
              className,
            )}
            aria-hidden={ariaHidden}
            aria-label={ariaLabel}
            aria-labelledby={labelledByFinal}
            disabled={disabled ?? loading}
            rel={Component === 'a' ? relFinal : undefined}
            target={Component === 'a' ? target : undefined}
            type={Component === 'button' ? type : undefined}
            {...rest}
          >
            <span className={styles.outline} />
            <span className={styles.body} ref={mergeRefs([ref, tooltipRef])}>
              {loading && <Loader size={size} />}
              {!loading && <Icon className={iconClassName} icon={icon} size={size} ariaHidden />}
            </span>
          </Component>
        )}
      </Tooltip>
    )
  },
)
IconButton.displayName = 'IconButton'
