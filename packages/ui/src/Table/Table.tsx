import { DataTestProp } from '@hazelcast/helpers'
import debounce from 'lodash/debounce'
import React, {
  AnchorHTMLAttributes,
  FC,
  ReactChild,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  DragEvent,
  useMemo,
  ReactNode,
  useState,
} from 'react'
import cn from 'classnames'
import { HotKeys, KeyMap } from 'react-hotkeys'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  ColumnDef,
  Row as TableRow,
} from '@tanstack/react-table'
import { AlertTriangle, ChevronDown, ChevronUp } from 'react-feather'

import { Pagination, PaginationProps } from '../Pagination'
import { Cell, CellProps } from './Cell'
import { EnhancedCellRenderer, EnhancedHeaderFooterRenderer } from './EnhancedRenderers'
import { Header } from './Header'
import { HeaderRow, Row, RowProps } from './Row'
import { Loader } from '../Loader'
import { EmptyState } from '../EmptyState'
import { usePrevious } from '../hooks/usePrevious'
import { Icon } from '../Icon'
import { TableContent } from './TableContent'
import { ROW_EXPANDER_COLUMN_ID } from './constants'
import { useColumnsSelection, ContextMenu } from './features/columnsSelection'
import { useRefValue } from '../hooks'
import { useTrackTableState } from './useTrackTableState'
import { CellType, ColumnType, InitialState, RowData, RowType, SortingRule, TableState } from './tableTypes'
import { getCellStyle, getColumnDef, getRowStyle, getTableInitialState, prepareRow } from './utils'

import styles from './Table.module.scss'
import styleConsts from '../../styles/constants/export.module.scss'

export type PaginationOptions = Partial<Pick<PaginationProps, 'pageSizeOptions'>>
export * from './tableTypes'

/**
 * `defaultPageSize` should be one of the values in `pageSizeOptions`.
 * If it's not it won't break anything but it is a bad UX
 * because once user selects different page size he won't be able to select
 * `defaultPageSize` again.
 */
type ExtendedPaginationProps = {
  paginationOptions?: PaginationOptions
  defaultPageSize?: number
  hidePagination?: boolean
}

export type PaginationChangeProps = {
  pageSize: number
  pageIndex: number
}

// When using manual pagination always provide `fetchData` function and our own pageCount
export type ControlledPaginationProps = {
  manualPagination?: boolean
  onPaginationChange?: (paginationChangeProps: PaginationChangeProps) => void
}

export type ControlledSortingProps = {
  onSortingChange?: (sortBy: SortingRule[]) => void
}

type CustomTableRowClickProps<D extends RowData> =
  | {
      // When using `onRowClick` it's a good practice to also make one of the cells in the table interactive by providing a button, link or something else.
      // An example can be found in `ClickableRowsWithNameLink` story in Table.stories.tsx
      onRowClick?: (rowInfo: RowType<D>) => void
      getHref?: never
      AnchorComponent?: never
    }
  | {
      // Alternative to onRowClick is a getHref function.
      // Provide a function which returns URL that will be used as href attribute for underlying <a> element.
      getHref?: (rowInfo: RowType<D>) => string | undefined
      onRowClick?: never
      AnchorComponent?: FC<AnchorHTMLAttributes<HTMLAnchorElement>>
    }

type CustomTableProps<D extends RowData> = {
  loading?: boolean
  tableId?: string
  overlayLoading?: boolean
  className?: string
  hideHeader?: boolean
  searchValue?: string
  headerClassName?: string
  paginationClassName?: string
  footerClassName?: string
  contentClassName?: string
  noDataTitle?: ReactChild
  // Custom props getter for Row
  getCustomRowProps?: (rowInfo: RowType<D>) => RowProps
  // Custom props getter for Cell
  getCustomCellProps?: (cellInfo: CellType<D>) => CellProps
  onRenderedContentChange?: (newPage: RowType<D>[]) => void
  pageIndex?: number
  onPageChange?: (newPage: number) => void
  onRowSelect?: (ids: string[]) => void
  columnsOrdering?: boolean
  children?: (table: ReactElement) => ReactElement
  renderRowSubComponent?: (props: RowType<D>) => ReactNode
  canExpand?: (row: RowType<D>) => boolean
  onCopy?: (data: (string | undefined)[][]) => void
  initialState?: InitialState
  onStateChange?: ((newState: TableState) => void) | null
} & CustomTableRowClickProps<D> &
  DataTestProp

