import React, { createContext, useContext, FC, useMemo, useState, ReactNode } from 'react'
import { useUID } from 'react-uid'

export type TabContextValue = {
  onChange: (value: number) => void
  value: number
  idPrefix: string
}

export const tabContextDefaultValue: TabContextValue = {
  onChange: () => {
    // default function - do nothing
  },
  value: 0,
  idPrefix: '',
}

export const TabContext = createContext<TabContextValue>(tabContextDefaultValue)

export const useTabContext = () => useContext(TabContext)

export type TabContextComponentProps = { children: ReactNode }

export const TabContextComponent: FC<TabContextComponentProps> = ({ children }) => {
  const [value, setValue] = useState<number>(0)

  return (
    <TabContextComponentControlled value={value} onChange={setValue}>
      {children}
    </TabContextComponentControlled>
  )
}

export type TabContextComponentControlledProps = Omit<TabContextValue, 'idPrefix'> & { children: ReactNode }

export const TabContextComponentControlled: FC<TabContextComponentControlledProps> = ({ onChange, value, children }) => {
  const id = useUID()
  const contextValue: TabContextValue = useMemo(
    () => ({
      onChange,
      value,
      idPrefix: id,
    }),
    [onChange, value, id],
  )

  return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
}

export const getTabId = (prefix: string, value: string) => `${prefix}-tab-${value}`

export const getPanelId = (prefix: string, value: string) => `${prefix}-panel-${value}`
