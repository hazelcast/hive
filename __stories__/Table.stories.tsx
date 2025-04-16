import React, { useCallback, useMemo, useRef, useState } from 'react'
import { logger } from '../src'
import { Meta, StoryObj } from '@storybook/react'

import { PaginationChangeProps, Table, TableProps } from '../src/components/Table/Table'
import { getColumns, Person } from '../__tests__/components/Table/utils'
import { bigDataSet, smallDataSet, smallDataSetWithSubRows } from '../__tests__/components/Table/consts'
import { TextField } from '../src'
import { SortingRule } from '../src/components/Table/tableTypes'

import storyStyles from './TextField.stories.module.scss'
import styles from './utils.module.scss'

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=34348%3A5000',
    },
  },
  args: {
    columns: getColumns({}),
    data: smallDataSet,
    disableSortBy: true,
    hidePagination: true,
  },
} as Meta<TableProps<Person>>

type Story = StoryObj<TableProps<Person>>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    data: [],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithFooter: Story = {
  args: {
    columns: getColumns({ withFooter: true }),
  },
}

export const WithHiddenHeader: Story = {
  args: {
    hideHeader: true,
  },
}

export const WithClickableRows: Story = {
  args: {
    onRowClick: (row) => {
      logger.log(`You just clicked (or pressed) row: ${row.original.name}`)
    },
  },
}

export const WithClickableAnchorRows: Story = {
  args: {
    getHref: (row) => {
      logger.log(`You just clicked (or pressed) row: ${row.original.name}. You can use row info to generate href!`)
      return `#${row.id}`
    },
  },
}

export const Sortable: Story = {
  args: {
    disableSortBy: false,
  },
}

export const WithUncontrolledPagination: Story = {
  args: {
    data: bigDataSet.slice(0, 15),
    hidePagination: false,
  },
}

export const WithControlledPagination = () => {
  const columns = useMemo(() => getColumns({}), [])
  const defaultPageSize = 10
  const pageSizeOptions = [5, 10, 15]

  const [loading, setLoading] = useState<boolean>(false)
  // We'll start our table with initial data
  const [data, setData] = useState<Person[]>(bigDataSet.slice(0, 10))
  // Since we don't have real server here, we'll fake total page count.
  const [pageCount, setPageCount] = useState<number>(Math.ceil(bigDataSet.length / defaultPageSize))
  const fetchIdRef = useRef<number>(0)
  const firstUpdate = useRef(true)

  // This will get called when the table needs new data.
  const onPaginationChange = useCallback(({ pageSize, pageIndex }: PaginationChangeProps) => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

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
      defaultPageSize={defaultPageSize}
      disableSortBy
      paginationOptions={{
        pageSizeOptions,
      }}
    />
  )
}

export const WithControlledSorting = () => {
  const columns = useMemo(() => getColumns({}), [])

  const [loading, setLoading] = useState<boolean>(false)
  // We'll start our table with initial data
  const [data, setData] = useState<Person[]>(bigDataSet.slice(0, 10))
  // Since we don't have real server here, we'll fake total page count.
  const fetchIdRef = useRef<number>(0)
  const firstUpdate = useRef(true)

  // This will get called when the table needs new data.
  const onSortingChange = useCallback((sortBy: SortingRule[]) => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (sortBy.length === 0) {
      setData(bigDataSet)
      return
    }

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    setLoading(true)

    // Let's simulate server delay
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const { id, desc: isDescending } = sortBy[0]
        const sortColumn = id as keyof Person
        const newData = [...bigDataSet]
        newData.sort((a, b) =>
          isDescending ? Number(b[sortColumn]) - Number(a[sortColumn]) : Number(a[sortColumn]) - Number(b[sortColumn]),
        )
        setData(newData)
        setLoading(false)
      }
    }, 750)
  }, [])

  return <Table columns={columns} data={data} loading={loading} onSortingChange={onSortingChange} />
}

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

export const WithCustomStyles: Story = {
  args: {
    columns: getColumns({ withFooter: true }),
    contentClassName: styles.customTableContent,
    headerClassName: styles.customTableHeader,
    footerClassName: styles.customTableFooter,
  },
}

export const WithCustomRowAndCellProps: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Xs8yIZDwJ6tw1bMn1lB95Y/Clients-Filtering?node-id=130%3A307',
    },
  },
  args: {
    getCustomRowProps: (row) => {
      if (row.original.age < 15) {
        return {
          style: {
            background: 'white',
          },
        }
      }
      return {}
    },
    getCustomCellProps: (cell) => {
      if (cell.row.original.age < 15) {
        if (cell.column.id === 'age') {
          return {
            warning: 'Younger than 15',
            style: {
              color: '#707482',
            },
          }
        }
        return {
          style: {
            color: '#707482',
          },
        }
      } else if (cell.column.id === 'ID') {
        return {
          style: {
            borderLeft: '0.25rem solid limegreen',
            paddingLeft: '1rem',
          },
        }
      }
      return {}
    },
  },
}

export const WithColumnsSelection: Story = {
  args: {
    columns: getColumns({ withFooter: true }),
    onCopy: (value) => logger.log(value),
  },
}

export const WithColumnsOrdering: Story = {
  args: {
    disableSortBy: false,
    columnsOrdering: true,
  },
}

export const WithExpandableRows: Story = {
  args: {
    data: smallDataSetWithSubRows,
  },
}

export const WithExpandableRowsAndCustomContent: Story = {
  args: {
    data: smallDataSet,
    renderRowSubComponent: ({ original }) => <div>Sub row #{original.id}</div>,
  },
}
