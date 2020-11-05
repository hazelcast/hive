import React, { useCallback, useRef, useState } from 'react'
import { Column } from 'react-table'

import { makeData, Person } from './makeData'
import { FetchDataProps, Table } from '../../src/Table/Table'

export default {
  title: 'Components/Table/Table',
  component: Table,
}

const getColumns = (withFooter = false): Column<Person>[] => [
  {
    Header: 'ID',
    accessor: 'id',
    ...(withFooter && { Footer: 'ID' }),
  },
  {
    Header: 'Name',
    accessor: 'name',
    ...(withFooter && { Footer: 'Name' }),
  },
  {
    Header: 'Age',
    accessor: 'age',
    ...(withFooter && {
      Footer: (info) => {
        const total = React.useMemo(
          () =>
            info.rows.reduce(
              (sum, row) => (row.values.age as Person['age']) + sum,
              0,
            ),
          [info.rows],
        )
        const footer = `Average Age: ${total / info.rows.length}`
        return footer
      },
    }),
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    ...(withFooter && {
      Footer: (info) => {
        const total = React.useMemo(
          () =>
            info.rows.reduce(
              (sum, row) =>
                (row.values.visits as Person['visits']) + sum,
              0,
            ),
          [info.rows],
        )
        const footer = `Total: ${total}`
        return footer
      },
    }),
  },
  {
    Header: 'Status',
    accessor: 'status',
    ...(withFooter && { Footer: 'Status' }),
    sortType: (rowA, rowB) => {
      const sortBy: Person['status'][] = [
        'single',
        'complicated',
        'relationship',
      ]
      const indexOfStatusA = sortBy.indexOf(
        rowA.values.status as Person['status'],
      )
      const indexOfStatusB = sortBy.indexOf(
        rowB.values.status as Person['status'],
      )

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

const smallDataSet = makeData(10)
const bigDataSet = makeData(10000)

export const Basic = () => {
  return (
    <Table columns={getColumns()} data={smallDataSet} disableSortBy />
  )
}

export const Footer = () => (
  <Table
    columns={getColumns(true)}
    data={smallDataSet}
    disableSortBy
  />
)

export const Sorting = () => {
  return <Table columns={getColumns()} data={smallDataSet} />
}

export const UncontrolledPagination = () => (
  <Table columns={getColumns()} data={bigDataSet} disableSortBy />
)

export const ControlledPagination = () => {
  // We'll start our table without any data
  const [data, setData] = useState<Person[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pageCount, setPageCount] = useState<number>(0)
  const fetchIdRef = useRef<number>(0)

  // This will get called when the table needs new data.
  const fetchData = useCallback(
    ({ pageSize, pageIndex }: FetchDataProps) => {
      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current

      // Set the loading state
      setLoading(true)

      // Let's simulate server delay
      setTimeout(() => {
        // Only update the data if this is the latest fetch
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex
          const endRow = startRow + pageSize
          setData(bigDataSet.slice(startRow, endRow))
          // Since we don't have real server here, we'll fake total page count.
          setPageCount(Math.ceil(bigDataSet.length / pageSize))
          setLoading(false)
        }
      }, 1000)
    },
    [],
  )

  return (
    <Table
      columns={getColumns()}
      data={data}
      fetchData={fetchData}
      loading={loading}
      manualPagination
      pageCount={pageCount}
      disableSortBy
    />
  )
}
