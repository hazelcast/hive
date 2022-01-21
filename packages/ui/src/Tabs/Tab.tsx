import React, { FC, useCallback, MouseEvent, KeyboardEvent, ReactNode } from 'react'
import cn from 'classnames'

import { Icon, IconProps } from '../Icon'
import { useTabContext, getTabId, getPanelId } from './TabContext'
import { keyIsOneOf } from '../utils/keyboard'

import styles from './Tab.module.scss'

export type AnchorTabProps = {
  component: 'a'
  href: string
}

export type ButtonTabProps = {
  component?: 'button'
  href?: never
}

type TabTypeProps = AnchorTabProps | ButtonTabProps

type TabLabelProps =
  | {
      /** @deprecated The property should not be used */
      label: string
      icon: IconProps['icon']
      iconAriaLabel: string
      children?: never
      ariaLabel?: never
    }
  | {
      /** @deprecated The property should not be used */
      label: string
      icon?: never
      iconAriaLabel?: never
      children?: never
      ariaLabel?: never
    }
  | {
      label?: never
      icon?: never
      iconAriaLabel?: never
      children: ReactNode
      ariaLabel: string
    }

export type TabCommonProps = {
  value: number
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement> | KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}
export type TabProps<T = TabTypeProps> = TabCommonProps & T & TabLabelProps

/**
 * ### Purpose
 * A single tab implementation that works together with TabContext and TabList components.
 *
 * ### General Info
 * - Use as a direct child of TabList component.
 * - Implemented as `Tabs with Manual Activation` since displaying a new panel in some cases might
 * cause a network request and therefore devastate the experience for keyboard/screen reader users.
 * More info - https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus
 *
 */
export const Tab: FC<TabProps> = ({
  component: Component = 'button',
  /**
   * @deprecated The property should not be used
   */
  label,
  value,
  href,
  onClick,
  /** @deprecated The property should not be used */
  icon,
  /** @deprecated The property should not be used */
  iconAriaLabel,
  children,
  ariaLabel,
}) => {
  const { onChange, value: activeValue, idPrefix, fullWidth } = useTabContext()
  const selected = value === activeValue

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement> | KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (selected) {
        return
      }

      if (onClick) {
        onClick(event)
      }

      onChange(value)
    },
    [value, selected, onChange, onClick],
  )

  // Since we're not automatically following focus we have
  // to handle keyboard selection with Enter and Space ourselves.
  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault()

      if (keyIsOneOf(event, 'Enter', 'Space')) {
        handleClick(event)
      }
    },
    [handleClick],
  )

  return (
    <Component
      className={cn(styles.tab, { [styles.selected]: selected, [styles.fullWidth]: fullWidth })}
      role="tab"
      id={getTabId(idPrefix, value.toString())}
      aria-controls={getPanelId(idPrefix, value.toString())}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onKeyPress={onKeyPress}
      onClick={handleClick}
      {...(Component === 'a' && selected && href)}
      aria-label={label ?? ariaLabel}
    >
      {children
        ? children
        : (icon && iconAriaLabel && (
            <span>
              <Icon icon={icon} ariaLabel={iconAriaLabel} className={styles.icon} />
              {label}
            </span>
          )) ??
          label}
    </Component>
  )
}
