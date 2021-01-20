import React, { createContext, useContext, FC, useMemo, useState, ReactNode } from 'react'
import { useUID } from 'react-uid'

export type TabContextValue = {
  onChange: (value: number) => void
  value: number
  idPrefix: string
  fullWidth?: boolean
}

export const tabContextDefaultValue: TabContextValue = {
  onChange: () => {
    // default function - do nothing
  },
  value: 0,
  idPrefix: '',
  fullWidth: false,
}

export const TabContext = createContext<TabContextValue>(tabContextDefaultValue)

export const useTabContext = () => useContext(TabContext)

export type TabContextComponentProps = { fullWidth?: boolean; children: ReactNode }

// If you want more control over the value state (active tab) you can use TabContextComponentControlled
export const TabContextComponent: FC<TabContextComponentProps> = ({ fullWidth, children }) => {
  const [value, setValue] = useState<number>(0)

  return (
    <TabContextComponentControlled value={value} onChange={setValue} fullWidth={fullWidth}>
      {children}
    </TabContextComponentControlled>
  )
}

export type TabContextComponentControlledProps = Omit<TabContextValue, 'idPrefix'> & { children: ReactNode }

export const TabContextComponentControlled: FC<TabContextComponentControlledProps> = ({ onChange, value, fullWidth, children }) => {
  const id = useUID()
  const contextValue: TabContextValue = useMemo(
    () => ({
      onChange,
      value,
      idPrefix: id,
      fullWidth,
    }),
    [onChange, value, id, fullWidth],
  )

  return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
}

export const getTabId = (prefix: string, value: string) => `${prefix}-tab-${value}`

export const getPanelId = (prefix: string, value: string) => `${prefix}-panel-${value}`
