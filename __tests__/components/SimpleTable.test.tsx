import React from 'react'
import { render } from '@testing-library/react'

import { SimpleTable } from '../../src'

import styles from '../../src/components/SimpleTable.module.css'

describe('SimpleTable', () => {
  it('renders default ghost table', () => {
    const { container } = render(
      <SimpleTable>
        <SimpleTable.Body>
          <SimpleTable.Row>
            <SimpleTable.Cell>Test</SimpleTable.Cell>
          </SimpleTable.Row>
        </SimpleTable.Body>
      </SimpleTable>,
    )

    expect(container.querySelector(`.${styles.root}`)).toBeInTheDocument()
    expect(container.querySelector(`.${styles.surface}`)).not.toBeInTheDocument()
  })

  it('renders surface variant', () => {
    const { container } = render(
      <SimpleTable variant="surface">
        <SimpleTable.Body>
          <SimpleTable.Row>
            <SimpleTable.Cell>Test</SimpleTable.Cell>
          </SimpleTable.Row>
        </SimpleTable.Body>
      </SimpleTable>,
    )

    expect(container.querySelector(`.${styles.surface}`)).toBeInTheDocument()
  })

  it('renders ColumnHeaderCell and RowHeaderCell', () => {
    const { container } = render(
      <SimpleTable>
        <SimpleTable.Header>
          <SimpleTable.Row>
            <SimpleTable.ColumnHeaderCell>Name</SimpleTable.ColumnHeaderCell>
          </SimpleTable.Row>
        </SimpleTable.Header>
        <SimpleTable.Body>
          <SimpleTable.Row>
            <SimpleTable.RowHeaderCell>Bob</SimpleTable.RowHeaderCell>
          </SimpleTable.Row>
        </SimpleTable.Body>
      </SimpleTable>,
    )

    const ths = container.querySelectorAll('th')
    expect(ths).toHaveLength(2)
    expect(ths[1]).toHaveAttribute('scope', 'row')
  })
})
