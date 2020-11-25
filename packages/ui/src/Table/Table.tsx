import React, { PropsWithChildren, ReactElement, useEffect, useMemo } from 'react'
import { useTable, usePagination, TableOptions, useSortBy, Row as RowType, Cell as CellType, useAsyncDebounce } from 'react-table'
import { Pagination } from '../Pagination'
import { Body } from './Body'
import { Cell, CellProps } from './Cell'
import { Head } from './Head'
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

// Create a default prop getter
const defaultPropGetter = () => ({})

export function Table<D extends object>({
  columns,
  data,
  disableSortBy,
  fetchData,
  loading,
  manualPagination,
  defaultPageSize = 10,
  pageCount: controlledPageCount,
  pageSizeOptions = [5, 10, 20],
  hidePagination = false,
  onRowClick,
  getCustomCellProps = defaultPropGetter,
}: PropsWithChildren<TableProps<D>>): ReactElement {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable<D>(
    {
      columns,
      data,
      disableSortBy,
      disableMultiSort: true,
      // https://react-table.tanstack.com/docs/faq#how-do-i-stop-my-table-state-from-automatically-resetting-when-my-data-changes
      autoResetSortBy: false,
      // Pass our hoisted table state
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
      // Tell the usePagination hook that we'll handle our own data fetching.
      // This means we'll also have to provide our own pageCount.
      manualPagination: manualPagination,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
  )

  // Debounce our onFetchData call for 100ms
  const onFetchDataDebounced = useAsyncDebounce<({ pageIndex, pageSize }: FetchDataProps) => void>(
    fetchData ??
      (() => {
        // Do nothing
      }),
    200,
  )

  // Listen for changes in pagination and use the state to fetch new data
  useEffect(() => {
    if (fetchData) {
      onFetchDataDebounced({ pageIndex, pageSize })
    }
  }, [fetchData, onFetchDataDebounced, pageIndex, pageSize])

  const hasFooter = useMemo(() => columns.some((col) => !!col.Footer), [columns])

  return (
    <>
      <table {...getTableProps()} className={styles.table}>
        <Head>
          {headerGroups.map((headerGroup) => {
            const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
            return (
              <Row key={headerGroupKey} {...restHeaderGroupProps} isHeaderRow>
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...restHeaderProps } = column.getHeaderProps(column.getSortByToggleProps())
                  return (
                    <Header
                      key={columnKey}
                      {...restHeaderProps}
                      align={column.align}
                      canSort={column.canSort}
                      isSorted={column.isSorted}
                      isSortedDesc={column.isSortedDesc}
                    >
                      {column.render('Header')}
                    </Header>
                  )
                })}
              </Row>
            )
          })}
        </Head>
        <Body {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            const { key: rowKey, ...restRowProps } = row.getRowProps()
            return (
              <Row
                key={rowKey}
                {...restRowProps}
                isHeaderRow={false}
                onClick={
                  onRowClick
                    ? () => {
                        onRowClick(row)
                      }
                    : undefined
                }
              >
                {row.cells.map((cell) => {
                  const { key: cellKey, ...restCellProps } = cell.getCellProps()
                  return (
                    <Cell key={cellKey} {...restCellProps} align={cell.column.align} {...getCustomCellProps(cell)}>
                      {cell.render('Cell')}
                    </Cell>
                  )
                })}
              </Row>
            )
          })}
        </Body>
        {hasFooter && (
          <tfoot>
            {footerGroups.map((group) => {
              const { key: footerGroupKey, ...restFooterGroupProps } = group.getFooterGroupProps()
              return (
                <tr key={footerGroupKey} {...restFooterGroupProps}>
                  {group.headers.map((column) => {
                    const { key: footerKey, ...restFooterProps } = column.getFooterProps()
                    return (
                      <td key={footerKey} {...restFooterProps}>
                        {column.render('Footer')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tfoot>
        )}
      </table>

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
