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
    // default function - do nothing ¯\_(ツ)_/¯
  },
  value: 0,
  idPrefix: '',
  fullWidth: false,
}

/**
 * A context used to pass valid values to Tab and TabPanel components.
 */
export const TabContext = createContext<TabContextValue>(tabContextDefaultValue)

/**
 * A custom hook utilizing context for easy usage.
 */
export const useTabContext = () => useContext(TabContext)

export type TabContextProviderProps = Pick<TabContextValue, 'fullWidth'> & { children: ReactNode }

/**
 * A basic component that keeps track of selected tab.
 * If you want more control over the value state (active tab) you can use TabContextProviderControlled.
 */
export const TabContextProvider: FC<TabContextProviderProps> = ({ fullWidth, children }) => {
  const [value, setValue] = useState<number>(0)

  return (
    <TabContextProviderControlled value={value} onChange={setValue} fullWidth={fullWidth}>
      {children}
    </TabContextProviderControlled>
  )
}

export type TabContextProviderControlledProps = Omit<TabContextValue, 'idPrefix'> & { children: ReactNode }

/**
 * If you want to control the value state (active tab) from outside, this component might come in handy.
 */
export const TabContextProviderControlled: FC<TabContextProviderControlledProps> = ({ onChange, value, fullWidth, children }) => {
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

// Helpers which provide ids from passed values
export const getTabId = (prefix: string, value: string) => `${prefix}-tab-${value}`

export const getPanelId = (prefix: string, value: string) => `${prefix}-panel-${value}`
