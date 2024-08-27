import React, { ReactNode, useCallback, useState } from 'react'
import cn from 'classnames'
import { ChevronsLeft, ChevronsRight } from 'react-feather'
import createPersistedState from 'use-persisted-state'

import { IconButton } from '../IconButton'
import { useOpenCloseState } from '../hooks'
import { AppSidebarFavorites } from './AppSidebarFavorites'
import { appSidebarContext, FavoriteItem } from './appSidebarContext'

import styles from './AppSidebar.module.scss'

export interface AppSidebarProps {
  children?: ReactNode
  className?: string
}

export const AppSidebar = ({ children, className }: AppSidebarProps) => {
  const { isOpen, toggle } = useOpenCloseState(true)
  const usePersistedFavoritesState = createPersistedState<string[]>('sideBarFavorites')
  const [favorites, setFavorites] = usePersistedFavoritesState([])
  const [registeredFavorites, setRegisteredFavorites] = useState<Record<string, FavoriteItem>>({})

  const registerFavorite = useCallback(
    (item: FavoriteItem) => setRegisteredFavorites((value) => ({ ...value, [item.id]: item })),
    [setRegisteredFavorites],
  )
  const unregisterFavorite = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (id: string) => setRegisteredFavorites(({ [id]: _, ...value }) => value),
    [setRegisteredFavorites],
  )

  return (
    <aside className={cn(styles.root, { [styles.collapsed]: !isOpen }, className)}>
      <IconButton size="medium" icon={isOpen ? ChevronsLeft : ChevronsRight} onClick={toggle} className={styles.toggle} />
      <appSidebarContext.Provider
        value={{ isOpen, toggle, favorites, registeredFavorites, setFavorites, registerFavorite, unregisterFavorite }}
      >
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <AppSidebarFavorites />
            {children}
          </div>
        </div>
      </appSidebarContext.Provider>
    </aside>
  )
}
