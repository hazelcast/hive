import React, { FC, ReactNode } from 'react'
import cn from 'classnames'

import { useTabContext, getPanelId, getTabId } from './TabContext'

import styles from './TabPanel.module.scss'

export type TabPanelProps = {
  value: number
  children: ReactNode
}

/**
 * ### Purpose
 * Serves as a container for tab content.
 *
 * ### General Info
 * - Is hidden unless its associated tab control is activated.
 */
export const TabPanel: FC<TabPanelProps> = ({ value, children }) => {
  const { idPrefix, value: selectedValue } = useTabContext()
  const selected = value === selectedValue

  return (
    <div
      className={cn(styles.tabPanel, { [styles.hidden]: !selected })}
      role="tabpanel"
      id={getPanelId(idPrefix, value.toString())}
      aria-labelledby={getTabId(idPrefix, value.toString())}
    >
      {selected ? children : null}
    </div>
  )
}
