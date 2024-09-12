import React, { ReactNode, useCallback } from 'react'
import cn from 'classnames'
import { ChevronsLeft, ChevronsRight } from 'react-feather'
import createPersistedState from 'use-persisted-state'
import { DataTestProp } from '@hazelcast/helpers'

import { IconButton } from '../IconButton'
import { appSidebarContext } from './appSidebarContext'

import styles from './AppSidebar.module.scss'

export interface AppSidebarProps extends DataTestProp {
  children?: ReactNode
  className?: string
  storageKey?: string
  open?: boolean
  initialOpen?: boolean
  footer?: ReactNode
  onChangeState?: (state: Record<string, string>) => void
}

export const AppSidebar = ({
  children,
  className,
  storageKey = 'SideBarMenu',
  open: controlledOpen,
  initialOpen = true,
  footer,
  'data-test': dataTest,
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
    <aside data-test={dataTest} className={cn(styles.root, { [styles.collapsed]: isCollapsed }, className)}>
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
        </div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </appSidebarContext.Provider>
    </aside>
  )
}
