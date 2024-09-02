import React, { ReactNode, useCallback } from 'react'
import cn from 'classnames'
import { ChevronsLeft, ChevronsRight } from 'react-feather'
import createPersistedState from 'use-persisted-state'

import { IconButton } from '../IconButton'
import { appSidebarContext } from './appSidebarContext'

import styles from './AppSidebar.module.scss'

export interface AppSidebarProps {
  children?: ReactNode
  className?: string
  storageKey?: string
  open?: boolean
  initialOpen?: boolean
  footer?: ReactNode
}

export const AppSidebar = ({
  children,
  className,
  storageKey = 'SideBarMenu',
  open: controlledOpen,
  initialOpen = true,
  footer,
}: AppSidebarProps) => {
  const usePersistedSidebarStorageState = createPersistedState<boolean>(storageKey)
  const usePersistedFavoritesState = createPersistedState<string[]>('sideBarFavorites')

  const [favorites, setFavorites] = usePersistedFavoritesState([])
  const [isOpen, setIsOpen] = usePersistedSidebarStorageState(initialOpen)

  const toggle = useCallback(() => setIsOpen((value) => !value), [setIsOpen])
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])
  const isCollapsed = controlledOpen !== undefined ? !controlledOpen : !isOpen

  return (
    <aside className={cn(styles.root, { [styles.collapsed]: isCollapsed }, className)}>
      <IconButton size="medium" icon={!isCollapsed ? ChevronsLeft : ChevronsRight} onClick={toggle} className={styles.toggle} />
      <appSidebarContext.Provider
        value={{
          open,
          close,
          isOpen: !isCollapsed,
          toggle,
          favorites,
          setFavorites,
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </appSidebarContext.Provider>
    </aside>
  )
}
