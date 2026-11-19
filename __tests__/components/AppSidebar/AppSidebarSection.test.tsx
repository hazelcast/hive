import React from 'react'
import { Disc } from 'react-feather'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AppSidebarSection } from '../../../src/components/AppSidebar'

describe('AppSidebarSection', () => {
  beforeEach(() => localStorage.clear())

  it('renders expandable version', async () => {
    render(
      <AppSidebarSection id="1" active={false} icon={Disc} title="Title" ariaLabel="title">
        <span>content</span>
      </AppSidebarSection>,
    )

    await act(async () => {})

    expect(screen.queryByText('content')).toBeInTheDocument()
    expect(screen.queryByTestId('sidebar-menu-section-title')).toBeInTheDocument()
  })

  it('renders basic version', () => {
    render(
      <AppSidebarSection title="Title">
        <span>content</span>
      </AppSidebarSection>,
    )

    expect(screen.queryByText('content')).toBeInTheDocument()
    expect(screen.queryByTestId('sidebar-menu-section-title')).not.toBeInTheDocument()
  })

  it('controls uniquely identified content without a sidebar context', async () => {
    const user = userEvent.setup()
    render(
      <>
        <AppSidebarSection id="first" active={false} icon={Disc} title="First" ariaLabel="First">
          <a href="/first">First destination</a>
        </AppSidebarSection>
        <AppSidebarSection id="second" active={false} icon={Disc} title="Second" ariaLabel="Second">
          <a href="/second">Second destination</a>
        </AppSidebarSection>
      </>,
    )

    const [first, second] = screen.getAllByTestId('sidebar-menu-item-title')
    const firstId = first.getAttribute('aria-controls')
    const secondId = second.getAttribute('aria-controls')
    expect(firstId).toBeTruthy()
    expect(secondId).toBeTruthy()
    expect(firstId).not.toBe(secondId)
    const content = firstId ? document.getElementById(firstId) : null
    expect(secondId && document.getElementById(secondId)).toBeInTheDocument()
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')
    expect(content).toHaveAttribute('inert')
    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('link', { name: 'First destination' })).not.toBeInTheDocument()

    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(content).not.toHaveAttribute('hidden')
    expect(content).not.toHaveAttribute('inert')
    await user.tab()
    expect(screen.getByRole('link', { name: 'First destination' })).toHaveFocus()
  })
})
