import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Home } from 'react-feather'

import { AppSidebar, AppSidebarItem, AppSidebarSection } from '../../../src/components/AppSidebar'
import { SideNavigation } from '../../../src/components/SideNavigation'

describe('AppSidebar', () => {
  beforeEach(() => localStorage.clear())

  it('requests a controlled open change without changing its own state', () => {
    const onOpenChange = jest.fn()
    render(<AppSidebar open onOpenChange={onOpenChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
  })

  it('updates uncontrolled state and notifies the caller', () => {
    const onOpenChange = jest.fn()
    render(<AppSidebar initialOpen onOpenChange={onOpenChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
  })

  it('uses the initial open state for a stored false value in the legacy sidebar', () => {
    const { unmount } = render(<AppSidebar storageKey="sidebar-test" initialOpen />)
    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(localStorage.getItem('sidebar-test')).toBe('false')
    unmount()

    render(<AppSidebar storageKey="sidebar-test" initialOpen />)
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
  })

  it('only hides the footer when explicitly requested', () => {
    const { rerender } = render(<AppSidebar open={false} footer="Footer" />)
    expect(screen.getByText('Footer')).toBeInTheDocument()
    rerender(<AppSidebar open={false} footer="Footer" hideFooterWhenCollapsed />)
    expect(screen.queryByText('Footer')).not.toBeInTheDocument()
    rerender(<AppSidebar open footer="Footer" hideFooterWhenCollapsed />)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('retains the original favorites and section keys for the default sidebar', () => {
    localStorage.setItem('sideBarFavorites', JSON.stringify(['maps']))
    localStorage.setItem('isOpen::Storage', 'true')
    render(
      <AppSidebar variant="modern">
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active={false}>
          <AppSidebarItem id="maps" title="Maps" />
        </AppSidebarSection>
      </AppSidebar>,
    )
    expect(screen.getByRole('button', { name: 'Storage' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Favorite Item' })).toHaveClass('isFilled')
    fireEvent.click(screen.getByRole('button', { name: 'Favorite Item' }))
    fireEvent.click(screen.getByRole('button', { name: 'Storage' }))
    expect(JSON.parse(localStorage.getItem('sideBarFavorites') as string)).toEqual([])
    expect(localStorage.getItem('isOpen::Storage')).toBe('false')
  })

  it('uses global favorites and section keys with a custom legacy storageKey', () => {
    localStorage.setItem('sideBarFavorites', JSON.stringify(['maps']))
    localStorage.setItem('isOpen::Storage', 'true')
    render(
      <AppSidebar storageKey="custom">
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active={false}>
          <AppSidebarItem id="maps" title="Maps" />
        </AppSidebarSection>
      </AppSidebar>,
    )
    expect(screen.getByRole('button', { name: 'Favorite Item' })).toHaveClass('isFilled')
    fireEvent.click(screen.getByRole('button', { name: 'Favorite Item' }))
    fireEvent.click(screen.getByText('Storage').closest('button') as HTMLButtonElement)
    expect(localStorage.getItem('sideBarFavorites')).toBe('[]')
    expect(localStorage.getItem('isOpen::Storage')).toBe('false')
  })

  it.each(['null', '{}', '[1]'])('recovers from invalid stored favorites %s when toggled', (storedValue) => {
    localStorage.setItem('sideBarFavorites', storedValue)
    localStorage.setItem('isOpen::Storage', 'true')
    render(
      <AppSidebar>
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active={false}>
          <AppSidebarItem id="maps" title="Maps" />
        </AppSidebarSection>
      </AppSidebar>,
    )
    const favorite = screen.getByRole('button', { name: 'Favorite Item' })
    expect(favorite).not.toHaveClass('isFilled')
    expect(localStorage.getItem('sideBarFavorites')).toBe(storedValue)
    fireEvent.click(favorite)
    expect(localStorage.getItem('sideBarFavorites')).toBe('["maps"]')
  })

  it('uses global favorites and sections for modern navigation by default', () => {
    localStorage.setItem('sideBarFavorites', '["maps"]')
    localStorage.setItem('isOpen::Storage', 'true')
    render(
      <SideNavigation ariaLabel="Main" storageKey="custom">
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active={false}>
          <AppSidebarItem id="maps" title="Maps" />
        </AppSidebarSection>
      </SideNavigation>,
    )
    expect(screen.getByRole('button', { name: 'Storage' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Favorite Item' })).toHaveClass('isFilled')
  })

  it('isolates favorites and sections when modern navigation opts into namespacing', () => {
    localStorage.setItem('sideBarFavorites', JSON.stringify(['maps']))
    localStorage.setItem('isOpen::Storage', 'true')
    const sidebar = (storageKey: string) => (
      <SideNavigation ariaLabel="Main" storageKey={storageKey} namespaceStorage>
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active={false}>
          <AppSidebarItem id="maps" title="Maps" />
        </AppSidebarSection>
      </SideNavigation>
    )
    const { rerender } = render(sidebar('first'))
    expect(screen.getByRole('button', { name: 'Storage' })).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(screen.getByRole('button', { name: 'Storage' }))
    fireEvent.click(screen.getByRole('button', { name: 'Favorite Item' }))
    expect(screen.getByRole('button', { name: 'Favorite Item' })).toHaveClass('isFilled')
    rerender(sidebar('second'))
    expect(screen.getByRole('button', { name: 'Storage' })).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(screen.getByRole('button', { name: 'Storage' }))
    expect(screen.getByRole('button', { name: 'Favorite Item' })).not.toHaveClass('isFilled')
    rerender(sidebar('first'))
    expect(screen.getByRole('button', { name: 'Storage' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Favorite Item' })).toHaveClass('isFilled')
    expect(localStorage.getItem('sideBarFavorites')).toBe('["maps"]')
    expect(localStorage.getItem('isOpen::Storage')).toBe('true')
  })

  it('does not reopen an active section after the user closes it', () => {
    jest.useFakeTimers()
    try {
      render(
        <AppSidebar variant="modern">
          <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active>
            <AppSidebarItem title="Maps" />
          </AppSidebarSection>
        </AppSidebar>,
      )
      fireEvent.click(screen.getByRole('button', { name: 'Storage' }))
      jest.runAllTimers()
      expect(screen.getByRole('button', { name: 'Storage' })).toHaveAttribute('aria-expanded', 'false')
      expect(localStorage.getItem('isOpen::Storage')).toBe('false')
    } finally {
      jest.useRealTimers()
    }
  })
})
