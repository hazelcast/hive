import { createContext } from 'react'

const noOp: () => void = () => undefined

export interface FavoriteItem {
  id: string
  title: string
}
export interface AppSidebarContext {
  isOpen: boolean
  toggle: () => void
  favorites: string[]
  unregisterFavorite: (id: string) => void
  registerFavorite: (item: FavoriteItem) => void
  registeredFavorites: Record<string, FavoriteItem>
  setFavorites: (cb: (value: string[]) => string[]) => void
}
export const appSidebarContext = createContext<AppSidebarContext>({
  isOpen: true,
  toggle: noOp,
  favorites: [],
  setFavorites: () => [],
  registeredFavorites: {},
  registerFavorite: noOp,
  unregisterFavorite: noOp,
})
