import React, { PropsWithChildren, useMemo } from 'react'
import namor from 'namor'
import { range } from '@hazelcast/helpers'
import { CellProps, Column } from 'react-table'

import { Link } from '../../src/Link'

export type Person = {
  name: string
  id: number
  age: number
  visits: number
  status: 'relationship' | 'complicated' | 'single'
}

const newPerson = (id: number): Person => {
  const statusChance = Math.random()
  return {
    name: `${namor.generate({
      words: 1,
      saltLength: 0,
    })} ${namor.generate({
      words: 1,
      saltLength: 0,
      subset: 'manly',
    })}`,
    id: id,
    age: Math.floor((Math.random() + 0.01) * 40),
    visits: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
  }
}

export const makeData = (length: number): Person[] => range(1, length).map((id) => newPerson(id))

export type GetColumns = {
  withFooter?: boolean
  withNameLink?: boolean
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
    accessor: 'name',
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
