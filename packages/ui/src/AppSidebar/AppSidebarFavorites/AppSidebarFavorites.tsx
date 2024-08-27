import React, { useContext } from 'react'
import { Star } from 'react-feather'

import { AppSidebarItem } from '../AppSidebarItem'
import { AppSidebarSection } from '../AppSidebarSection'
import { appSidebarContext } from '../appSidebarContext'

import styles from './AppSidebarFavorites.module.scss'

export const AppSidebarFavorites = () => {
  const { favorites, registeredFavorites } = useContext(appSidebarContext)

  return Object.keys(registeredFavorites).length > 0 ? (
    <AppSidebarSection active={false} ariaLabel="favorites" id="favorites" title="Favorites" icon={Star}>
      <div className={styles.content}>
        {favorites.length > 0 ? (
          favorites.map((id) => <AppSidebarItem key={id} id={id} registrable={false} title={registeredFavorites[id].title} />)
        ) : (
          <div className={styles.placeholder} data-test="sidebar-menu-no-favorites">
            No favorites
          </div>
        )}
      </div>
    </AppSidebarSection>
  ) : null
}
