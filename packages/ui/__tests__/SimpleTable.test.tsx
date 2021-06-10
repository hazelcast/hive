import React from 'react'
import { mount } from 'enzyme'

import { SimpleTable } from '../src'

import styles from '../src/SimpleTable.module.scss'

describe('SimpleTable', () => {
  it('Renders default table', () => {
    const wrapper = mount(
      <SimpleTable>
        <SimpleTable.Body>
          <SimpleTable.Row>
            <SimpleTable.Td>Test</SimpleTable.Td>
          </SimpleTable.Row>
        </SimpleTable.Body>
      </SimpleTable>,
    )

    expect(wrapper.find(`.${styles.root}`).exists()).toBeTruthy()
  })
})
