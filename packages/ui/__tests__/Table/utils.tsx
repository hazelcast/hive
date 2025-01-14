import React, { PropsWithChildren, useMemo } from 'react'

import { Link } from '../../src/Link'
import { CellType, ColumnType } from '../../src/Table/tableTypes'

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

const NameCell = (props: PropsWithChildren<CellType<Person>>) => (
  <Link href="https://hazelcast.com/" size="small">
    {props}
  </Link>
)

export const getColumns = ({ withFooter = false, withNameLink = false }: GetColumns): ColumnType<Person>[] => [
  {
    Header: 'ID',
    accessor: ({ id }) => <span>{id}</span>,
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
        const total = useMemo(() => info.rows.reduce((sum, row) => row.original.age + sum, 0), [info.rows])
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
        const total = useMemo(() => info.rows.reduce((sum, row) => row.original.visits + sum, 0), [info.rows])
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
      const indexOfStatusA = sortBy.indexOf(rowA.original.status)
      const indexOfStatusB = sortBy.indexOf(rowB.original.status)

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
