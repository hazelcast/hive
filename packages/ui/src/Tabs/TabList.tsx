import React, { FC, ReactNode, KeyboardEvent, useRef } from 'react'
import cn from 'classnames'

import styles from './TabList.module.scss'

export type TabsProps = {
  ariaLabel: string
  className?: string
  children: ReactNode
}

export const TabList: FC<TabsProps> = ({ ariaLabel, className, children }) => {
  const tabListRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation assumes that TabList has only Tab components as children
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const role = target.getAttribute('role')
    if (role !== 'tab') {
      console.warn('Your Tab component are not siblings. Keyboard navigation will not work as expected.')
      return
    }

    let newFocusTarget: HTMLButtonElement | null = null
    const previousItemKey = 'ArrowLeft'
    const nextItemKey = 'ArrowRight'

    switch (event.key) {
      case previousItemKey:
        newFocusTarget =
          (target.previousElementSibling as HTMLButtonElement) ?? (tabListRef.current?.lastChild as HTMLButtonElement) ?? null
        break
      case nextItemKey:
        newFocusTarget = (target.nextElementSibling as HTMLButtonElement) ?? (tabListRef.current?.firstChild as HTMLButtonElement) ?? null
        break
      case 'Home':
        newFocusTarget = (tabListRef.current?.firstChild as HTMLButtonElement) ?? null
        break
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
  }

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div className={cn(styles.tabList, className)} aria-label={ariaLabel} role="tablist" ref={tabListRef} onKeyDown={handleKeyDown}>
      {children}
    </div>
  )
}
