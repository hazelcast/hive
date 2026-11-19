import React, { useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from 'react-feather'

import {
  SideNavigation,
  SideNavigationExpandableSection,
  SideNavigationItem,
  SideNavigationLinkProps,
  SideNavigationSection,
} from '../../../src/components/SideNavigation'
import { AppSidebarItem, AppSidebarSection } from '../../../src/components/AppSidebar'
import sidebarStyles from '../../../src/components/AppSidebar/AppSidebar.module.css'
import styles from '../../../src/components/SideNavigation/SideNavigation.module.css'

describe('SideNavigation', () => {
  const originalGetAnimations = Object.getOwnPropertyDescriptor(Element.prototype, 'getAnimations')

  beforeAll(() => {
    Object.defineProperty(Element.prototype, 'getAnimations', { configurable: true, value: () => [] })
  })

  afterAll(() => {
    if (originalGetAnimations) Object.defineProperty(Element.prototype, 'getAnimations', originalGetAnimations)
    else Reflect.deleteProperty(Element.prototype, 'getAnimations')
  })

  beforeEach(() => localStorage.clear())

  it('keeps the leading action independent of the primary row and hides it in the collapsed rail', async () => {
    const user = userEvent.setup()
    const onNavigate = jest.fn()
    const onFavorite = jest.fn()
    const row = (
      <SideNavigationItem
        nested
        label="Members"
        badge={3}
        data-test="sidebar-menu-item-title"
        onClick={onNavigate}
        leadingAction={<button onClick={onFavorite}>Favorite Members</button>}
      />
    )
    const { rerender } = render(
      <SideNavigation ariaLabel="Main navigation" open>
        {row}
      </SideNavigation>,
    )
    const item = screen.getByTestId('sidebar-menu-item-title')
    const favorite = screen.getByRole('button', { name: 'Favorite Members' })

    expect(item).toHaveClass(styles.indented)
    expect(item).toHaveTextContent('Members3')
    expect(item).not.toContainElement(favorite)
    item.focus()
    await user.tab()
    expect(favorite).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onFavorite).toHaveBeenCalledTimes(1)
    expect(onNavigate).not.toHaveBeenCalled()
    await user.click(item)
    expect(onNavigate).toHaveBeenCalledTimes(1)

    rerender(
      <SideNavigation ariaLabel="Main navigation" open={false}>
        {row}
      </SideNavigation>,
    )
    expect(screen.queryByRole('button', { name: 'Favorite Members' })).not.toBeInTheDocument()
    expect(screen.getByTestId('sidebar-menu-item-title')).not.toHaveClass(styles.indented)
  })

  it('exposes stable class hooks for the mobile drawer internals', async () => {
    render(
      <SideNavigation
        ariaLabel="Main navigation"
        mobile
        mobileOpen
        className="sidebar-root-slot"
        mobileDialogClassName="mobile-dialog-slot"
        classNames={{
          mobileTrigger: 'mobile-trigger-slot',
          mobileBackdrop: 'mobile-backdrop-slot',
          mobilePanel: 'mobile-panel-slot',
          mobileCloseButton: 'mobile-close-slot',
        }}
      />,
    )

    await screen.findByRole('dialog')
    const mobileSlots = [
      'sidebar-root-slot',
      'mobile-dialog-slot',
      'mobile-trigger-slot',
      'mobile-backdrop-slot',
      'mobile-panel-slot',
      'mobile-close-slot',
    ]
    mobileSlots.forEach((className) => expect(document.querySelector(`.${className}`)).toBeInTheDocument())
  })

  it('keeps expandable section state, controls, and hidden content accessible', async () => {
    const user = userEvent.setup()
    const onExpandedChange = jest.fn()
    const section = (expanded: boolean) => (
      <SideNavigation ariaLabel="Main navigation" open>
        <SideNavigationExpandableSection
          label="Workspace"
          expanded={expanded}
          onExpandedChange={onExpandedChange}
          classNames={{ root: 'expandable-root-slot', toggle: 'expandable-toggle-slot', content: 'expandable-content-slot' }}
        >
          <a href="/overview">Overview</a>
        </SideNavigationExpandableSection>
      </SideNavigation>
    )
    const { rerender } = render(section(false))
    const toggle = screen.getByRole('button', { name: 'Workspace' })
    const contentId = toggle.getAttribute('aria-controls')
    const content = contentId ? document.getElementById(contentId) : null

    expect(contentId).toBeTruthy()
    expect(content).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')
    expect(content).toHaveAttribute('inert')
    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('link', { name: 'Overview' })).not.toBeInTheDocument()
    expect(document.querySelector('.expandable-root-slot')).toBeInTheDocument()
    expect(document.querySelector('.expandable-toggle-slot')).toBeInTheDocument()
    expect(document.querySelector('.expandable-content-slot')).toBeInTheDocument()

    await user.click(toggle)
    expect(onExpandedChange).toHaveBeenCalledWith(true)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    rerender(section(true))
    expect(screen.getByRole('button', { name: 'Workspace' })).toHaveAttribute('aria-expanded', 'true')
    expect(content).not.toHaveAttribute('hidden')
    expect(content).not.toHaveAttribute('inert')
    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument()
  })

  it('generates unique controlled-content IDs for multiple expandable sections', () => {
    render(
      <SideNavigation ariaLabel="Main navigation" open>
        <SideNavigationExpandableSection label="First" defaultExpanded>
          <span>First content</span>
        </SideNavigationExpandableSection>
        <SideNavigationExpandableSection label="Second" defaultExpanded>
          <span>Second content</span>
        </SideNavigationExpandableSection>
      </SideNavigation>,
    )

    const first = screen.getByRole('button', { name: 'First' }).getAttribute('aria-controls')
    const second = screen.getByRole('button', { name: 'Second' }).getAttribute('aria-controls')

    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(first).not.toBe(second)
    if (!first || !second) throw new Error('Expandable sections must provide content IDs')
    expect(document.getElementById(first)).toBeInTheDocument()
    expect(document.getElementById(second)).toBeInTheDocument()
  })

  it('hides an expanded section when the sidebar collapses and opens both on selection', async () => {
    const user = userEvent.setup()
    render(
      <SideNavigation ariaLabel="Main navigation" initialOpen={false} storageKey="collapsed-expandable-section">
        <SideNavigationExpandableSection label="Workspace" defaultExpanded>
          <a href="/overview">Overview</a>
        </SideNavigationExpandableSection>
      </SideNavigation>,
    )

    const toggle = screen.getByRole('button', { name: 'Workspace' })
    const content = document.getElementById(toggle.getAttribute('aria-controls') ?? '')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')
    expect(content).toHaveAttribute('inert')
    expect(screen.queryByRole('link', { name: 'Overview' })).not.toBeInTheDocument()

    await user.click(toggle)

    expect(screen.getByRole('button', { name: 'Workspace' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument()
  })

  it('styles the footer wrapper only when opted in, including in the mobile drawer', async () => {
    const footer = <span>Version</span>
    const { rerender } = render(<SideNavigation ariaLabel="Main navigation" initialOpen footer={footer} />)

    expect(screen.getByText('Version').closest('footer')).toHaveClass(sidebarStyles.footer)
    expect(screen.getByText('Version').closest('footer')).not.toHaveClass(sidebarStyles.subtleFooter)

    rerender(<SideNavigation ariaLabel="Main navigation" initialOpen footer={footer} footerVariant="subtle" />)

    expect(screen.getByText('Version').closest('footer')).toHaveClass(sidebarStyles.subtleFooter)

    await act(async () => rerender(<SideNavigation ariaLabel="Main navigation" mobile mobileOpen footer={footer} footerVariant="subtle" />))

    expect(screen.getByText('Version').closest('footer')).toHaveClass(sidebarStyles.subtleFooter)
  })

  it('renders app-provided navigation and permissions with native semantics', () => {
    const onClick = jest.fn()
    render(
      <SideNavigation ariaLabel="Main navigation" initialOpen>
        <SideNavigationSection label="Workspace">
          <SideNavigationItem
            label="Overview"
            icon={Home}
            href="/overview"
            target="_blank"
            rel="noopener noreferrer"
            active
            badge={<span>3</span>}
          />
          <SideNavigationItem label="Settings" disabled />
          <SideNavigationItem label="Hidden" visible={false} href="/hidden" />
          <SideNavigationItem label="Refresh" onClick={onClick} />
        </SideNavigationSection>
      </SideNavigation>,
    )

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Workspace' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Overview 3' })).toHaveAttribute('href', '/overview')
    expect(screen.getByRole('link', { name: 'Overview 3' })).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: 'Overview 3' })).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: 'Overview 3' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('Settings').parentElement).toHaveAttribute('aria-disabled', 'true')
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('marks destructive navigation items with the danger intent', () => {
    render(
      <SideNavigation ariaLabel="Main navigation">
        <SideNavigationItem label="Delete" color="danger" />
      </SideNavigation>,
    )

    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('colorDanger')
  })

  it('keeps collapsed item names accessible and updates uncontrolled state', async () => {
    const user = userEvent.setup()
    render(
      <SideNavigation ariaLabel="Main navigation" initialOpen>
        <SideNavigationItem label="Overview" icon={Home} href="/" />
      </SideNavigation>,
    )
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Expand sidebar' }))
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
  })

  it('restores a collapsed sidebar after remount and isolates storage keys', () => {
    const sidebar = (storageKey: string) => <SideNavigation ariaLabel="Main" storageKey={storageKey} initialOpen />
    const { unmount } = render(sidebar('first-sidebar'))
    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(localStorage.getItem('first-sidebar')).toBe('false')
    unmount()

    const restored = render(sidebar('first-sidebar'))
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
    restored.rerender(sidebar('second-sidebar'))
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
    restored.rerender(sidebar('first-sidebar'))
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
    expect(localStorage.getItem('second-sidebar')).toBeNull()
  })

  it('renders rich labels with explicit accessible names and collapsed titles', () => {
    const Adapter = ({ href, ...props }: SideNavigationLinkProps) => <a href={href} {...props} />
    render(
      <SideNavigation ariaLabel="Main" open={false}>
        <SideNavigationSection label={<strong>Visual section</strong>} ariaLabel="Section name">
          <SideNavigationItem label={<strong>Visual item</strong>} ariaLabel="Item name" icon={Home} href="/item" as={Adapter} />
          <SideNavigationItem label={<strong>Visual disabled</strong>} ariaLabel="Disabled name" disabled />
          <SideNavigationItem label={<strong>Visual action</strong>} ariaLabel="Action name" />
        </SideNavigationSection>
      </SideNavigation>,
    )
    expect(screen.getByRole('region', { name: 'Section name' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Item name' })).toHaveAttribute('title', 'Item name')
    expect(screen.getByText('Visual item').tagName).toBe('STRONG')
    expect(screen.getByLabelText('Disabled name')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByLabelText('Disabled name')).toHaveAttribute('title', 'Disabled name')
    expect(screen.getByRole('button', { name: 'Action name' })).toHaveAttribute('title', 'Action name')
  })

  it('renders expanded rich section headings and derives item names from their content', () => {
    render(
      <SideNavigation ariaLabel="Main" open>
        <SideNavigationSection label={<strong>Workspace</strong>} ariaLabel="Workspace navigation">
          <SideNavigationItem label={<strong>Overview</strong>} href="/overview" />
        </SideNavigationSection>
      </SideNavigation>,
    )
    expect(screen.getByRole('heading', { name: 'Workspace' })).toContainHTML('<strong>Workspace</strong>')
    expect(screen.getByRole('region', { name: 'Workspace navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Overview' })).not.toHaveAttribute('title')
  })

  it('keeps an iconless collapsed item label visible', () => {
    render(
      <SideNavigation ariaLabel="Main" open={false}>
        <SideNavigationItem label="Documentation" href="/docs" />
        <SideNavigationItem label="Home" icon={Home} href="/" />
      </SideNavigation>,
    )
    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveClass('collapsed')
    expect(screen.getByRole('link', { name: 'Documentation' })).not.toHaveClass('hasIcon')
    expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('hasIcon')
  })

  it('supports externally controlled desktop state', async () => {
    const user = userEvent.setup()
    const onOpenChange = jest.fn()
    const { rerender } = render(<SideNavigation ariaLabel="Main" open onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
    rerender(<SideNavigation ariaLabel="Main" open={false} onOpenChange={onOpenChange} />)
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
  })

  it('provides a stable target for external desktop and mobile controls', async () => {
    const { rerender } = render(<SideNavigation id="main-nav" ariaLabel="Main" open />)
    expect(screen.getByRole('navigation')).toHaveAttribute('id', 'main-nav')
    rerender(<SideNavigation id="main-nav" ariaLabel="Main" open={false} />)
    expect(screen.getByRole('navigation')).toHaveAttribute('id', 'main-nav')
    rerender(<SideNavigation id="main-nav" ariaLabel="Main" mobile mobileOpen={false} mobileDialogClassName="below-header" />)
    const trigger = screen.getByRole('button', { name: 'Open Main' })
    expect(trigger).toHaveAttribute('aria-controls', 'main-nav')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('main-nav')).toBeInTheDocument()
    rerender(<SideNavigation id="main-nav" ariaLabel="Main" mobile mobileOpen mobileDialogClassName="below-header" />)
    expect(await screen.findByRole('dialog')).toHaveClass('below-header')
    expect(document.getElementById('main-nav')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('exposes a disabled reason on keyboard focus without activating the item', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(
      <SideNavigation ariaLabel="Main" initialOpen>
        <SideNavigationItem label="SQL" disabled disabledTooltip="Select a cluster first" onClick={onClick} />
      </SideNavigation>,
    )
    await user.tab()
    await user.tab()
    const trigger = screen.getByLabelText('SQL', { selector: '[tabindex="0"]' })
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-disabled', 'true')
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toHaveTextContent('Select a cluster first')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    await user.keyboard('{Enter} ')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards navigation props through a custom link adapter', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    const Adapter = ({ href, ...props }: SideNavigationLinkProps) => <a href={`#app${href}`} {...props} />
    render(
      <SideNavigation ariaLabel="Main">
        <SideNavigationItem
          label="Overview"
          href="/overview"
          target="_blank"
          rel="noopener noreferrer"
          as={Adapter}
          active
          onClick={onClick}
        />
      </SideNavigation>,
    )
    const link = screen.getByRole('link', { name: 'Overview' })
    expect(link).toHaveAttribute('href', '#app/overview')
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveClass('item')
    await user.click(link)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('exposes expanded state and removes closed legacy section items from navigation', async () => {
    const user = userEvent.setup()
    render(
      <SideNavigation ariaLabel="Main">
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active={false}>
          <AppSidebarItem title="Maps" />
        </AppSidebarSection>
      </SideNavigation>,
    )
    const section = screen.getByRole('button', { name: 'Storage' })
    expect(section).toHaveAttribute('aria-expanded', 'false')
    const contentId = section.getAttribute('aria-controls')
    const content = contentId ? document.getElementById(contentId) : null
    expect(contentId).toBeTruthy()
    expect(content).toHaveAttribute('hidden')
    expect(content).toHaveAttribute('inert')
    expect(screen.queryByRole('button', { name: 'Maps' })).not.toBeInTheDocument()
    await user.click(section)
    expect(section).toHaveAttribute('aria-expanded', 'true')
    expect(content).not.toHaveAttribute('hidden')
    expect(content).not.toHaveAttribute('inert')
    expect(screen.getByRole('button', { name: 'Maps' })).toBeInTheDocument()
  })

  it('uses the supplied accessible name for an expandable section', () => {
    render(
      <SideNavigation ariaLabel="Main">
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage navigation" icon={Home} active={false}>
          <AppSidebarItem title="Maps" />
        </AppSidebarSection>
      </SideNavigation>,
    )
    expect(screen.getByRole('button', { name: 'Storage navigation' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('provides a collapsed disabled item title when no reason is supplied', () => {
    render(
      <SideNavigation ariaLabel="Main" open={false}>
        <SideNavigationItem label="SQL" icon={Home} disabled />
      </SideNavigation>,
    )
    expect(screen.getByLabelText('SQL')).toHaveAttribute('title', 'SQL')
  })

  it('places the modern favorite control after its item in keyboard order', async () => {
    const user = userEvent.setup()
    render(
      <SideNavigation ariaLabel="Main">
        <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Home} active={false}>
          <AppSidebarItem id="maps" title="Maps" />
        </AppSidebarSection>
      </SideNavigation>,
    )
    await user.click(screen.getByRole('button', { name: 'Storage' }))
    await user.tab()
    expect(screen.getByRole('button', { name: 'Maps' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Favorite Item' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(JSON.parse(localStorage.getItem('sideBarFavorites') || '[]')).toContain('maps')
  })

  it('opens the mobile dialog, focuses close, closes on Escape and restores focus', async () => {
    const user = userEvent.setup()
    const onMobileOpenChange = jest.fn()
    render(
      <SideNavigation ariaLabel="Main navigation" mobile onMobileOpenChange={onMobileOpenChange}>
        <SideNavigationItem label="Overview" href="/" />
      </SideNavigation>,
    )
    const trigger = screen.getByRole('button', { name: 'Open Main navigation' })
    await user.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'Main navigation' })).toHaveAttribute('aria-modal', 'true')
    const close = screen.getByRole('button', { name: 'Close Main navigation' })
    await waitFor(() => expect(close).toHaveFocus())
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
    expect(onMobileOpenChange.mock.calls).toEqual([[true], [false]])
  })

  it('requests a controlled mobile close on backdrop click', async () => {
    const user = userEvent.setup()
    const onMobileOpenChange = jest.fn()
    const Controlled = () => {
      const [open, setOpen] = useState(true)
      return (
        <SideNavigation
          ariaLabel="Main"
          mobile
          mobileOpen={open}
          onMobileOpenChange={(value) => {
            onMobileOpenChange(value)
            setOpen(value)
          }}
        />
      )
    }
    render(<Controlled />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    const backdrop = document.querySelector('.backdrop') as HTMLElement
    await user.click(backdrop)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(onMobileOpenChange).toHaveBeenCalledWith(false)
  })

  it('keeps a controlled drawer open until the host updates its state', async () => {
    const user = userEvent.setup()
    const onMobileOpenChange = jest.fn()
    const { rerender } = render(<SideNavigation ariaLabel="Main" mobile mobileOpen onMobileOpenChange={onMobileOpenChange} />)
    await user.click(await screen.findByRole('button', { name: 'Close Main' }))
    expect(onMobileOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    rerender(<SideNavigation ariaLabel="Main" mobile mobileOpen={false} onMobileOpenChange={onMobileOpenChange} />)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('closes an uncontrolled drawer when leaving mobile and stays closed on return', async () => {
    const user = userEvent.setup()
    const onMobileOpenChange = jest.fn()
    const { rerender } = render(<SideNavigation ariaLabel="Main" mobile onMobileOpenChange={onMobileOpenChange} />)
    await user.click(screen.getByRole('button', { name: 'Open Main' }))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await act(async () => rerender(<SideNavigation ariaLabel="Main" mobile={false} onMobileOpenChange={onMobileOpenChange} />))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await act(async () => rerender(<SideNavigation ariaLabel="Main" mobile onMobileOpenChange={onMobileOpenChange} />))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Main' })).toHaveAttribute('aria-expanded', 'false')
    expect(onMobileOpenChange.mock.calls).toEqual([[true], [false]])
  })

  it('requests a controlled drawer close when leaving mobile', async () => {
    const onMobileOpenChange = jest.fn()
    const { rerender } = render(<SideNavigation ariaLabel="Main" mobile mobileOpen onMobileOpenChange={onMobileOpenChange} />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    rerender(<SideNavigation ariaLabel="Main" mobile={false} mobileOpen onMobileOpenChange={onMobileOpenChange} />)
    expect(onMobileOpenChange).toHaveBeenCalledTimes(1)
    expect(onMobileOpenChange).toHaveBeenCalledWith(false)
    rerender(<SideNavigation ariaLabel="Main" mobile mobileOpen onMobileOpenChange={onMobileOpenChange} />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    rerender(<SideNavigation ariaLabel="Main" mobile mobileOpen={false} onMobileOpenChange={onMobileOpenChange} />)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})
