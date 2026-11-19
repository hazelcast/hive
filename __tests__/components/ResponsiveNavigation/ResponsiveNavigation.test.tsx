import React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ResponsiveNavigationProvider, SideNavigation, TopNavigation, useResponsiveNavigation } from '../../../src'

type Listener = () => void

const mockViewport = (initialWidth: number) => {
  let width = initialWidth
  const listeners = new Set<Listener>()
  const queries: string[] = []
  window.matchMedia = jest.fn((query: string) => {
    queries.push(query)
    const max = Number(/max-width: (\d+)px/.exec(query)?.[1])
    return {
      get matches() {
        return width <= max
      },
      addEventListener: (_: string, listener: Listener) => listeners.add(listener),
      removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
    }
  }) as unknown as typeof window.matchMedia
  return {
    queries,
    resize: (next: number) => {
      width = next
      act(() => listeners.forEach((listener) => listener()))
    },
  }
}

const Probe = () => {
  const { isMobile, mobileOpen, setMobileOpen } = useResponsiveNavigation()
  return (
    <>
      <span data-test="state">{`${isMobile}:${mobileOpen}`}</span>
      <button onClick={() => setMobileOpen(true)}>open</button>
    </>
  )
}

describe('ResponsiveNavigationProvider', () => {
  const originalMatchMedia = window.matchMedia
  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('is mobile only below the configured breakpoint', () => {
    const viewport = mockViewport(959)
    const { rerender } = render(
      <ResponsiveNavigationProvider breakpoint={960}>
        <Probe />
      </ResponsiveNavigationProvider>,
    )
    expect(screen.getByTestId('state')).toHaveTextContent('true:false')
    expect(viewport.queries).toContain('(max-width: 959px)')

    viewport.resize(960)
    expect(screen.getByTestId('state')).toHaveTextContent('false:false')

    rerender(
      <ResponsiveNavigationProvider breakpoint={1024}>
        <Probe />
      </ResponsiveNavigationProvider>,
    )
    expect(screen.getByTestId('state')).toHaveTextContent('true:false')
  })

  it('closes the drawer when leaving mobile and does not reopen it on return', async () => {
    const viewport = mockViewport(500)
    render(
      <ResponsiveNavigationProvider breakpoint={960}>
        <Probe />
      </ResponsiveNavigationProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'open' }))
    expect(screen.getByTestId('state')).toHaveTextContent('true:true')

    viewport.resize(1200)
    expect(screen.getByTestId('state')).toHaveTextContent('false:false')

    viewport.resize(500)
    expect(screen.getByTestId('state')).toHaveTextContent('true:false')
  })

  it('falls back to desktop when matchMedia is unavailable or there is no provider', () => {
    // @ts-expect-error simulating an environment without matchMedia
    delete window.matchMedia
    render(
      <ResponsiveNavigationProvider breakpoint={960}>
        <Probe />
      </ResponsiveNavigationProvider>,
    )
    expect(screen.getByTestId('state')).toHaveTextContent('false:false')
  })

  it('returns an inert desktop state without a provider', async () => {
    render(<Probe />)
    await userEvent.click(screen.getByRole('button', { name: 'open' }))
    expect(screen.getByTestId('state')).toHaveTextContent('false:false')
  })

  it('drives SideNavigation and TopNavigation controlled props', async () => {
    mockViewport(500)
    Object.defineProperty(Element.prototype, 'getAnimations', { configurable: true, value: () => [] })
    const Shell = () => {
      const { isMobile, mobileOpen, setMobileOpen } = useResponsiveNavigation()
      return (
        <>
          <TopNavigation
            logo="Logo"
            mobile={isMobile}
            mobileMenu={{ label: 'Open menu', expanded: mobileOpen, controls: 'main-navigation', onClick: () => setMobileOpen(true) }}
          />
          <SideNavigation
            ariaLabel="Main navigation"
            id="main-navigation"
            mobile={isMobile}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
            showMobileTrigger={false}
          />
        </>
      )
    }
    render(
      <ResponsiveNavigationProvider breakpoint={960}>
        <Shell />
      </ResponsiveNavigationProvider>,
    )
    const menu = screen.getByRole('button', { name: 'Open menu' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    expect(await screen.findByRole('button', { name: 'Close Main navigation' })).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    Reflect.deleteProperty(Element.prototype, 'getAnimations')
  })
})
