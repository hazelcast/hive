import React from 'react'

import { SimpleTable } from '../src'

import styles from './SimpleTableStories.module.scss'

export default {
  title: 'Components/SimpleTable',
  component: SimpleTable,
}

const content = (
  <>
    <SimpleTable.Header>
      <SimpleTable.Row>
        <SimpleTable.Th>Id</SimpleTable.Th>
        <SimpleTable.Th>Name</SimpleTable.Th>
      </SimpleTable.Row>
    </SimpleTable.Header>
    <SimpleTable.Body>
      <SimpleTable.Row>
        <SimpleTable.Td>2312312</SimpleTable.Td>
        <SimpleTable.Td>Bob Adams</SimpleTable.Td>
      </SimpleTable.Row>
      <SimpleTable.Row>
        <SimpleTable.Td>1111111</SimpleTable.Td>
        <SimpleTable.Td>Elly Johns</SimpleTable.Td>
      </SimpleTable.Row>
      <SimpleTable.Row>
        <SimpleTable.Td>5435345</SimpleTable.Td>
        <SimpleTable.Td>Jim Andrews</SimpleTable.Td>
      </SimpleTable.Row>
    </SimpleTable.Body>
  </>
)

export const Default = () => <SimpleTable>{content}</SimpleTable>

export const Custom = () => (
  <SimpleTable>
    <SimpleTable.Header>
      <SimpleTable.Row>
        <SimpleTable.Th className={styles.th}>Id</SimpleTable.Th>
        <SimpleTable.Th className={styles.th}>Name</SimpleTable.Th>
      </SimpleTable.Row>
    </SimpleTable.Header>
    <SimpleTable.Body>
      <SimpleTable.Row>
        <SimpleTable.Td className={styles.td}>2312312</SimpleTable.Td>
        <SimpleTable.Td className={styles.td}>Bob Adams</SimpleTable.Td>
      </SimpleTable.Row>
      <SimpleTable.Row>
        <SimpleTable.Td className={styles.td}>1111111</SimpleTable.Td>
        <SimpleTable.Td className={styles.td}>Elly Johns</SimpleTable.Td>
      </SimpleTable.Row>
      <SimpleTable.Row>
        <SimpleTable.Td className={styles.td}>5435345</SimpleTable.Td>
        <SimpleTable.Td className={styles.td}>Jim Andrews</SimpleTable.Td>
      </SimpleTable.Row>
    </SimpleTable.Body>
    <SimpleTable.Footer className={styles.footer}>
      <SimpleTable.Row>
        <SimpleTable.Td colSpan={2}>Footer</SimpleTable.Td>
      </SimpleTable.Row>
    </SimpleTable.Footer>
  </SimpleTable>
)
