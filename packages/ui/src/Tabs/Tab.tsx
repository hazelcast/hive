import React, { FC, useCallback, KeyboardEvent } from 'react'
import cn from 'classnames'

import { useTabContext, getTabId, getPanelId } from './TabContext'
import { Button } from '../Button'
import { keyIsOneOf } from '../utils/keyboard'

import styles from './Tab.module.scss'

export type TabProps = {
  label: string
  value: number
}

export const Tab: FC<TabProps> = ({ label, value }) => {
  const { onChange, value: activeValue, idPrefix } = useTabContext()
  const selected = value === activeValue

  const handleClick = useCallback(() => {
    onChange(value)
  }, [value, onChange])

  // Since we're not automatically following focus we have
  // to handle keyboard selection with Enter and Space ourselves.
  // More info: https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus
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
    <Button
      className={cn(styles.tab, { [styles.selected]: selected })}
      kind="secondary"
      role="tab"
      id={getTabId(idPrefix, value.toString())}
      aria-controls={getPanelId(idPrefix, value.toString())}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onKeyPress={onKeyPress}
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}
