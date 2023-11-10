import { DataTestProp } from '@hazelcast/helpers'
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
  useTable,
  usePagination,
  TableOptions,
  useSortBy,
  Row as RowType,
  Cell as CellType,
  useAsyncDebounce,
  useResizeColumns,
  useFlexLayout,
  Column as ColumnType,
  useGlobalFilter,
  useColumnOrder,
  useExpanded,
  TableInstance,
} from 'react-table'
import { AlertTriangle, ChevronDown, ChevronUp } from 'react-feather'

import { Pagination, PaginationProps } from '../Pagination'
import { Cell, CellProps } from './Cell'
import { EnhancedHeaderFooterRenderer } from './EnhancedRenderers'
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

import styles from './Table.module.scss'
import styleConsts from '../../styles/constants/export.module.scss'

export type { Accessor, Cell, Renderer, Row, CellProps, HeaderGroup, TableInstance, TableState } from 'react-table'
export type Column<T extends object> = ColumnType<T> & {
  canHide?: boolean // true by default
}

// Why do we need it: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration
  export interface TableOptions<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
  > extends UsePaginationOptions<D & UseExpandedRowProps<D>>,
      UseSortByOptions<D>,
      UseFiltersOptions<D>,
      UseRowSelectOptions<D>,
      UseGroupByOptions<D>,
      UseExpandedOptions<D>,
      // UseGlobalFiltersOptions<D>,
      UseResizeColumnsOptions<D>,
      // UseRowStateOptions<D>,

      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<string, any> {}

  export interface Hooks<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
  > extends UseSortByHooks<D>,
      UseRowSelectHooks<D>,
      // UseExpandedHooks<D>,
      UseGroupByHooks<D> {}

  export interface TableInstance<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
  > extends UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      // UseColumnOrderInstanceProps<D>,
      // UseExpandedInstanceProps<D>,
      // UseGlobalFiltersInstanceProps<D>,
      // UseRowStateInstanceProps<D>,
      UseGroupByInstanceProps<D> {}

  export interface TableState<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
  > extends UsePaginationState<D>,
      UseSortByState<D>,
      UseFiltersState<D>,
      UseRowSelectState<D>,
      UseGroupByState<D>,
      // UseColumnOrderState<D>,
      // UseExpandedState<D>,
      // UseGlobalFiltersState<D>,
      // UseRowStateState<D>,
      UseResizeColumnsState<D> {}

  export interface ColumnInterface<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
  > extends UseSortByColumnOptions<D>,
      UseFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      // UseGlobalFiltersColumnOptions<D>,
      UseResizeColumnsColumnOptions<D> {
    Footer?: string | Renderer<TableInstance<D>>
    align?: 'left' | 'right' | 'center'
  }

  export interface ColumnInstance<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
  > extends UseSortByColumnProps<D>,
      UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D> {}

  export interface Cell<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    V = any,
  > extends UseGroupByCellProps<D>,
      UseRowStateCellProps<D> {}

  export interface Row<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
  > extends UseGroupByRowProps<D>,
      // UseExpandedRowProps<D>,
      // UseRowSelectRowProps<D>,
      UseRowSelectRowProps<D>,
      UseExpandedRowProps<D> {}
}

export type PaginationOptions = Partial<Pick<PaginationProps, 'pageSizeOptions'>>

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

type CustomTableRowClickProps<D extends object> =
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

type CustomTableProps<D extends object> = {
  loading?: boolean
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
  autoResetGlobalFilter?: boolean
  pageIndex?: number
  onPageChange?: (newPage: number) => void
  onRowSelect?: (ids: string[]) => void
  columnsOrdering?: boolean
  children?: (table: ReactElement, tableInstance: TableInstance<D>) => ReactElement
  renderRowSubComponent?: (props: RowType<D>) => ReactNode
  onCopy?: (data: (string | undefined)[][]) => void
} & CustomTableRowClickProps<D> &
  DataTestProp

export type TableProps<D extends object> = TableOptions<D> & ExtendedPaginationProps & ControlledPaginationProps & CustomTableProps<D>

export type { ColumnType, RowType, CellType }

