import React, { PropsWithChildren, ReactElement, useEffect, useMemo } from 'react'
import {
  useTable,
  usePagination,
  TableOptions,
  useSortBy,
  Row as RowType,
  Cell as CellType,
  useAsyncDebounce,
  useResizeColumns,
  useFlexLayout,
  ColumnInterfaceBasedOnValue,
} from 'react-table'

import { Pagination } from '../Pagination'
import { Cell, CellProps } from './Cell'
import { EnhancedCellRenderer, EnhancedHeaderRenderer } from './EnhancedRenderers'
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
  }

const defaultColumn = {
  // When using the useFlexLayout:
  minWidth: 60, // minWidth is only used as a limit for resizing
  maxWidth: 200, // maxWidth is only used as a limit for resizing
}

export function Table<D extends object>({
  autoResetSortBy = false,
  columns,
  data,
  disableSortBy,
  fetchData,
  // loading,
  manualPagination,
  defaultPageSize = 10,
  pageCount: controlledPageCount,
  pageSizeOptions = [5, 10, 20],
  hidePagination = false,
  onRowClick,
  getCustomCellProps,
}: PropsWithChildren<TableProps<D>>): ReactElement {
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
    useResizeColumns,
    useFlexLayout,
  )

  // Debounce our `fetchData` call for 200ms
  // We can use non-null assertion here since we're checking existence of `fetchData` in the `useEffect` below
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const onFetchDataDebounced = useAsyncDebounce<({ pageIndex, pageSize }: FetchDataProps) => void>(fetchData!, 200)

  // Listen for changes in pagination and use the state to fetch new data
  useEffect(() => {
    if (fetchData) {
      onFetchDataDebounced({ pageIndex, pageSize })
    }
  }, [fetchData, onFetchDataDebounced, pageIndex, pageSize])

  // If at least one of the columns has footer then we display the footer row
  const hasFooter = useMemo(() => columns.some((col) => !!col.Footer), [columns])

  // Total row count, + 1 is for header row
  const rowCount = data.length + 1
  // We're using this offset to display correct aria-rowindex when pagination is in action.
  // + 1 is for header row.
  const ariaRowCellIndexOffset = pageSize * pageIndex + 1
  // Header row has always aria-rowindex = 1.
  const ariaRowHeaderIndex = 1

  return (
    <>
      <div className={styles.container}>
        <div {...getTableProps()} className={styles.table} aria-rowcount={rowCount}>
          <div role="rowgroup">
            {headerGroups.map((headerGroup) => {
              const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
              return (
                <Row key={headerGroupKey} {...restHeaderGroupProps} ariaRowIndex={ariaRowHeaderIndex} isHeaderRow>
                  {headerGroup.headers.map((column) => {
                    const { key: columnKey, ...restHeaderProps } = column.getHeaderProps(column.getSortByToggleProps())
                    return (
                      <Header
                        key={columnKey}
                        align={column.align}
                        canSort={column.canSort}
                        isSorted={column.isSorted}
                        isSortedDesc={column.isSortedDesc}
                        canResize={column.canResize}
                        isResizing={column.isResizing}
                        getResizerProps={column.getResizerProps}
                        {...restHeaderProps}
                      >
                        <EnhancedHeaderRenderer column={column} columnResizing={columnResizing} />
                      </Header>
                    )
                  })}
                </Row>
              )
            })}
          </div>
          <div role="rowgroup">
            {page.map((row) => {
              prepareRow(row)
              const { key: rowKey, ...restRowProps } = row.getRowProps()
              return (
                <Row
                  key={rowKey}
                  {...restRowProps}
                  ariaRowIndex={row.index + 1 + ariaRowCellIndexOffset}
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
                    // We don't want to use cell.column.Cell as that is a ColumnInstance which always has a cell renderer
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
            <div role="rowgroup">
              {footerGroups.map((group) => {
                const { key: footerGroupKey, ...restFooterGroupProps } = group.getFooterGroupProps()
                return (
                  <Row key={footerGroupKey} isHeaderRow={false} {...restFooterGroupProps}>
                    {group.headers.map((column) => {
                      const { key: footerKey, ...restFooterProps } = column.getFooterProps()
                      return (
                        <Cell key={footerKey} {...restFooterProps} align={column.align}>
                          {column.render('Footer')}
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
    </>
  )
}
