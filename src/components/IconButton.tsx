import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'
import { useUID } from 'react-uid'
import mergeRefs from 'react-merge-refs'

import { Icon, IconProps, IconAriaProps } from './Icon'
import { Tooltip, TooltipProps } from './Tooltip'
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
  tooltipPlacement?: TooltipProps['placement']
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
    const labelledByFinal = [ariaLabelledBy, disabled ? tooltipId : undefined].filter(Boolean).join(' ')

    return (
      <Tooltip
        id={tooltipId}
        content={disabled ? disabledTooltip : tooltip}
        placement={disabled ? disabledTooltipPlacement : tooltipPlacement}
        visible={disabled ? disabledTooltipVisible : tooltipVisible}
      >
        {(tooltipRef) => (
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
            aria-labelledby={labelledByFinal}
            disabled={disabled ?? loading}
            rel={Component === 'a' ? relFinal : undefined}
            target={Component === 'a' ? target : undefined}
            type={Component === 'button' ? type : undefined}
            data-test={dataTest}
            {...rest}
          >
            <span className={styles.body} ref={mergeRefs([ref, tooltipRef])}>
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
        )}
      </Tooltip>
    )
  },
)
IconButton.displayName = 'IconButton'
