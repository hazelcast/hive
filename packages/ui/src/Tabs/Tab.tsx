import React, { FC, useCallback, KeyboardEvent } from 'react'
// import cn from 'classnames'

import { useTabContext, getTabId, getPanelId } from './TabContext'
import { Button } from '../Button'
import { keyIsOneOf } from '../utils/keyboard'

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

  // We're not automatically following focus: https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus
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
