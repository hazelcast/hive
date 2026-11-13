import React, { ReactNode, useCallback } from 'react'
import cn from 'classnames'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'

import { DataTestProp } from '../../helpers/types'
import { IconButton } from '../IconButton'
import { createPersistedState } from '../../hooks'
import { appSidebarContext, sidebarStorageKey } from './appSidebarContext'

import styles from './AppSidebar.module.css'

export interface AppSidebarProps extends DataTestProp {
  children?: ReactNode
  className?: string
  storageKey?: string
  open?: boolean
  initialOpen?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: 'legacy' | 'modern'
  hideToggle?: boolean
  footer?: ReactNode
  hideFooterWhenCollapsed?: boolean
}

type AppSidebarInternalProps = AppSidebarProps & { namespaceStorage?: boolean }

const validFavorites = (value: unknown): string[] => (Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : [])

export const AppSidebarWithStorageNamespace = (props: AppSidebarInternalProps) => (
  <AppSidebarContent key={props.storageKey ?? 'SideBarMenu'} {...props} />
)

const AppSidebarContent = ({
  children,
  className,
  storageKey = 'SideBarMenu',
  open: controlledOpen,
  initialOpen = true,
  onOpenChange,
  variant = 'legacy',
  namespaceStorage = false,
  hideToggle = false,
  footer,
  hideFooterWhenCollapsed = false,
  'data-test': dataTest,
}: AppSidebarInternalProps) => {
  const usePersistedSidebarStorageState = createPersistedState<boolean>(storageKey, { preserveFalsyValues: variant === 'modern' })
  const usePersistedFavoritesState = createPersistedState<string[]>(
    sidebarStorageKey(storageKey, 'favorites', undefined, variant === 'modern' && namespaceStorage),
  )

  const [storedFavorites, setStoredFavorites] = usePersistedFavoritesState([])
  const [isOpen, setIsOpen] = usePersistedSidebarStorageState(initialOpen)
  const favorites = validFavorites(storedFavorites)
  const setFavorites = useCallback(
    (update: (value: string[]) => string[]) => setStoredFavorites((value) => update(validFavorites(value))),
    [setStoredFavorites],
  )

  const currentOpen = controlledOpen ?? isOpen
  const setOpen = useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) setIsOpen(value)
      onOpenChange?.(value)
    },
    [controlledOpen, onOpenChange, setIsOpen],
  )
  const toggle = useCallback(() => setOpen(!currentOpen), [currentOpen, setOpen])
  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const isCollapsed = !currentOpen
  const expandedIcon = variant === 'modern' ? ChevronLeft : ChevronsLeft
  const collapsedIcon = variant === 'modern' ? ChevronRight : ChevronsRight

  return (
    <aside
      data-test={dataTest}
      className={cn(styles.root, { [styles.collapsed]: isCollapsed, [styles.modern]: variant === 'modern' }, className)}
    >
      {!hideToggle && (
        <IconButton
          variant="ghost"
          ariaLabel={!isCollapsed ? 'Collapse sidebar' : 'Expand sidebar'}
          icon={isCollapsed ? collapsedIcon : expandedIcon}
          onClick={toggle}
          className={styles.toggle}
        />
      )}
      <appSidebarContext.Provider
        value={{
          open,
          close,
          isOpen: !isCollapsed,
          storageKey,
          namespaceStorage: variant === 'modern' && namespaceStorage,
          variant,
          toggle,
          favorites,
          setFavorites,
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
        </div>
        {footer && (!hideFooterWhenCollapsed || !isCollapsed) && <footer className={styles.footer}>{footer}</footer>}
      </appSidebarContext.Provider>
    </aside>
  )
}
