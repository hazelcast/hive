import React, { FC, useCallback, KeyboardEvent } from 'react'
import cn from 'classnames'

import { useTabContext, getTabId, getPanelId } from './TabContext'
import { keyIsOneOf } from '../utils/keyboard'

import styles from './Tab.module.scss'

export type TabProps = {
  label: string
  value: number
}

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
export const Tab: FC<TabProps> = ({ label, value }) => {
  const { onChange, value: activeValue, idPrefix, fullWidth } = useTabContext()
  const selected = value === activeValue

  const handleClick = useCallback(() => {
    onChange(value)
  }, [value, onChange])

  // Since we're not automatically following focus we have
  // to handle keyboard selection with Enter and Space ourselves.
  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      event.preventDefault()

      if (keyIsOneOf(event, 'Enter', 'Space')) {
        handleClick()
      }
    },
    [handleClick],
  )

  return (
    <button
      className={cn(styles.tab, { [styles.selected]: selected, [styles.fullWidth]: fullWidth })}
      role="tab"
      id={getTabId(idPrefix, value.toString())}
      aria-controls={getPanelId(idPrefix, value.toString())}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onKeyPress={onKeyPress}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}