export type TableProps<D extends RowData> = {
  data: D[]
  columns: ColumnType<D>[]
  pageCount?: number
  disableSortBy?: boolean
  pageSize?: number
} & ExtendedPaginationProps &
  ControlledPaginationProps &
  ControlledSortingProps &
  CustomTableProps<D>

/**
 * ### Purpose
 * Table component allows to arrange data in rows and columns.
 *
 * ### General Info
 * - Has built-in pagination which can be either controlled or uncontrolled
 * - Is able to sort data (you can provide custom sorting function)
 * - Rows can be clickable. If you supply Table with `getHref` function rows will become <a> tags!
 * - Is able to resize columns out of the box
 */
// Inspiration here: https://react-table.tanstack.com/docs/examples/basic
export const Table = <D extends RowData & { subRows?: D[] }>({
  'data-test': dataTest,
  columns: propColumns,
  data,
  disableSortBy,
  onPaginationChange,
  onSortingChange,
  manualPagination,
  onRenderedContentChange,
  hidePagination = false,
  pageCount: controlledPageCount,
  defaultPageSize = 10,
  paginationOptions,
  onRowClick,
  getHref,
  AnchorComponent,
  getCustomRowProps,
  getCustomCellProps,
  loading,
  noDataTitle = 'The table is empty',
  pageIndex: incomingPageIndex,
  initialState = { paginationOptions: { pageIndex: incomingPageIndex || 0, pageSize: defaultPageSize } },
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  searchValue,
  hideHeader,
  onPageChange,
  overlayLoading,
  onRowSelect,
  columnsOrdering = false,
  children,
  renderRowSubComponent,
  onCopy,
  canExpand,
  onStateChange,
}: TableProps<D>): ReactElement => {
  const getOncopy = useRefValue(onCopy)
  const getCanExpand = useRefValue(canExpand)
  const getRenderRowSubComponent = useRefValue(renderRowSubComponent)
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<HTMLDivElement | null>(null)
  const draggedColumnRef = useRef<number | null>(null)
  const previousIncomingPageIndex = usePrevious(incomingPageIndex)
  // Debounce our `fetchData` call for 200ms.
  // We can use non-null assertion here since we're checking existence of `fetchData` in the `useEffect` below
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  const commands = useMemo<KeyMap>(() => {
    const result: KeyMap = {}

    if (onCopy) {
      result.copy = ['ctrl+c', 'command+c']
    }

    return result
  }, [onCopy])
  const columns = useMemo<ColumnDef<D>[]>(() => {
    if (renderRowSubComponent || data.some((item) => 'subRows' in item)) {
      const expander: ColumnType<D> = {
        width: 60,
        disableResizing: true,
        id: ROW_EXPANDER_COLUMN_ID,
        Header: () => <span role="contentinfo" aria-label="row-expander-column-header" />,
        Cell: ({ row }) => {
          if (row.getCanExpand()) {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                tabIndex={0}
                role="button"
                data-test="row-expander"
                aria-expanded={row.getIsExpanded()}
                className={styles.expander}
                onClick={(e) => {
                  e.preventDefault()
                  row.getToggleExpandedHandler()()
                }}
              >
                <Icon icon={row.getIsExpanded() ? ChevronUp : ChevronDown} ariaLabel="row-expander" />
              </div>
            )
          }

          return <>{null}</>
        },
      }

      return [expander, ...propColumns].map(getColumnDef)
    }

    return propColumns.map(getColumnDef)
  }, [propColumns, data, renderRowSubComponent])

  const defaultColumn: Partial<ColumnDef<D>> = useMemo(
    () => ({
      cell: (props) => <EnhancedCellRenderer cell={props.cell} columnResizing={props.column.getIsResizing()} />,
      minSize: Number(styleConsts.tableColumnMinWidth), // minWidth is only used as a limit for resizing
      size: Number(styleConsts.tableColumnWidth), // width is used for both the flex-basis and flex-grow
      maxSize: Number(styleConsts.tableColumnMaxWidth), // maxWidth is only used as a limit for resizing
    }),
    [],
  )
  const tableInitialState = useMemo(() => getTableInitialState(initialState), [initialState])
  const tableInstance = useReactTable<D>({
    columns,
    data,
    enableSorting: !disableSortBy,
    enableMultiSort: false,
    // Pass our hoisted table state
    initialState: tableInitialState,
    // Tell the usePagination hook that we'll handle our own data fetching
    manualPagination: manualPagination,
    // This means we'll also have to provide our own pageCount
    pageCount: controlledPageCount,
    defaultColumn,
    columnResizeMode: 'onChange',
    paginateExpandedRows: false,
    getSubRows: useCallback((row: D) => row.subRows, []),
    getRowCanExpand: useCallback(
      (row: TableRow<D>) => {
        if (!getRenderRowSubComponent() && !row.subRows) {
          return false
        }

        const cb = getCanExpand()
        if (cb) {
          return cb(prepareRow(row))
        }

        return row.subRows?.length > 0
      },
      [getCanExpand, getRenderRowSubComponent],
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const {
    getVisibleFlatColumns,
    nextPage,
    setPageIndex: goToPage,
    getRowCount,
    getState,
    previousPage,
    setPageSize,
    setGlobalFilter,
    setColumnOrder,
    getPageCount,
    getCanNextPage,
    getCanPreviousPage,
    getFooterGroups,
  } = tableInstance
  useTrackTableState(tableInstance, onStateChange)
  const footerGroups = getFooterGroups()
  const page = tableInstance.getPaginationRowModel().rows
  const rowsPerPage = getRowCount()
  const pageCount = getPageCount()
  const {
    sorting: sortBy,
    columnSizing: columnResizing,
    rowSelection: selectedRowIds,
    pagination: { pageIndex, pageSize },
  } = getState()
  // drag and drop
  const onDragStart = useCallback((e: DragEvent) => {
    draggedColumnRef.current = Number(e.dataTransfer.getData('text/plain'))
  }, [])

  const onDrop = useCallback(
    (_, columnIndex: number) => {
      if (draggedColumnRef.current !== null && columnIndex !== draggedColumnRef.current) {
        const visibleColumns = getVisibleFlatColumns()
        const newColumns = [...visibleColumns]
        newColumns[columnIndex] = visibleColumns[draggedColumnRef.current]
        newColumns[draggedColumnRef.current] = visibleColumns[columnIndex]

        setColumnOrder(newColumns.map(({ id }) => id))
      }
    },
    [getVisibleFlatColumns, setColumnOrder],
  )

  const columnsSelectionProps = useColumnsSelection({
    rowsPerPage,
    columnsPerRow: columns.length,
  })
  const { onEndSelection, getSelectedColumns, selectedColumnValuesRef } = columnsSelectionProps

  const onPaginationChangeDebounced = useMemo(
    () => (onPaginationChange ? debounce(onPaginationChange, 200) : undefined),
    [onPaginationChange],
  )
  const onKeyUp = useCallback(() => {
    const callback = getOncopy()

    if (callback) {
      const { columns, range } = getSelectedColumns()

      if (columns.size || (range[0] !== undefined && range[0] !== undefined)) {
        callback(selectedColumnValuesRef?.current)
      }
    }
  }, [getOncopy, getSelectedColumns, selectedColumnValuesRef])
  const hotKeysHandlers = useMemo(
    () => ({
      copy: (e?: KeyboardEvent) => {
        e?.preventDefault()
        onKeyUp()
      },
    }),
    [onKeyUp],
  )

  useEffect(() => {
    return () => {
      document.body.removeEventListener('mouseup', onEndSelection)
      document.body.removeEventListener('contextmenu', onEndSelection)
      document.body.removeEventListener('keyup', onKeyUp)
    }
  }, [onKeyUp, onEndSelection])

  // Listen for changes in pagination and use the state to fetch new data. This is a recommended way to fetch new data: https://react-table.tanstack.com/docs/faq#how-can-i-use-the-table-state-to-fetch-new-data
  useEffect(() => {
    if (onPaginationChangeDebounced) {
      onPaginationChangeDebounced({ pageIndex, pageSize })
    }
  }, [onPaginationChangeDebounced, pageIndex, pageSize])

  useEffect(() => {
    if (onSortingChange) {
      onSortingChange(sortBy)
    }
  }, [sortBy, onSortingChange])

  // Debounce our `fetchData` call for 200ms.
  const onRenderedContentChangeDebounced = useMemo(
    () => (onRenderedContentChange ? debounce(onRenderedContentChange, 200) : undefined),
    [onRenderedContentChange],
  )
  // Listen for changes in pagination and use the state to fetch new data. This is a recommended way to fetch new data: https://react-table.tanstack.com/docs/faq#how-can-i-use-the-table-state-to-fetch-new-data
  useEffect(() => {
    if (onRenderedContentChangeDebounced) {
      onRenderedContentChangeDebounced(page.map(prepareRow))
    }
  }, [onRenderedContentChangeDebounced, page])

  // Apply global filter when searchValue changes
  useEffect(() => {
    if (searchValue !== undefined) {
      ;(setGlobalFilter as (value: string) => void)(searchValue)
    }
  }, [searchValue, setGlobalFilter])

  useEffect(() => {
    if (pageCount < pageIndex + 1) {
      goToPage(pageCount - 1)
    }
  }, [pageIndex, pageCount, goToPage])

  useEffect(() => {
    if (incomingPageIndex !== undefined && incomingPageIndex !== previousIncomingPageIndex) {
      goToPage(incomingPageIndex)
    }
  }, [goToPage, incomingPageIndex, previousIncomingPageIndex])

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(Object.keys(selectedRowIds))
    }
  }, [onRowSelect, selectedRowIds])

  const hasData = data.length > 0

  // If at least one of the columns has footer then we display the footer row
  const hasFooter = !loading && hasData && columns.some((col) => !!col.footer)

  // Header row has always aria-rowindex = 1.
  const headerIndex = 1
  // We're using this offset to display correct aria-rowindex when pagination is in action.
  const cellIndexOffset = pageSize * pageIndex + headerIndex
  // Total row count.

  const rowCount = data.length + headerIndex + (hasFooter ? 1 : 0)

  const content = (
    <>
      <div data-test={dataTest ?? 'table-wrapper'} className={className}>
        <div
          className={cn(styles.container, {
            [styles.spaceBottom]: !hidePagination,
          })}
        >
          <div data-test="table" role="table" aria-rowcount={rowCount}>
            {!hideHeader && (
              <div data-test="table-header-row-group" role="rowgroup" className={headerClassName}>
                {tableInstance.getHeaderGroups().map((headerGroup) => (
                  <HeaderRow
                    key={headerGroup.id}
                    role="row"
                    ariaRowIndex={headerIndex}
                    style={getRowStyle({ totalSize: tableInstance.getTotalSize() })}
                  >
                    {headerGroup.headers.map((header, i) => {
                      const canSort = header.column.getCanSort()
                      const isDraggable = columnsOrdering && header.id !== 'expander'

                      return (
                        <Header
                          index={i}
                          colSpan={1}
                          key={header.id}
                          role="columnheader"
                          onDragStart={onDragStart}
                          style={getCellStyle({ size: header.getSize(), minSize: header.column.columnDef.minSize || header.getSize() })}
                          canSort={canSort}
                          isSorted={!!header.column.getIsSorted()}
                          isSortedDesc={sortBy[header.column.getSortIndex()]?.desc}
                          canResize={header.column.getCanResize()}
                          onDrop={isDraggable ? onDrop : undefined}
                          resizeHandler={header.getResizeHandler()}
                          isResizing={header.column.getIsResizing()}
                          align={header.column.columnDef.meta?.align}
                          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        >
                          <EnhancedHeaderFooterRenderer type="header" context={header.getContext()} />
                        </Header>
                      )
                    })}
                  </HeaderRow>
                ))}
              </div>
            )}
            {!overlayLoading && loading ? (
              <Row role="row">
                <Cell role="cell" align="center" colSpan={columns.length} data-test="table-loader-cell">
                  <Loader />
                </Cell>
              </Row>
            ) : hasData ? (
              <HotKeys
                role="rowgroup"
                data-test="table-cell-row-group"
                keyMap={commands}
                handlers={hotKeysHandlers}
                className={styles.hotKeys}
              >
                <TableContent
                  page={page}
                  onCopy={onCopy}
                  getHref={getHref}
                  totalSize={tableInstance.getTotalSize()}
                  rootRef={setContextMenuAnchorEl}
                  {...columnsSelectionProps}
                  onRowClick={onRowClick}
                  className={contentClassName}
                  columnResizing={columnResizing}
                  AnchorComponent={AnchorComponent}
                  cellIndexOffset={cellIndexOffset}
                  getCustomRowProps={getCustomRowProps}
                  getCustomCellProps={getCustomCellProps}
                  renderRowSubComponent={renderRowSubComponent}
                />
              </HotKeys>
            ) : (
              <div role="row">
                <div role="cell">
                  <EmptyState
                    data-test="table-no-data"
                    className={styles.empty}
                    title={noDataTitle}
                    icon={AlertTriangle}
                    iconLabel="Alert"
                  />
                </div>
              </div>
            )}
            {hasFooter && (
              <div data-test="table-footer-row-group" role="rowgroup" className={footerClassName}>
                {footerGroups.map((group) => {
                  const { id: footerGroupKey } = group
                  return (
                    // Footer props getters do not provide role attributes
                    <Row
                      key={footerGroupKey}
                      ariaRowIndex={rowCount}
                      style={getRowStyle({ totalSize: tableInstance.getTotalSize() })}
                      role="row"
                    >
                      {group.headers.map((column) => {
                        const {
                          id: footerKey,
                          column: { columnDef },
                        } = column

                        return (
                          // Footer props getters do not provide role attributes
                          <Cell
                            key={footerKey}
                            colSpan={1}
                            align={columnDef.meta?.align}
                            style={getCellStyle({ size: column.getSize(), maxSize: columnDef.maxSize, minSize: columnDef.minSize })}
                            role="cell"
                          >
                            <EnhancedHeaderFooterRenderer context={column.getContext()} type="footer" />
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
        {!hidePagination && hasData && (
          <Pagination
            pageCount={pageCount}
            currentPage={pageIndex + 1}
            canPreviousPage={getCanPreviousPage()}
            canNextPage={getCanNextPage()}
            goToPage={(p) => {
              if (onPageChange) {
                onPageChange(p - 1)
              } else {
                goToPage(p - 1)
              }
            }}
            nextPage={() => {
              if (onPageChange) {
                onPageChange(pageIndex + 1)
              } else {
                nextPage()
              }
            }}
            previousPage={() => {
              if (onPageChange) {
                onPageChange(pageIndex - 1)
              } else {
                previousPage()
              }
            }}
            pageSize={pageSize}
            setPageSize={setPageSize}
            numberOfItems={data.length}
            pageSizeOptions={paginationOptions?.pageSizeOptions ?? [5, 10, 20]}
          />
        )}
      </div>
      {onCopy && <ContextMenu anchorElement={contextMenuAnchorEl} onCopy={onKeyUp} />}
    </>
  )

  if (children) {
    return children(content)
  }

  return content
}
