import React, { useContext, useMemo } from 'react'
import cn from 'classnames'
import { Star } from 'react-feather'

import { IconButton } from '../../IconButton'
import { appSidebarContext } from '../appSidebarContext'

import styles from './AppSidebarFavoriteButton.module.scss'

export interface AppSidebarFavoriteButtonProps {
  id: string
  className?: string
}

export const AppSidebarFavoriteButton = ({ id, className }: AppSidebarFavoriteButtonProps) => {
  const { favorites, setFavorites } = useContext(appSidebarContext)
  const isFavoriteItem = useMemo(() => favorites.find((item) => item === id), [favorites, id])

  const handleToggleFavorite = () => {
    if (isFavoriteItem) {
      setFavorites((value) => value.filter((item) => item !== id))
    } else {
      setFavorites((value) => [...value, id])
    }
  }

  return (
    <IconButton
      className={cn(
        styles.root,
        {
          [styles.isFilled]: isFavoriteItem,
        },
        className,
      )}
      onClick={handleToggleFavorite}
      ariaLabel="Favorite Item"
      icon={Star}
      size="medium"
    />
  )
}
