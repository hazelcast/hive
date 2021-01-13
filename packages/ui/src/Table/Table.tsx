import { DataTestProp } from '@hazelcast/helpers'
import React, { ReactElement, useEffect } from 'react'
import cn from 'classnames'
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

import { Pagination, PaginationProps } from '../Pagination'
import { Cell, CellProps } from './Cell'
import { EnhancedCellRenderer, EnhancedHeaderFooterRenderer } from './EnhancedRenderers'
import { Header } from './Header'
import { HeaderRow, LinkRow, Row } from './Row'

import styles from './Table.module.scss'
import styleConsts from '../../styles/constants/export.module.scss'

/**
 * `defaultPageSize` should be one of the values in `pageSizeOptions`.
 * If it's not it won't break anything but it is a bad UX
 * because once user selects different page size he won't be able to select
 * `defaultPageSize` again.
 */
type ExtendedPaginationProps = {
  defaultPageSize?: PaginationProps['pageSize']
  pageSizeOptions?: PaginationProps['pageSizeOptions']
  pageSiblingCount?: PaginationProps['siblingCount']
  hidePagination?: boolean
}

export type FetchDataProps = {
  pageIndex: number
  pageSize: number
}

// When using manual pagination always provide `fetchData` function and our own pageCount
export type ControlledPaginationProps = {
  manualPagination?: boolean
  fetchData?: (fetchDataProps: FetchDataProps) => void
}

type CustomTableRowClickProps<D extends object> =
  | {
      // When using `onRowClick` it's a good practice to also make one of the cells in the table interactive by providing a button, link or something else.
      // An example can be found in `ClickableRowsWithNameLink` story in Table.stories.tsx
      onRowClick?: (rowInfo: RowType<D>) => void
      getHref?: never
    }
  | {
      // Alternative to onRowClick is a getHref function.
      // Provide a function which returns URL that will be used as href attribute for underlying <a> element.
      getHref?: (rowInfo: RowType<D>) => string
      onRowClick?: never
    }

type CustomTableProps<D extends object> = {
  // Custom props getter for Cell
  getCustomCellProps?: (cellInfo: CellType<D>) => CellProps
} & CustomTableRowClickProps<D> &
  DataTestProp

type TableProps<D extends object> = TableOptions<D> & ExtendedPaginationProps & ControlledPaginationProps & CustomTableProps<D>

const column = {
  // When using the useFlexLayout:
  minWidth: Number(styleConsts.tableColumnMinWidth), // minWidth is only used as a limit for resizing
  width: Number(styleConsts.tableColumnWidth), // width is used for both the flex-basis and flex-grow
  maxWidth: Number(styleConsts.tableColumnMaxWidth), // maxWidth is only used as a limit for resizing
}

// Inspiration here: https://react-table.tanstack.com/docs/examples/basic
export const Table = <D extends object>({
  'data-test': dataTest,
  autoResetSortBy = false,
  columns,
  data,
  defaultColumn = column,
  disableSortBy,
  fetchData,
  manualPagination,
  // TODO: ask Pawel to provide design for loading and empty state!
  // loading,
  pageCount: controlledPageCount,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20],
  hidePagination = false,
  pageSiblingCount,
  onRowClick,
  getHref,
  getCustomCellProps,
}: TableProps<D>): ReactElement => {
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
      // Tell the usePagination hook that we'll handle our own data fetching
      manualPagination: manualPagination,
      // This means we'll also have to provide our own pageCount
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

  return (
    <div data-test={dataTest ?? 'table-wrapper'}>
      <div
        className={cn(styles.container, {
          [styles.margin]: !hidePagination,
        })}
      >
        <div data-test="table" {...getTableProps()} className={styles.table} aria-rowcount={rowCount}>
          <div data-test="table-header-row-group" role="rowgroup">
            {headerGroups.map((headerGroup) => {
              const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
              return (
                <HeaderRow key={headerGroupKey} {...restHeaderGroupProps} ariaRowIndex={headerIndex}>
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
                </HeaderRow>
              )
            })}
          </div>
          <div data-test="table-cell-row-group" role="rowgroup">
            {page.map((row) => {
              prepareRow(row)
              const { key: rowKey, ...restRowProps } = row.getRowProps()
              const cells = row.cells.map((cell, i) => {
                const { key: cellKey, ...restCellProps } = cell.getCellProps()
                const customCellProps = getCustomCellProps ? getCustomCellProps(cell) : {}
                // We don't want to use cell.column.Cell as that is a ColumnInstance which already has a cell renderer
                const column = columns[i] as ColumnInterfaceBasedOnValue<D>
                return (
                  <Cell key={cellKey} align={cell.column.align} {...restCellProps} {...customCellProps}>
                    <EnhancedCellRenderer cell={cell} hasCellRenderer={!!column.Cell} columnResizing={columnResizing} />
                  </Cell>
                )
              })
              return getHref ? (
                <LinkRow key={rowKey} {...restRowProps} ariaRowIndex={row.index + 1 + cellIndexOffset} href={getHref(row)}>
                  {cells}
                </LinkRow>
              ) : (
                <Row
                  key={rowKey}
                  {...restRowProps}
                  ariaRowIndex={row.index + 1 + cellIndexOffset}
                  onClick={
                    onRowClick
                      ? () => {
                          onRowClick(row)
                        }
                      : undefined
                  }
                >
                  {cells}
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
                  <Row key={footerGroupKey} ariaRowIndex={rowCount} {...restFooterGroupProps} role="row">
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
          siblingCount={pageSiblingCount}
        />
      )}
    </div>
  )
}
