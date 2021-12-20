import { axeDefaultOptions, mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React, { PropsWithChildren } from 'react'
import { act } from 'react-dom/test-utils'

import { getColumns, Person } from './utils'
import { Table } from '../../src/Table/Table'
import { HeaderRow, Row, RowProps } from '../../src/Table/Row'
import { Header, HeaderProps } from '../../src/Table/Header'
import { Cell, CellProps } from '../../src/Table/Cell'
import {
  EnhancedCellRenderer,
  EnhancedCellRendererProps,
  EnhancedHeaderFooterRenderer,
  EnhancedHeaderFooterRendererProps,
} from '../../src/Table/EnhancedRenderers'
import { Pagination, PaginationProps } from '../../src/Pagination'
import { Button } from '../../src/Button'
import { bigDataSet, smallDataSet } from './consts'
import { useTableCustomizableColumns } from '../../src/hooks/useTableCustomizableColumns'

const axeOptions = {
  ...axeDefaultOptions,
  rules: {
    ...axeDefaultOptions?.rules,
    'autocomplete-valid': { enabled: false },
  },
}

describe('Table', () => {
  it('renders table and pagination with correct props', async () => {
    const columns = getColumns({})

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} disableSortBy />, {
      axeOptions,
    })

    const tableWrapper = wrapper.findDataTest('table-test')

    const table = tableWrapper.findDataTest('table')
    expect(table.props()).toMatchObject({
      'data-test': 'table',
      'aria-rowcount': smallDataSet.length + 1,
      role: 'table',
    })

    const headerRowGroup = table.findDataTest('table-header-row-group')
    expect(headerRowGroup.props()).toMatchObject({
      'data-test': 'table-header-row-group',
      role: 'rowgroup',
      className: '',
    })

    const headerRow = headerRowGroup.find(HeaderRow)
    expect(headerRow.props()).toMatchObject<PropsWithChildren<RowProps>>({
      ariaRowIndex: 1,
      role: 'row',
    })

    const headers = headerRowGroup.find(Header)
    headers.forEach((header, i: number) => {
      expect(header.props()).toMatchObject<PropsWithChildren<HeaderProps>>({
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
      })

      expect(header.find(EnhancedHeaderFooterRenderer).props()).toMatchObject<EnhancedHeaderFooterRendererProps<Person>>({
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
    expect(cellRowGroup.props()).toMatchObject({
      'data-test': 'table-cell-row-group',
      role: 'rowgroup',
      className: '',
    })

    const cellRows = cellRowGroup.find(Row)
    cellRows.forEach((cellRow, i: number) => {
      expect(cellRow.props()).toMatchObject<PropsWithChildren<RowProps>>({
        // 1 for header row, 1 because we're indexing from 0
        ariaRowIndex: i + 2,
        role: 'row',
      })

      const cells = cellRow.find(Cell)
      cells.forEach((cell, j) => {
        expect(cell.props()).toMatchObject<PropsWithChildren<CellProps>>({
          align: columns[j].align,
          role: 'cell',
        })

        expect(cell.find(EnhancedCellRenderer).props()).toMatchObject<EnhancedCellRendererProps<Person>>({
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

    expect(tableWrapper.find(Pagination).props()).toMatchObject<PaginationProps>({
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

    expect(wrapper.existsDataTest('table-no-data')).toBe(false)
    expect(wrapper.findDataTest('table-loader-cell').exists()).toBe(false)
  })

  it('renders table footer with correct props', async () => {
    const columns = getColumns({ withFooter: true })

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} disableSortBy />, {
      axeOptions,
    })

    const footerRowGroup = wrapper.findDataTest('table-footer-row-group')
    expect(footerRowGroup.props()).toEqual({
      'data-test': 'table-footer-row-group',
      role: 'rowgroup',
      className: '',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const footerRow = footerRowGroup.find(Row)
    expect(footerRow.props()).toEqual<PropsWithChildren<RowProps>>({
      ariaRowIndex: 12,
      role: 'row',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      style: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const cells = footerRow.find(Cell)
    cells.forEach((footer, i) => {
      expect(footer.props()).toEqual<PropsWithChildren<CellProps>>({
        align: columns[i].align,
        colSpan: 1,
        role: 'cell',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        style: expect.anything(),
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      style: expect.anything(),
      // We ignore typescript error here since `title` prop is not described in @types/react-table and we're not using it anyway.
      // TODO: Remove once the types are correct
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      title: 'Toggle SortBy',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    }

    const columns = getColumns({})

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} />, { axeOptions })

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

  it('renders table without data', async () => {
    const columns = getColumns({ withFooter: true })

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={[]} hidePagination />)

    expect(wrapper.findDataTest('table').exists()).toBe(true)
    expect(wrapper.findDataTest('table-footer-row-group').exists()).toBe(false)
    expect(wrapper.existsDataTest('table-no-data')).toBe(true)
    expect(wrapper.find(Pagination).exists()).toBeFalsy()
  })

  it('renders table with loader when data exists', async () => {
    const columns = getColumns({ withFooter: true })

    const wrapper = await mountAndCheckA11Y(<Table loading data-test="table-test" columns={columns} data={smallDataSet} hidePagination />)

    expect(wrapper.findDataTest('table').exists()).toBe(true)
    expect(wrapper.findDataTest('table-footer-row-group').exists()).toBe(false)
    expect(wrapper.existsDataTest('table-no-data')).toBe(false)
    expect(wrapper.findDataTest('table-loader-cell').exists()).toBe(true)
  })

  it('renders table with loader when data not exists', async () => {
    const columns = getColumns({ withFooter: true })

    const wrapper = await mountAndCheckA11Y(<Table loading data-test="table-test" columns={columns} data={[]} hidePagination />)

    expect(wrapper.findDataTest('table').exists()).toBe(true)
    expect(wrapper.findDataTest('table-footer-row-group').exists()).toBe(false)
    expect(wrapper.existsDataTest('table-no-data')).toBe(false)
    expect(wrapper.findDataTest('table-loader-cell').exists()).toBe(true)
  })

  it('renders table without header', async () => {
    const columns = getColumns({ withFooter: true })

    const wrapper = await mountAndCheckA11Y(<Table hideHeader data-test="table-test" columns={columns} data={[]} hidePagination />)

    expect(wrapper.findDataTest('table').exists()).toBe(true)
    expect(wrapper.findDataTest('table-header-row-group').exists()).toBe(false)
  })

  it('With customizable columns should render all columns by default', async () => {
    const columns = getColumns({ withFooter: true })
    const Wrapper = () => {
      const { tableColumns, control } = useTableCustomizableColumns(columns)

      return (
        <div>
          {control}
          <Table data-test="table-test" columns={tableColumns} data={[]} hidePagination />
        </div>
      )
    }

    const wrapper = await mountAndCheckA11Y(<Wrapper />)

    expect(wrapper.findDataTest('table-custom-columns').exists()).toBeTruthy()
    expect(wrapper.findDataTest('table-test').at(0).prop('columns')).toEqual(columns)
  })

  it('With customizable columns should render without columns when all columns unselected', async () => {
    const columns = getColumns({ withFooter: true })
    const Wrapper = () => {
      const { tableColumns, control } = useTableCustomizableColumns(columns)

      return (
        <div>
          {control}
          <Table data-test="table-test" columns={tableColumns} data={[]} hidePagination />
        </div>
      )
    }

    const wrapper = await mountAndCheckA11Y(<Wrapper />)

    expect(wrapper.findDataTest('table-custom-columns').exists()).toBeTruthy()
    expect(wrapper.findDataTest('table-test').at(0).prop('columns')).toEqual(columns)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('table-custom-columns-opener').find('input').simulate('click')
    })
    wrapper.update()
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('table-custom-columns-select-none').at(0).simulate('click')
    })
    wrapper.update()

    expect(wrapper.findDataTest('table-test').at(0).prop('columns')).toEqual([])
  })

  it('Reset out of range pageIndex to last available page', async () => {
    const columns = getColumns({ withFooter: true })

    const wrapper = await mountAndCheckA11Y(<Table data-test="table-test" columns={columns} data={bigDataSet} />)

    expect(wrapper.find(Pagination).prop('currentPage')).toBe(1)

    act(() => {
      wrapper.find(Pagination).find(Button).at(1).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(Pagination).prop('currentPage')).toBe(2)

    wrapper.setProps({
      data: smallDataSet,
    })
    wrapper.update()

    expect(wrapper.find(Pagination).prop('currentPage')).toBe(1)
  })

  it('Controlled pagination', async () => {
    const columns = getColumns({ withFooter: true })
    const onPageChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Table data-test="table-test" pageIndex={1} columns={columns} data={bigDataSet} onPageChange={onPageChange} />,
    )

    expect(wrapper.find(Pagination).prop('currentPage')).toBe(2)

    act(() => {
      wrapper.find(Pagination).find(Button).at(2).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(Pagination).prop('currentPage')).toBe(2)

    wrapper.setProps({
      pageIndex: 2,
    })
    wrapper.update()

    expect(wrapper.find(Pagination).prop('currentPage')).toBe(3)
  })
})
