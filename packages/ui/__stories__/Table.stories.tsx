import React, { useCallback, useMemo, useRef, useState } from 'react'
import { logger } from '@hazelcast/services'

import { PaginationChangeProps, Table } from '../src/Table/Table'
import { Toggle } from '../src/Toggle'
import { getColumns, Person } from '../__tests__/Table/utils'
import { bigDataSet, smallDataSet } from '../__tests__/Table/consts'

import styles from './utils.scss'
import { TextField } from '../src'
import storyStyles from './TextField.stories.module.scss'

export default {
  title: 'Components/Table',
  component: Table,
}

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
  return <Table columns={getColumns({})} data={smallDataSet} hidePagination />
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
  const onPaginationChange = useCallback(({ pageSize, pageIndex }: PaginationChangeProps) => {
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
      onPaginationChange={onPaginationChange}
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

export const Empty = () => <Table columns={getColumns({ withFooter: true })} data={[]} disableSortBy />

export const Loading = () => <Table loading columns={getColumns({ withFooter: true })} data={smallDataSet} disableSortBy />

export const CustomStyle = () => (
  <Table
    contentClassName={styles.customTableContent}
    headerClassName={styles.customTableHeader}
    footerClassName={styles.customTableFooter}
    columns={getColumns({ withFooter: true })}
    data={smallDataSet}
    disableSortBy
  />
)

export const WithGlobalSearch = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <div>
        <TextField
          name="search"
          value={searchValue}
          label="Global Search"
          className={storyStyles.field}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Table searchValue={searchValue} columns={getColumns({})} data={bigDataSet} disableSortBy />
    </>
  )
}
