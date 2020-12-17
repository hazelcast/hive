import { DataTestProp } from '@hazelcast/helpers'
import React, { ReactElement, useEffect } from 'react'
import {
  useTable,
  usePagination,
  TableOptions,
  useSortBy,
  Row as RowType,
  Cell as CellType,
  useAsyncDebounce,
  useResizeColumns,
  ColumnInterfaceBasedOnValue,
  useFlexLayout,
} from 'react-table'

import { Pagination } from '../Pagination'
import { Cell, CellProps } from './Cell'
import { EnhancedCellRenderer, EnhancedHeaderFooterRenderer } from './EnhancedRenderers'
import { Header } from './Header'
import { Row } from './Row'

import styles from './Table.module.scss'

export type FetchDataProps = {
  pageIndex: number
  pageSize: number
}

type ExtendedPaginationProps = {
  defaultPageSize?: number
  pageSizeOptions?: number[]
  hidePagination?: boolean
}

type ControlledPaginationProps = {
  manualPagination?: boolean
  fetchData?: ({ pageIndex, pageSize }: FetchDataProps) => void
}

type TableProps<D extends object> = TableOptions<D> &
  ExtendedPaginationProps &
  ControlledPaginationProps & {
    onRowClick?: (rowInfo: RowType<D>) => void
    getCustomCellProps?: (cellInfo: CellType<D>) => CellProps | void
  } & DataTestProp

const defaultColumn = {
  // When using the useFlexLayout:
  minWidth: 50, // minWidth is only used as a limit for resizing
}

export function Table<D extends object>({
  'data-test': dataTest,
  autoResetSortBy = false,
  columns,
  data,
  disableSortBy,
  fetchData,
  manualPagination,
  defaultPageSize = 10,
  pageCount: controlledPageCount,
  pageSizeOptions = [5, 10, 20],
  hidePagination = false,
  onRowClick,
  getCustomCellProps,
}: TableProps<D>): ReactElement {
  const {
    getTableProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, columnResizing },
  } = useTable<D>(
    {
      columns,
      data,
      disableSortBy,
      disableMultiSort: true,
      // https://react-table.tanstack.com/docs/faq#how-do-i-stop-my-table-state-from-automatically-resetting-when-my-data-changes
      autoResetSortBy,
      // Pass our hoisted table state
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
      // Tell the usePagination hook that we'll handle our own data fetching.
      // This means we'll also have to provide our own pageCount.
      manualPagination: manualPagination,
      pageCount: controlledPageCount,
      defaultColumn,
    },
    useSortBy,
    usePagination,
    useFlexLayout,
    useResizeColumns,
  )

  // Debounce our `fetchData` call for 200ms.
  // We can use non-null assertion here since we're checking existence of `fetchData` in the `useEffect` below
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const onFetchDataDebounced = useAsyncDebounce<({ pageIndex, pageSize }: FetchDataProps) => void>(fetchData!, 200)

  // Listen for changes in pagination and use the state to fetch new data. This is a recommended way to fetch new data: https://react-table.tanstack.com/docs/faq#how-can-i-use-the-table-state-to-fetch-new-data
  useEffect(() => {
    if (fetchData) {
      onFetchDataDebounced({ pageIndex, pageSize })
    }
  }, [fetchData, onFetchDataDebounced, pageIndex, pageSize])

  // If at least one of the columns has footer then we display the footer row
  const hasFooter = columns.some((col) => !!col.Footer)

  // Header row has always aria-rowindex = 1.
  const headerIndex = 1
  // We're using this offset to display correct aria-rowindex when pagination is in action.
  const cellIndexOffset = pageSize * pageIndex + headerIndex
  // Total row count.
  const rowCount = data.length + headerIndex + (hasFooter ? 1 : 0)
  const footerIndex = rowCount

  return (
    <div data-test={dataTest ?? 'table-wrapper'}>
      <div className={styles.container}>
        <div data-test="table" {...getTableProps()} className={styles.table} aria-rowcount={rowCount}>
          <div data-test="table-header-row-group" role="rowgroup">
            {headerGroups.map((headerGroup) => {
              const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
              return (
                <Row key={headerGroupKey} {...restHeaderGroupProps} ariaRowIndex={headerIndex} isHeaderRow>
                  {headerGroup.headers.map((column, i) => {
                    const { key: columnKey, ...restHeaderProps } = column.getHeaderProps(column.getSortByToggleProps())
                    return (
                      <Header
                        key={columnKey}
                        align={column.align}
                        canSort={column.canSort}
                        isSorted={column.isSorted}
                        isSortedDesc={column.isSortedDesc}
                        isLastHeader={headerGroup.headers.length === i + 1}
                        canResize={column.canResize}
                        isResizing={column.isResizing}
                        getResizerProps={column.getResizerProps}
                        {...restHeaderProps}
                      >
                        <EnhancedHeaderFooterRenderer column={column} columnResizing={columnResizing} type="Header" />
                      </Header>
                    )
                  })}
                </Row>
              )
            })}
          </div>
          <div data-test="table-cell-row-group" role="rowgroup">
            {page.map((row) => {
              prepareRow(row)
              const { key: rowKey, ...restRowProps } = row.getRowProps()
              return (
                <Row
                  key={rowKey}
                  {...restRowProps}
                  ariaRowIndex={row.index + 1 + cellIndexOffset}
                  isHeaderRow={false}
                  onClick={
                    onRowClick
                      ? () => {
                          onRowClick(row)
                        }
                      : undefined
                  }
                >
                  {row.cells.map((cell, i) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps()
                    const customCellProps = getCustomCellProps ? getCustomCellProps(cell) : {}
                    // We don't want to use cell.column.Cell as that is a ColumnInstance which already has a cell renderer
                    const column = columns[i] as ColumnInterfaceBasedOnValue<D>
                    return (
                      <Cell key={cellKey} align={cell.column.align} {...restCellProps} {...customCellProps}>
                        <EnhancedCellRenderer cell={cell} hasCellRenderer={!!column.Cell} columnResizing={columnResizing} />
                      </Cell>
                    )
                  })}
                </Row>
              )
            })}
          </div>
          {hasFooter && (
            <div data-test="table-footer-row-group" role="rowgroup">
              {/* Apparently footer props getters do not provide role attributes */}
              {footerGroups.map((group) => {
                const { key: footerGroupKey, ...restFooterGroupProps } = group.getFooterGroupProps()
                return (
                  <Row key={footerGroupKey} ariaRowIndex={footerIndex} isHeaderRow={false} {...restFooterGroupProps} role="row">
                    {group.headers.map((column) => {
                      const { key: footerKey, ...restFooterProps } = column.getFooterProps()
                      return (
                        <Cell key={footerKey} {...restFooterProps} align={column.align} role="cell">
                          <EnhancedHeaderFooterRenderer column={column} columnResizing={columnResizing} type="Footer" />
                        </Cell>
                      )
                    })}
                  </Row>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {!hidePagination && (
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex + 1}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          goToPage={(p) => gotoPage(p - 1)}
          nextPage={nextPage}
          previousPage={previousPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageSizeOptions={pageSizeOptions}
          numberOfItems={data.length}
        />
      )}
    </div>
  )
}
