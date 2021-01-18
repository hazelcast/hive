import React, { useCallback, useMemo, useRef, useState } from 'react'
import { logger } from '@hazelcast/services'

import { FetchDataProps, Table } from '../src/Table/Table'
import { getColumns, makeData, Person } from '../__tests__/Table/utils'
import { Toggle } from '../src/Toggle'

import styles from './utils.scss'

export default {
  title: 'Components/Table',
  component: Table,
}

const smallDataSet = makeData(10)
const bigDataSet = makeData(10000)

export const Default = () => {
  const [withFooter, setWithFooter] = useState(false)
  const [sorting, setSorting] = useState(false)
  const [paginate, setPaginate] = useState(false)

  return (
    <>
      <Table columns={getColumns({ withFooter })} data={bigDataSet} disableSortBy={!sorting} hidePagination={!paginate} />

      <hr />
      <div className={styles.toggles}>
        <Toggle
          name="default"
          checked={withFooter}
          label="Footer"
          onChange={(e) => {
            setWithFooter(e.target.checked)
          }}
        />
        <Toggle
          name="default"
          checked={sorting}
          label="Sorting"
          onChange={(e) => {
            setSorting(e.target.checked)
          }}
        />
        <Toggle
          name="default"
          checked={paginate}
          label="Pagination"
          onChange={(e) => {
            setPaginate(e.target.checked)
          }}
        />
      </div>
    </>
  )
}

export const Footer = () => {
  const columns = useMemo(() => getColumns({ withFooter: true }), [])

  return <Table columns={columns} data={smallDataSet} disableSortBy hidePagination />
}

export const ClickableRows = () => {
  const columns = useMemo(() => getColumns({}), [])

  return (
    <Table
      columns={columns}
      data={smallDataSet}
      disableSortBy
      hidePagination
      onRowClick={(row) => {
        logger.log(`You just clicked (or pressed) row: ${row.values.name as Person['name']}`)
      }}
    />
  )
}

export const ClickableRowsWithHref = () => {
  const columns = useMemo(() => getColumns({}), [])

  return (
    <Table
      columns={columns}
      data={smallDataSet}
      disableSortBy
      hidePagination
      // You can use row to generate href
      getHref={() => window.location.hash}
    />
  )
}

export const AgeColumnWithWarnings = () => {
  const columns = useMemo(() => getColumns({}), [])

  return (
    <Table
      columns={columns}
      data={smallDataSet}
      disableSortBy
      hidePagination
      getCustomCellProps={(cellInfo) => {
        if (cellInfo.column.id === 'age' && cellInfo.value < 15) {
          return { warning: 'Younger than 15' }
        }
        return {}
      }}
    />
  )
}

export const Sorting = () => {
  return <Table columns={getColumns({})} data={smallDataSet} />
}

export const UncontrolledPagination = () => <Table columns={getColumns({})} data={bigDataSet} disableSortBy />

export const ControlledPagination = () => {
  const columns = useMemo(() => getColumns({}), [])

  // We'll start our table without any data
  const [data, setData] = useState<Person[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pageCount, setPageCount] = useState<number>(0)
  const fetchIdRef = useRef<number>(0)

  // This will get called when the table needs new data.
  const fetchData = useCallback(({ pageSize, pageIndex }: FetchDataProps) => {
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

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
    }, 750)
  }, [])

  return (
    <Table
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      manualPagination
      pageCount={pageCount}
      defaultPageSize={15}
      disableSortBy
      paginationOptions={{
        pageSizeOptions: [5, 10, 15],
      }}
    />
  )
}
