import React from 'react'
import { render, screen, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { queryByLabel } from '../../setupTests'
import { SelectCluster } from '../../src/AppHeader/SelectCluster'

const clusterName = 'testCluster1'
const clusterNames = ['testCluster1', 'testCluster2']
const clusterVersions = { testCluster1: '5.4', testCluster2: '5.3' }

describe('SelectCluster', () => {
  it('Renders', async () => {
    render(<SelectCluster onChange={jest.fn()} clusterVersions={clusterVersions} clusterName={clusterName} clusterNames={clusterNames} />)

    const selectInput = screen.getByRole('combobox', {
      name: /Select Cluster/i,
    })
    expect(selectInput).not.toBeDisabled()

    expect(screen.queryByText(clusterName)).toBeInTheDocument()

    await act(async () => {
      await userEvent.click(selectInput)
    })

    clusterNames.forEach((name) => expect(screen.queryAllByText(name).length).toBeGreaterThan(0))
  })

  it('Render "Select Cluster" placeholder in case no cluster is selected', () => {
    render(<SelectCluster onChange={jest.fn()} clusterName={null} clusterNames={clusterNames} clusterVersions={clusterVersions} />)

    expect(screen.queryByText('Select Cluster')).toBeInTheDocument()
  })

  it('Render "No Clusters" placeholder in case no clusters are configured', () => {
    render(<SelectCluster onChange={jest.fn()} clusterName={null} clusterNames={null} />)

    expect(screen.queryByText('No Clusters')).toBeInTheDocument()

    const selectInput = queryByLabel(document, 'Select Cluster')
    expect(selectInput).toBeDisabled()
  })

  it('Renders loader if version is not yet available', async () => {
    render(
      <SelectCluster
        onChange={jest.fn()}
        clusterVersions={{ testCluster1: null, testCluster2: null }}
        clusterName={clusterName}
        clusterNames={clusterNames}
      />,
    )

    // For the selected cluster, in select box
    expect(screen.getByTestId('centered-loader')).toBeInTheDocument()

    const selectInput = screen.getByRole('combobox', {
      name: /Select Cluster/i,
    })

    await act(async () => {
      await userEvent.click(selectInput)
    })

    // In select box, and in dropdown options
    expect(screen.getAllByTestId('centered-loader')).toHaveLength(3)
  })

  it('Renders cluster versions', async () => {
    render(<SelectCluster onChange={jest.fn()} clusterVersions={clusterVersions} clusterName={clusterName} clusterNames={clusterNames} />)

    // For the selected cluster, in select box
    expect(screen.queryByTestId('centered-loader')).not.toBeInTheDocument()
    expect(screen.getByText('5.4')).toBeInTheDocument()

    const selectInput = screen.getByRole('combobox', {
      name: /Select Cluster/i,
    })

    await act(async () => {
      await userEvent.click(selectInput)
    })

    // For options
    expect(screen.queryByTestId('centered-loader')).not.toBeInTheDocument()
    const options = screen.getAllByRole('option')
    const versions = Object.values(clusterVersions)

    options.forEach((option, index) => {
      expect(within(option).getByText(versions[index])).toBeInTheDocument()
    })
  })
})
