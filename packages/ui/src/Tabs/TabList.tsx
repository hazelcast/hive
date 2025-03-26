import React, { FC, ReactNode, KeyboardEvent, useRef, useCallback } from 'react'
import cn from 'classnames'

import styles from './TabList.module.scss'

export type TabListProps = {
  ariaLabel: string
  className?: string
  children: ReactNode
}

/**
 * ### Purpose
 * A base component for building tabs (apart from TabContext). Use as a parent for Tab components.
 *
 * ### General Info
 * - Expects direct children to have [role="tab"].
 * - Implemented according to best practices: https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html.
 */
export const TabList: FC<TabListProps> = ({ ariaLabel, className, children }) => {
  const tabListRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation assumes that the direct children have [role="tab"]
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLButtonElement
    const role = target.getAttribute('role')
    if (role !== 'tab') {
      console.warn('Children of TabList component do not have [role="tab"]. Keyboard navigation will not work as expected.')
      return
    }

    let newFocusTarget: HTMLButtonElement | null = null
    const previousItemKey = 'ArrowLeft'
    const nextItemKey = 'ArrowRight'

    switch (event.key) {
      // When a tab has focus:
      // - Moves focus to the previous tab.
      // - If focus is on the first tab, moves focus to the last tab.
      case previousItemKey:
        newFocusTarget =
          (target.previousElementSibling as HTMLButtonElement) ?? (tabListRef.current?.lastChild as HTMLButtonElement) ?? null
        break
      // When a tab has focus:
      // - Moves focus to the next tab.
      // - If focus is on the last tab, moves focus to the first tab.
      case nextItemKey:
        newFocusTarget = (target.nextElementSibling as HTMLButtonElement) ?? (tabListRef.current?.firstChild as HTMLButtonElement) ?? null
        break
      // When a tab has focus, moves focus to the first tab.
      case 'Home':
        newFocusTarget = (tabListRef.current?.firstChild as HTMLButtonElement) ?? null
        break
      // When a tab has focus, moves focus to the last tab.
      case 'End':
        newFocusTarget = (tabListRef.current?.lastChild as HTMLButtonElement) ?? null
        break
      default:
        break
    }

    if (newFocusTarget !== null) {
      newFocusTarget.focus()
      event.preventDefault()
    }
  }, [])

  return (
    <div
      data-test="tab-list"
      className={cn(styles.tabList, className)}
      aria-label={ariaLabel}
      role="tablist"
      ref={tabListRef}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}
