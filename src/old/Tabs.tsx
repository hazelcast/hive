import React, { createContext, useContext, FC, useMemo, useState, ReactNode, useCallback, useRef, MouseEvent, KeyboardEvent } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { DataTestProp } from '../helpers/types'
import { keyIsOneOf } from '../utils/keyboard'

import styles from './TabsLegacy.module.scss'

// ---------- TabContext ----------

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

export const TabContext = createContext<TabContextValue>(tabContextDefaultValue)

export const useTabContext = () => useContext(TabContext)

export type TabContextProviderProps = Pick<TabContextValue, 'fullWidth'> & { children: ReactNode }

export const TabContextProvider: FC<TabContextProviderProps> = ({ fullWidth, children }) => {
  const [value, setValue] = useState<number>(0)

  return (
    <TabContextProviderControlled value={value} onChange={setValue} fullWidth={fullWidth}>
      {children}
    </TabContextProviderControlled>
  )
}

export type TabContextProviderControlledProps = Omit<TabContextValue, 'idPrefix'> & { children: ReactNode }

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

export const getTabId = (prefix: string, value: string) => `${prefix}-tab-${value}`
export const getPanelId = (prefix: string, value: string) => `${prefix}-panel-${value}`

// ---------- TabList ----------

export type TabListProps = {
  ariaLabel: string
  className?: string
  children: ReactNode
}

export const TabList: FC<TabListProps> = ({ ariaLabel, className, children }) => {
  const tabListRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLButtonElement
    const role = target.getAttribute('role')
    if (role !== 'tab') {
      console.warn('Children of TabList component do not have [role="tab"]. Keyboard navigation will not work as expected.')
      return
    }

    let newFocusTarget: HTMLButtonElement | null = null

    switch (event.key) {
      case 'ArrowLeft':
        newFocusTarget =
          (target.previousElementSibling as HTMLButtonElement) ?? (tabListRef.current?.lastChild as HTMLButtonElement) ?? null
        break
      case 'ArrowRight':
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

// ---------- Tab ----------

export type AnchorTabProps = {
  component: 'a'
  href: string
}

export type ButtonTabProps = {
  component?: 'button'
  href?: never
}

type TabTypeProps = AnchorTabProps | ButtonTabProps

type TabLabelProps = {
  children: ReactNode
  ariaLabel?: string
}

export type TabCommonProps = {
  value: number
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement> | KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  className?: string
}
export type TabProps<T = TabTypeProps> = TabCommonProps & T & TabLabelProps

export const Tab: FC<TabProps> = ({ component: Component = 'button', value, href, onClick, children, ariaLabel, className }) => {
  const { onChange, value: activeValue, idPrefix, fullWidth } = useTabContext()
  const selected = value === activeValue

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement> | KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (selected) {
        return
      }

      if (onClick) {
        onClick(event)
      }

      onChange(value)
    },
    [value, selected, onChange, onClick],
  )

  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault()

      if (keyIsOneOf(event, 'Enter', 'Space')) {
        handleClick(event)
      }
    },
    [handleClick],
  )

  return (
    <Component
      className={cn(styles.tab, { [styles.selected]: selected, [styles.fullWidth]: fullWidth }, className)}
      role="tab"
      id={getTabId(idPrefix, value.toString())}
      aria-controls={getPanelId(idPrefix, value.toString())}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onKeyPress={onKeyPress}
      onClick={handleClick}
      {...(Component === 'a' && !selected && { href })}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  )
}

// ---------- TabPanel ----------

export type TabPanelProps = {
  value: number
  children: ReactNode
} & DataTestProp

export const TabPanel: FC<TabPanelProps> = ({ value, children, 'data-test': dataTest }) => {
  const { idPrefix, value: selectedValue } = useTabContext()
  const selected = value === selectedValue

  return (
    <div
      className={cn(styles.tabPanel, { [styles.hidden]: !selected })}
      role="tabpanel"
      data-test={dataTest}
      id={getPanelId(idPrefix, value.toString())}
      aria-labelledby={getTabId(idPrefix, value.toString())}
    >
      {selected ? children : null}
    </div>
  )
}
