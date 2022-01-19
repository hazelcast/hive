import React, { PropsWithChildren, useMemo } from 'react'
import { CellProps } from 'react-table'

import { Link } from '../../src/Link'
import { Column } from '../../src/Table/Table'

export type Person = {
  name: string
  id: number
  age: number
  visits: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

export type GetColumns = {
  withFooter?: boolean
  withNameLink?: boolean
  canHide?: boolean
}

const NameCell = (row: PropsWithChildren<CellProps<Person, string>>) => (
  <Link href="https://hazelcast.com/" size="small">
    {row.value}
  </Link>
)

export const getColumns = ({ withFooter = false, withNameLink = false }: GetColumns): Column<Person>[] => [
  {
    Header: 'ID',
    accessor: 'id',
    ...(withFooter && { Footer: 'ID' }),
  },
  {
    Header: 'Name',
    id: 'name',
    accessor: ({ name }) => name,
    ...(withFooter && { Footer: 'Name' }),
    ...(withNameLink && { Cell: NameCell }),
  },
  {
    Header: 'Age',
    accessor: 'age',
    ...(withFooter && {
      Footer: (info) => {
        const total = useMemo(() => info.rows.reduce((sum, row) => (row.values.age as Person['age']) + sum, 0), [info.rows])
        return `Average Age: ${total / info.rows.length}`
      },
    }),
    align: 'right',
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    ...(withFooter && {
      Footer: (info) => {
        const total = useMemo(() => info.rows.reduce((sum, row) => (row.values.visits as Person['visits']) + sum, 0), [info.rows])
        return `Total: ${total}`
      },
    }),
    align: 'right',
  },
  {
    Header: 'Status',
    accessor: 'status',
    ...(withFooter && { Footer: 'Status' }),
    sortType: (rowA, rowB) => {
      const sortBy: Person['status'][] = ['single', 'complicated', 'relationship']
      const indexOfStatusA = sortBy.indexOf(rowA.values.status as Person['status'])
      const indexOfStatusB = sortBy.indexOf(rowB.values.status as Person['status'])

      if (indexOfStatusA > indexOfStatusB) {
        return -1
      }
      if (indexOfStatusA < indexOfStatusB) {
        return 1
      }
      return 0
    },
  },
]