const column = {
  // When using the useFlexLayout:
  minWidth: Number(styleConsts.tableColumnMinWidth), // minWidth is only used as a limit for resizing
  width: Number(styleConsts.tableColumnWidth), // width is used for both the flex-basis and flex-grow
  maxWidth: Number(styleConsts.tableColumnMaxWidth), // maxWidth is only used as a limit for resizing
}

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
export const Table = <D extends object>({
  'data-test': dataTest,
  autoResetSortBy = false,
  columns: propColumns,
  data,
  defaultColumn = column,
  disableSortBy,
  onPaginationChange,
  manualPagination,
  onRenderedContentChange,
  autoResetPage = false,
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
  initialState = { pageIndex: incomingPageIndex || 0, pageSize: defaultPageSize },
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  searchValue,
  hideHeader,
  autoResetGlobalFilter = false,
  onPageChange,
  overlayLoading,
  onRowSelect,
  columnsOrdering = false,
  autoResetResize = false,
  autoResetSelectedRows = false,
  children,
  renderRowSubComponent,
  autoResetExpanded = false,
  onCopy,
}: TableProps<D>): ReactElement => {
  const getOncopy = useRefValue(onCopy)
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
  const columns = useMemo<readonly Column<D>[]>(() => {
    if (renderRowSubComponent || data.some((item) => 'subRows' in item)) {
      return [
        {
          width: 60,
          disableResizing: true,
          id: ROW_EXPANDER_COLUMN_ID,
          Cell: ({ row }: { row: RowType<D> }) => {
            return row.canExpand || renderRowSubComponent ? (
              <div tabIndex={0} role="button" data-test="row-expander" className={styles.expander} {...row.getToggleRowExpandedProps()}>
                <Icon icon={row.isExpanded ? ChevronUp : ChevronDown} ariaLabel="row-expander" />
              </div>
            ) : null
          },
        },
        ...propColumns,
      ]
    }

    return propColumns
  }, [propColumns, data, renderRowSubComponent])

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const onPaginationChangeDebounced = useAsyncDebounce<(paginationChangeProps: PaginationChangeProps) => void>(onPaginationChange!, 200)

  const tableInstance = useTable<D>(
    {
      columns,
      data,
      disableSortBy,
      disableMultiSort: true,
      // https://react-table.tanstack.com/docs/faq#how-do-i-stop-my-table-state-from-automatically-resetting-when-my-data-changes
      autoResetSortBy,
      // Pass our hoisted table state
      initialState,
      // Tell the usePagination hook that we'll handle our own data fetching
      manualPagination: manualPagination,
      // This means we'll also have to provide our own pageCount
      pageCount: controlledPageCount,
      autoResetPage,
      defaultColumn,
      autoResetGlobalFilter,
      autoResetResize,
      autoResetSelectedRows,
      autoResetExpanded,
      paginateExpandedRows: false,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useFlexLayout,
    useResizeColumns,
    useColumnOrder,
  )

  const {
    getTableProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, columnResizing, selectedRowIds },
    setGlobalFilter,
    setColumnOrder,
  } = tableInstance

  // drag and drop
  const onDragStart = useCallback((e: DragEvent) => {
    draggedColumnRef.current = Number(e.dataTransfer.getData('text/plain'))
  }, [])

  const onDrop = useCallback(
    (e: DragEvent, columnIndex: number) => {
      if (draggedColumnRef.current !== null && columnIndex !== draggedColumnRef.current) {
        const newColumns = [...visibleColumns]
        newColumns[columnIndex] = visibleColumns[draggedColumnRef.current]
        newColumns[draggedColumnRef.current] = visibleColumns[columnIndex]

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setColumnOrder(newColumns.map(({ id, accessor }: Column<D>) => (id || accessor) as string))
      }
    },
    [visibleColumns, setColumnOrder],
  )

  const columnsSelectionProps = useColumnsSelection({
    rowsPerPage: page.length,
    columnsPerRow: columns.length,
  })
  const { onEndSelection, getSelectedColumns, selectedColumnValuesRef } = columnsSelectionProps

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
    if (onPaginationChange) {
      onPaginationChangeDebounced({ pageIndex, pageSize })
    }
  }, [onPaginationChange, onPaginationChangeDebounced, pageIndex, pageSize])

  // Debounce our `fetchData` call for 200ms.
  // We can use non-null assertion here since we're checking existence of `fetchData` in the `useEffect` below
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const onRenderedContentChangeDebounced = useAsyncDebounce<(newPage: RowType<D>[]) => void>(onRenderedContentChange!, 200)

  // Listen for changes in pagination and use the state to fetch new data. This is a recommended way to fetch new data: https://react-table.tanstack.com/docs/faq#how-can-i-use-the-table-state-to-fetch-new-data
  useEffect(() => {
    if (onRenderedContentChange) {
      onRenderedContentChangeDebounced(page)
    }
  }, [onRenderedContentChange, onRenderedContentChangeDebounced, page])

  // Apply global filter when searchValue changes
  useEffect(() => {
    if (searchValue !== undefined) {
      ;(setGlobalFilter as (value: string) => void)(searchValue)
    }
  }, [searchValue, setGlobalFilter])

  useEffect(() => {
    if (pageCount < pageIndex + 1) {
      gotoPage(pageCount - 1)
    }
  }, [pageIndex, pageCount, gotoPage])

  useEffect(() => {
    if (incomingPageIndex !== undefined && incomingPageIndex !== previousIncomingPageIndex) {
      gotoPage(incomingPageIndex)
    }
  }, [gotoPage, incomingPageIndex, previousIncomingPageIndex])

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(Object.keys(selectedRowIds))
    }
  }, [onRowSelect, selectedRowIds])

  const hasData = data.length > 0

  // If at least one of the columns has footer then we display the footer row
  const hasFooter = !loading && hasData && columns.some((col) => !!col.Footer)

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
          <div data-test="table" {...getTableProps()} aria-rowcount={rowCount}>
            {!hideHeader && (
              <div data-test="table-header-row-group" role="rowgroup" className={headerClassName}>
                {headerGroups.map((headerGroup) => {
                  const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()

                  return (
                    <HeaderRow key={headerGroupKey} {...restHeaderGroupProps} ariaRowIndex={headerIndex}>
                      {headerGroup.headers.map((column, i) => {
                        const { key: columnKey, ...restHeaderProps } = column.getHeaderProps(column.getSortByToggleProps())
                        const isDraggable = columnsOrdering && column.id !== 'expander'

                        return (
                          <Header
                            index={i}
                            key={columnKey}
                            align={column.align}
                            canSort={column.canSort}
                            isSorted={column.isSorted}
                            isSortedDesc={column.isSortedDesc}
                            canResize={column.canResize}
                            isResizing={column.isResizing}
                            getResizerProps={column.getResizerProps}
                            onDrop={isDraggable ? onDrop : undefined}
                            onDragStart={onDragStart}
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
            )}
            {!overlayLoading && loading ? (
              <Row role="row">
                <Cell role="cell" align="center" colSpan={columns.length} data-test="table-loader-cell">
                  <Loader />
                </Cell>
              </Row>
            ) : hasData ? (
              <HotKeys keyMap={commands} handlers={hotKeysHandlers} className={styles.hotKeys}>
                <TableContent
                  page={page}
                  onCopy={onCopy}
                  getHref={getHref}
                  columns={columns}
                  rootRef={setContextMenuAnchorEl}
                  {...columnsSelectionProps}
                  onRowClick={onRowClick}
                  prepareRow={prepareRow}
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
                  const { key: footerGroupKey, ...restFooterGroupProps } = group.getFooterGroupProps()
                  return (
                    // Footer props getters do not provide role attributes
                    <Row key={footerGroupKey} ariaRowIndex={rowCount} {...restFooterGroupProps} role="row">
                      {group.headers.map((column) => {
                        const { key: footerKey, ...restFooterProps } = column.getFooterProps()
                        return (
                          // Footer props getters do not provide role attributes
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

        {!hidePagination && hasData && (
          <Pagination
            pageCount={pageCount}
            currentPage={pageIndex + 1}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            goToPage={(p) => {
              if (onPageChange) {
                onPageChange(p - 1)
              } else {
                gotoPage(p - 1)
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
    return children(content, tableInstance)
  }

  return content
}
