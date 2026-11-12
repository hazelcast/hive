import { createContext } from 'react'

const noOp: () => void = () => undefined

export const sidebarStorageKey = (storageKey: string, type: 'favorites' | 'section', title?: string, namespaceStorage = false) => {
  if (!namespaceStorage) return type === 'favorites' ? 'sideBarFavorites' : `isOpen::${title}`
  return `hive:sidebar:${JSON.stringify([storageKey, type, title])}`
}

export interface AppSidebarContext {
  isOpen: boolean
  storageKey: string
  namespaceStorage: boolean
  variant?: 'legacy' | 'modern'
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
  storageKey: 'SideBarMenu',
  namespaceStorage: false,
  favorites: [],
  setFavorites: () => [],
})
