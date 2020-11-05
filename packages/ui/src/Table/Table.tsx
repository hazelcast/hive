import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
} from 'react'
import {
  useTable,
  usePagination,
  TableOptions,
  useSortBy,
  Row as RowType,
} from 'react-table'
import { Body } from './Body'
import { Cell } from './Cell'
import { Head } from './Head'
import { Header } from './Header'
import { Row } from './Row'
import styles from './Table.module.scss'

export type FetchDataProps = {
  pageIndex: number
  pageSize: number
}

type ExtendedPaginationProps = {
  pageSizeOptions?: number[]
  hidePagination?: boolean
}

type ControlledPaginationProps = {
  manualPagination?: boolean
  fetchData?: ({ pageIndex, pageSize }: FetchDataProps) => void
}

type TableProps<T extends object> = TableOptions<T> &
  ExtendedPaginationProps &
  ControlledPaginationProps & {
    onRowClick?: (row: RowType<T>) => void
  }

export function Table<T extends object>({
  columns,
  data,
  disableSortBy,
  fetchData,
  loading,
  manualPagination,
  pageCount: controlledPageCount,
  pageSizeOptions = [10, 20, 30],
  hidePagination = false,
  onRowClick,
}: PropsWithChildren<TableProps<T>>): ReactElement {
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
  } = useTable<T>(
    {
      columns,
      data,
      disableSortBy,
      disableMultiSort: true,
      // Pass our hoisted table state
      initialState: { pageIndex: 0 },
      // Tell the usePagination hook that we'll handle our own data fetching.
      // This means we'll also have to provide our own pageCount.
      manualPagination: manualPagination,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
  )

  const hasFooter = useMemo(
    () => columns.some((col) => !!col.Footer),
    [columns],
  )

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    if (fetchData) {
      fetchData({ pageIndex, pageSize })
    }
  }, [fetchData, pageIndex, pageSize])

  return (
    <>
      <table {...getTableProps()} className={styles.table}>
        <Head>
          {headerGroups.map((headerGroup) => {
            const {
              key: headerGroupKey,
              ...restHeaderGroupProps
            } = headerGroup.getHeaderGroupProps()
            return (
              <Row
                key={headerGroupKey}
                {...restHeaderGroupProps}
                isHeaderRow
              >
                {headerGroup.headers.map((column) => {
                  const {
                    key: columnKey,
                    ...restHeaderProps
                  } = column.getHeaderProps(
                    column.getSortByToggleProps(),
                  )
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
                  const {
                    key: cellKey,
                    ...restCellProps
                  } = cell.getCellProps()
                  return (
                    <Cell
                      key={cellKey}
                      {...restCellProps}
                      align={cell.column.align}
                    >
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
              const {
                key: footerGroupKey,
                ...restFooterGroupProps
              } = group.getFooterGroupProps()
              return (
                <tr key={footerGroupKey} {...restFooterGroupProps}>
                  {group.headers.map((column) => {
                    const {
                      key: footerKey,
                      ...restFooterProps
                    } = column.getFooterProps()
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

      {!hidePagination && pageOptions.length > 1 && (
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </button>{' '}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value
                  ? Number(e.target.value) - 1
                  : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onBlur={(e) => {
              if (Number(e.target.value) !== pageSize) {
                setPageSize(Number(e.target.value))
              }
            }}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  )
}
