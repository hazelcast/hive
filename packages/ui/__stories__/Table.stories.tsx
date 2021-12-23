import React, { useCallback, useMemo, useRef, useState } from 'react'
import { logger } from '@hazelcast/services'
import { Meta, Story } from '@storybook/react'

import { PaginationChangeProps, Table, TableProps } from '../src/Table/Table'
import { getColumns, Person } from '../__tests__/Table/utils'
import { bigDataSet, smallDataSet } from '../__tests__/Table/consts'
import { TextField } from '../src'

import storyStyles from './TextField.stories.module.scss'
import styles from './utils.scss'

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

const Template: Story<TableProps<Person>> = (args) => <Table {...args} />

export const Default = Template.bind({})

export const Empty = Template.bind({})
Empty.args = {
  data: [],
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
}

export const WithFooter = Template.bind({})
WithFooter.args = {
  columns: getColumns({ withFooter: true }),
}

export const WithHiddenHeader = Template.bind({})
WithHiddenHeader.args = {
  hideHeader: true,
}

export const WithClickableRows = Template.bind({})
WithClickableRows.args = {
  onRowClick: (row) => {
    logger.log(`You just clicked (or pressed) row: ${row.values.name as Person['name']}`)
  },
}

export const WithClickableAnchorRows = Template.bind({})
WithClickableAnchorRows.args = {
  getHref: (row) => {
    logger.log(`You just clicked (or pressed) row: ${row.values.name as Person['name']}. You can use row info to generate href!`)
    return window.location.hash
  },
}

export const Sortable = Template.bind({})
Sortable.args = {
  disableSortBy: false,
}

export const WithUncontrolledPagination = Template.bind({})
WithUncontrolledPagination.args = {
  data: bigDataSet,
  hidePagination: false,
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

export const WithCustomStyles = Template.bind({})
WithCustomStyles.args = {
  contentClassName: styles.customTableContent,
  headerClassName: styles.customTableHeader,
  footerClassName: styles.customTableFooter,
}

export const WithCustomRowAndCellProps = Template.bind({})
WithCustomRowAndCellProps.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Xs8yIZDwJ6tw1bMn1lB95Y/Clients-Filtering?node-id=130%3A307',
  },
}
WithCustomRowAndCellProps.args = {
  getCustomRowProps: (row) => {
    if (row.values.age < 15) {
      return {
        style: {
          background: 'white',
        },
      }
    }
    return {}
  },
  getCustomCellProps: (cell) => {
    if (cell.row.values.age < 15) {
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
    } else if (cell.column.id === 'id') {
      return {
        style: {
          borderLeft: '0.25rem solid limegreen',
          paddingLeft: '1rem',
        },
      }
    }
    return {}
  },
}

export const WithCustomizableColumns: Story<TableProps<Person>> = ({ columns, ...args }) => {
  return (
    <Table columns={columns} {...args}>
      {(table, toggleColumnsControl) => (
        <div>
          {toggleColumnsControl}
          {table}
        </div>
      )}
    </Table>
  )
}

export const WithColumnsOrdering: Story<TableProps<Person>> = ({ columns, ...args }) => {
  return <Table columnsOrdering columns={columns} {...args} />
}
