import React, { FC, ReactNode } from 'react'

import { useTabContext, getPanelId, getTabId } from './TabContext'

export type TabPanelProps = {
  value: number
  children: ReactNode
}

export const TabPanel: FC<TabPanelProps> = ({ value, children }) => {
  const { idPrefix, value: selectedValue } = useTabContext()
  const selected = value === selectedValue

  if (selected) {
    return (
      <div role="tabpanel" id={getPanelId(idPrefix, value.toString())} aria-labelledby={getTabId(idPrefix, value.toString())}>
        {children}
      </div>
    )
  }

  return null
}
