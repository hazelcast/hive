import React from 'react'
import { render, screen, act } from '@testing-library/react'

import { AppSidebarFavorites } from '../../src/AppSidebar'

describe('AppSidebarFavorites', () => {
  it('shows no favorites if empty', async () => {
    render(<AppSidebarFavorites>{() => null}</AppSidebarFavorites>)

    await act(async () => {})

    expect(screen.getByTestId('sidebar-menu-no-favorites')).toBeInTheDocument()
  })
})
