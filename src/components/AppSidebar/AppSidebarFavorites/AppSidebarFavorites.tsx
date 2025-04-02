import React, { ReactNode, useContext } from 'react'
import { Star } from 'react-feather'

import { AppSidebarSection } from '../AppSidebarSection'
import { appSidebarContext } from '../appSidebarContext'

import styles from './AppSidebarFavorites.module.scss'

export interface AppSidebarFavoritesProps {
  children: (props: { items: string[] }) => ReactNode
}

export const AppSidebarFavorites = ({ children }: AppSidebarFavoritesProps) => {
  const { favorites } = useContext(appSidebarContext)

  return (
    <AppSidebarSection active={false} ariaLabel="favorites" id="favorites" title="Favorites" icon={Star}>
      <div className={styles.content}>
        {favorites.length > 0 ? (
          children({ items: favorites })
        ) : (
          <div className={styles.placeholder} data-test="sidebar-menu-no-favorites">
            No favorites
          </div>
        )}
      </div>
    </AppSidebarSection>
  )
}
