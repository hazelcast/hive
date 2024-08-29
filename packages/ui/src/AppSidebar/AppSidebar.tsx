import React, { ReactNode, useCallback, useState } from 'react'
import cn from 'classnames'
import { ChevronsLeft, ChevronsRight } from 'react-feather'
import createPersistedState from 'use-persisted-state'

import { IconButton } from '../IconButton'
import { AppSidebarFavorites } from './AppSidebarFavorites'
import { appSidebarContext, FavoriteItem } from './appSidebarContext'

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
  const [registeredFavorites, setRegisteredFavorites] = useState<Record<string, FavoriteItem>>({})
  const [isOpen, setIsOpen] = usePersistedSidebarStorageState(initialOpen)

  const toggle = useCallback(() => setIsOpen((value) => !value), [setIsOpen])
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])
  const registerFavorite = useCallback(
    (item: FavoriteItem) => setRegisteredFavorites((value) => ({ ...value, [item.id]: item })),
    [setRegisteredFavorites],
  )
  const unregisterFavorite = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (id: string) => setRegisteredFavorites(({ [id]: _, ...value }) => value),
    [setRegisteredFavorites],
  )
  const isCollapsed = controlledOpen !== undefined ? !controlledOpen : !isOpen

  console.log(controlledOpen, isCollapsed)

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
          registeredFavorites,
          setFavorites,
          registerFavorite,
          unregisterFavorite,
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <AppSidebarFavorites />
            {children}
          </div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </appSidebarContext.Provider>
    </aside>
  )
}
