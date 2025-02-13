import React from 'react'
import { render } from '@testing-library/react'

import { SimpleTable } from '../src'

import styles from '../src/SimpleTable.module.scss'

describe('SimpleTable', () => {
  it('Renders default table', () => {
    const { container } = render(
      <SimpleTable>
        <SimpleTable.Body>
          <SimpleTable.Row>
            <SimpleTable.Td>Test</SimpleTable.Td>
          </SimpleTable.Row>
        </SimpleTable.Body>
      </SimpleTable>,
    )

    expect(container.querySelector(`.${styles.root}`)).toBeInTheDocument()
  })
})
