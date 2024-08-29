import { createContext } from 'react'

const noOp: () => void = () => undefined

export interface FavoriteItem {
  id: string
  title: string
}
export interface AppSidebarContext {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  favorites: string[]
  unregisterFavorite: (id: string) => void
  registerFavorite: (item: FavoriteItem) => void
  registeredFavorites: Record<string, FavoriteItem>
  setFavorites: (cb: (value: string[]) => string[]) => void
}
export const appSidebarContext = createContext<AppSidebarContext>({
  open: noOp,
  close: noOp,
  toggle: noOp,
  isOpen: true,
  favorites: [],
  setFavorites: () => [],
  registeredFavorites: {},
  registerFavorite: noOp,
  unregisterFavorite: noOp,
})
