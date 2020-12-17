import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React, { PropsWithChildren } from 'react'

import { getColumns, makeData, Person } from './utils'
import { Table } from '../../src/Table/Table'
import { Row, RowProps } from '../../src/Table/Row'
import { Header, HeaderProps } from '../../src/Table/Header'
import { Cell, CellProps } from '../../src/Table/Cell'
import {
  EnhancedCellRenderer,
  EnhancedCellRendererProps,
  EnhancedHeaderFooterRenderer,
  EnhancedHeaderFooterRendererProps,
} from '../../src/Table/EnhancedRenderers'
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
        minWidth: '150px',
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
        minWidth: '150px',
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
        isLastHeader: headers.length === i + 1,
        onClick: undefined,
        colSpan: 1,
        role: 'columnheader',
        style: {
          boxSizing: 'border-box',
          flex: '150 0 auto',
          minWidth: '30px',
          position: 'relative',
          width: '150px',
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      })

      expect(header.find(EnhancedHeaderFooterRenderer).props()).toEqual<EnhancedHeaderFooterRendererProps<Person>>({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        column: expect.anything(),
        type: 'Header',
        // We ignore typescript error here since some props of `columnResizing` are in fact nullable as opposed
        // to those described in @types/react-table.
        // TODO: Remove once the types are correct
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columnResizing: {
          columnWidths: {},
        },
      })
    })

    const cellRowGroup = table.findDataTest('table-cell-row-group')
    expect(cellRowGroup.props()).toEqual({
      'data-test': 'table-cell-row-group',
      role: 'rowgroup',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const cellRows = cellRowGroup.find(Row)
    cellRows.forEach((cellRow, i) => {
      expect(cellRow.props()).toEqual<PropsWithChildren<RowProps>>({
        // 1 for header row, 1 because we're indexing from 0
        ariaRowIndex: i + 2,
        isHeaderRow: false,
        role: 'row',
        style: {
          display: 'flex',
          flex: '1 0 auto',
          minWidth: '150px',
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      })

      const cells = cellRow.find(Cell)
      cells.forEach((cell, j) => {
        expect(cell.props()).toEqual<PropsWithChildren<CellProps>>({
          align: columns[j].align,
          role: 'cell',
          style: {
            boxSizing: 'border-box',
            flex: '150 0 auto',
            minWidth: '30px',
            width: '150px',
          },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          children: expect.anything(),
        })

        expect(cell.find(EnhancedCellRenderer).props()).toEqual<EnhancedCellRendererProps<Person>>({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          cell: expect.anything(),
          hasCellRenderer: false,
          // We ignore typescript error here since some props of `columnResizing` are in fact nullable as opposed
          // to those described in @types/react-table.
          // TODO: Remove once the types are correct
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          columnResizing: {
            columnWidths: {},
          },
        })
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

  it('renders table footer with correct props', async () => {
    const columns = getColumns({ withFooter: true })

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} disableSortBy />)

    const footerRowGroup = wrapper.findDataTest('table-footer-row-group')
    expect(footerRowGroup.props()).toEqual({
      'data-test': 'table-footer-row-group',
      role: 'rowgroup',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const footerRow = footerRowGroup.find(Row)
    expect(footerRow.props()).toEqual<PropsWithChildren<RowProps>>({
      ariaRowIndex: 12,
      isHeaderRow: false,
      role: 'row',
      style: {
        display: 'flex',
        flex: '1 0 auto',
        minWidth: '150px',
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const cells = footerRow.find(Cell)
    cells.forEach((footer, i) => {
      expect(footer.props()).toEqual<PropsWithChildren<CellProps>>({
        align: columns[i].align,
        colSpan: 1,
        role: 'cell',
        style: {
          boxSizing: 'border-box',
          flex: '150 0 auto',
          minWidth: '30px',
          width: '150px',
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      })

      expect(footer.find(EnhancedHeaderFooterRenderer).props()).toEqual<EnhancedHeaderFooterRendererProps<Person>>({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        column: expect.anything(),
        type: 'Footer',
        // We ignore typescript error here since some props of `columnResizing` are in fact nullable as opposed
        // to those described in @types/react-table.
        // TODO: Remove once the types are correct
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columnResizing: {
          columnWidths: {},
        },
      })
    })
  })

  it('renders table without pagination', async () => {
    const columns = getColumns({})

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} hidePagination />)

    expect(wrapper.findDataTest('table').exists()).toBe(true)
    expect(wrapper.find(Pagination).exists()).toBe(false)
  })

  it('renders table with sorting capabilities', async () => {
    const headerProps: PropsWithChildren<HeaderProps> = {
      align: 'left',
      canSort: false,
      isSorted: false,
      isSortedDesc: undefined,
      canResize: true,
      isResizing: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      getResizerProps: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
      colSpan: 1,
      role: 'columnheader',
      style: {
        boxSizing: 'border-box',
        cursor: 'pointer',
        flex: '150 0 auto',
        minWidth: '30px',
        position: 'relative',
        width: '150px',
      },
      // We ignore typescript error here since `title` prop is not described in @types/react-table and we're not using it anyway.
      // TODO: Remove once the types are correct
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      title: 'Toggle SortBy',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    }

    const columns = getColumns({})

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} />)

    const headers = wrapper.find(Header)
    headers.forEach((header, i) => {
      const isLastHeader = headers.length === i + 1
      // Sorting enabled but not used
      expect(header.props()).toEqual<PropsWithChildren<HeaderProps>>({
        ...headerProps,
        align: columns[i].align,
        canSort: true,
        isSorted: false,
        isSortedDesc: undefined,
        isLastHeader,
      })

      // Let's sort!
      header.findDataTest('table-header-content').simulate('click')
      wrapper.update()
      expect(wrapper.find(Header).at(i).props()).toEqual<PropsWithChildren<HeaderProps>>({
        ...headerProps,
        align: columns[i].align,
        canSort: true,
        isSorted: true,
        isSortedDesc: false,
        isLastHeader,
      })

      // Let's sort in descending order
      header.findDataTest('table-header-content').simulate('click')
      wrapper.update()
      expect(wrapper.find(Header).at(i).props()).toEqual<PropsWithChildren<HeaderProps>>({
        ...headerProps,
        align: columns[i].align,
        canSort: true,
        isSorted: true,
        isSortedDesc: true,
        isLastHeader,
      })

      // Back to default state
      header.findDataTest('table-header-content').simulate('click')
      wrapper.update()
      expect(wrapper.find(Header).at(i).props()).toEqual<PropsWithChildren<HeaderProps>>({
        ...headerProps,
        align: columns[i].align,
        canSort: true,
        isSorted: false,
        isSortedDesc: undefined,
        isLastHeader,
      })
    })
  })

  it('works correctly with controlled pagination', async () => {
    const columns = getColumns({})

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} hidePagination />)

    expect(wrapper.findDataTest('table').exists()).toBe(true)
    expect(wrapper.find(Pagination).exists()).toBe(false)
  })
})
