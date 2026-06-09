import React from 'react'

import { SimpleTable } from '../src'

export default {
  title: 'Components/SimpleTable',
  component: SimpleTable,
}

const rows = [
  { id: '2312312', name: 'Bob Adams' },
  { id: '1111111', name: 'Elly Johns' },
  { id: '5435345', name: 'Jim Andrews' },
]

const header = (
  <SimpleTable.Header>
    <SimpleTable.Row>
      <SimpleTable.ColumnHeaderCell>Id</SimpleTable.ColumnHeaderCell>
      <SimpleTable.ColumnHeaderCell>Name</SimpleTable.ColumnHeaderCell>
    </SimpleTable.Row>
  </SimpleTable.Header>
)

const body = (
  <SimpleTable.Body>
    {rows.map((row) => (
      <SimpleTable.Row key={row.id}>
        <SimpleTable.Cell>{row.id}</SimpleTable.Cell>
        <SimpleTable.Cell>{row.name}</SimpleTable.Cell>
      </SimpleTable.Row>
    ))}
  </SimpleTable.Body>
)

export const Ghost = () => (
  <SimpleTable>
    {header}
    {body}
  </SimpleTable>
)

export const Surface = () => (
  <SimpleTable variant="surface">
    {header}
    {body}
  </SimpleTable>
)
