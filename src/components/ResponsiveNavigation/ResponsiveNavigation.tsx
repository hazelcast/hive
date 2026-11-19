import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react'

export interface ResponsiveNavigationValue {
  isMobile: boolean
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

export interface ResponsiveNavigationProviderProps {
  /** Viewport width in px below which navigation is mobile. */
  breakpoint: number
  children: ReactNode
}

const defaultValue: ResponsiveNavigationValue = { isMobile: false, mobileOpen: false, setMobileOpen: () => undefined }

const ResponsiveNavigationContext = createContext<ResponsiveNavigationValue>(defaultValue)

const useIsBelowBreakpoint = (breakpoint: number) => {
  const query = `(max-width: ${breakpoint - 1}px)`
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia?.(query)
      media?.addEventListener('change', onChange)
      return () => media?.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia?.(query).matches ?? false,
    () => false,
  )
}

export const ResponsiveNavigationProvider = ({ breakpoint, children }: ResponsiveNavigationProviderProps) => {
  const isMobile = useIsBelowBreakpoint(breakpoint)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  const value = useMemo(() => ({ isMobile, mobileOpen: isMobile && open, setMobileOpen: setOpen }), [isMobile, open])

  return <ResponsiveNavigationContext.Provider value={value}>{children}</ResponsiveNavigationContext.Provider>
}

export const useResponsiveNavigation = () => useContext(ResponsiveNavigationContext)
