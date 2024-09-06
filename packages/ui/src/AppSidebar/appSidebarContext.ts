import { createContext } from 'react'

const noOp: () => void = () => undefined

export interface AppSidebarContext {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  favorites: string[]
  setFavorites: (cb: (value: string[]) => string[]) => void
}
export const appSidebarContext = createContext<AppSidebarContext>({
  open: noOp,
  close: noOp,
  toggle: noOp,
  isOpen: true,
  favorites: [],
  setFavorites: () => [],
})
