import React from 'react'
import { act } from 'react-dom/test-utils'
import { userEvent } from '@testing-library/user-event'
import { screen, render } from '@testing-library/react'

import { Link } from '../../src/Link'
import { AppHeader } from '../../src/AppHeader'

describe('AppHeader', () => {
  it('renders basic version', () => {
    render(<AppHeader name="Test App" logoProps={{ LinkComponent: Link as any }} />)

    expect(screen.queryByText('Test App')).toBeInTheDocument()
    expect(screen.queryByTestId('logo-link')).toBeInTheDocument()
    expect(screen.queryByTestId('environment-badge')).not.toBeInTheDocument()
    expect(screen.queryByTestId('select-cluster')).not.toBeInTheDocument()
    expect(screen.queryByTestId('app-header-menu-toggle')).not.toBeInTheDocument()
  })

  it('renders menu content', async () => {
    render(<AppHeader name="Test App" logoProps={{ LinkComponent: Link as any }} menuContent={() => <span>Menu content</span>} />)

    expect(screen.queryByTestId('app-header-menu-toggle')).toBeInTheDocument()
    expect(screen.queryByText('Menu content')).not.toBeInTheDocument()

    await act(async () => {
      await userEvent.click(screen.getByTestId('app-header-menu-toggle'))
    })

    expect(screen.queryByText('Menu content')).toBeInTheDocument()
  })

  it('renders select cluster', () => {
    render(
      <AppHeader
        name="Test App"
        logoProps={{ LinkComponent: Link as any }}
        clusterSelectProps={{
          clusterName: 'Cluster-1',
          clusterNames: ['Cluster-1', 'Cluster-2'],
          clusterVersions: { 'Cluster-1': '5.5', 'Cluster-2': '6.0', 'Cluster-3': '3.1.2' },
          onChange: jest.fn(),
        }}
      />,
    )

    expect(screen.queryByTestId('select-cluster')).toBeInTheDocument()
  })
})
