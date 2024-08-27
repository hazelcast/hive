import React from 'react'
import { Disc } from 'react-feather'
import { render, screen } from '@testing-library/react'

import { AppSidebarSection } from '../../src/AppSidebar'

describe('AppSidebarSection', () => {
  it('renders expandable version', () => {
    render(
      <AppSidebarSection id="1" active={false} icon={Disc} title="Title" ariaLabel="title">
        <span>content</span>
      </AppSidebarSection>,
    )

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
})
