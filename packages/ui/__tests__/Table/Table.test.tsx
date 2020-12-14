import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React, { PropsWithChildren } from 'react'

import { getColumns, makeData, Person } from './utils'
import { Table } from '../../src/Table/Table'
import { Row, RowProps } from '../../src/Table/Row'
import { Header, HeaderProps } from '../../src/Table/Header'
import { EnhancedHeaderRenderer, EnhancedHeaderRendererProps } from '../../src/Table/EnhancedRenderers'
import { Pagination, PaginationProps } from '../../src/Pagination'

import styles from '../../Table.module.scss'

const smallDataSet = makeData(10)
// const bigDataSet = makeData(10000)

describe('Table', () => {
  it('renders table and pagination with correct props', async () => {
    const columns = getColumns({})

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} disableSortBy />)

    const tableWrapper = wrapper.findDataTest('table-test')

    const table = tableWrapper.findDataTest('table')
    expect(table.props()).toEqual({
      'data-test': 'table',
      className: styles.table,
      'aria-rowcount': smallDataSet.length + 1,
      role: 'table',
      style: {
        minWidth: '300px',
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const headerRowGroup = table.findDataTest('table-header-row-group')
    expect(headerRowGroup.props()).toEqual({
      'data-test': 'table-header-row-group',
      role: 'rowgroup',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const headerRow = headerRowGroup.find(Row)
    expect(headerRow.props()).toEqual<PropsWithChildren<RowProps>>({
      ariaRowIndex: 1,
      isHeaderRow: true,
      role: 'row',
      style: {
        display: 'flex',
        flex: '1 0 auto',
        minWidth: '300px',
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const headers = headerRowGroup.find(Header)
    headers.forEach((header, i) => {
      expect(header.props()).toEqual<PropsWithChildren<HeaderProps>>({
        align: columns[i].align,
        canSort: false,
        isSorted: false,
        isSortedDesc: undefined,
        canResize: true,
        isResizing: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        getResizerProps: expect.anything(),
        onClick: undefined,
        colSpan: 1,
        role: 'columnheader',
        style: {
          boxSizing: 'border-box',
          flex: '150 0 auto',
          minWidth: '60px',
          position: 'relative',
          width: '150px',
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      })

      expect(header.find(EnhancedHeaderRenderer).props()).toEqual<EnhancedHeaderRendererProps<Person>>({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        column: expect.anything(),
        // We have to ignore typescript error here since the values of `columnResizing` props are different
        // than those described in @types/react-table.
        // TODO: Remove once the types are correct
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columnResizing: {
          columnWidths: {},
        },
      })
    })

    expect(tableWrapper.find(Pagination).props()).toEqual<PaginationProps>({
      pageCount: 1,
      currentPage: 1,
      canPreviousPage: false,
      canNextPage: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      goToPage: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      nextPage: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      previousPage: expect.anything(),
      pageSize: 10,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setPageSize: expect.anything(),
      pageSizeOptions: [5, 10, 20],
      numberOfItems: smallDataSet.length,
    })
  })
})
