import React from 'react'
import { render, screen } from '@testing-library/react'

import { AppSidebarFavorites } from '../../src/AppSidebar'

describe('AppSidebarFavorites', () => {
  it('shows no favorites if empty', () => {
    render(<AppSidebarFavorites>{() => null}</AppSidebarFavorites>)

    expect(screen.getByTestId('sidebar-menu-no-favorites')).toBeInTheDocument()
  })
})
