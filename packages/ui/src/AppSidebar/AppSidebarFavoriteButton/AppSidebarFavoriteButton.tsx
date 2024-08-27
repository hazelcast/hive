import React, { MouseEvent, useContext, useEffect, useMemo } from 'react'
import cn from 'classnames'
import { Star } from 'react-feather'

import { IconButton } from '../../IconButton'
import { appSidebarContext } from '../appSidebarContext'

import styles from './AppSidebarFavoriteButton.module.scss'

export interface AppSidebarFavoriteButtonProps {
  id: string
  title: string
  className?: string
  registrable?: boolean
}

export const AppSidebarFavoriteButton = ({ id, title, className, registrable }: AppSidebarFavoriteButtonProps) => {
  const { favorites, setFavorites, registerFavorite, unregisterFavorite } = useContext(appSidebarContext)
  const isFavoriteItem = useMemo(() => favorites.find((item) => item === id), [favorites, id])

  const handleToggleFavorite = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavoriteItem) {
      setFavorites((value) => value.filter((item) => item !== id))
    } else {
      setFavorites((value) => [...value, id])
    }
  }

  useEffect(() => {
    if (registrable) {
      registerFavorite({ id, title })
    }
    return () => {
      if (registrable) {
        unregisterFavorite(id)
      }
    }
  }, [registerFavorite, registrable, id, title, unregisterFavorite])

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
