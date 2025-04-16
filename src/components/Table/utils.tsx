import { CSSProperties } from 'react'
import { ColumnDef, Row as TableRow, InitialTableState, HeaderContext, Cell, Column as TableColumn } from '@tanstack/react-table'

import { CellType, ColumnType, HeaderProps, InitialState, RowData, RowType, Column } from './tableTypes'

export const prepareRow = <D extends RowData>({
  getCanExpand,
  getIsExpanded,
  getToggleExpandedHandler,
  original,
  subRows,
  id,
  index,
  getValue,
}: TableRow<D>): RowType<D> => ({
  id,
  getCanExpand,
  getIsExpanded,
  getToggleExpandedHandler,
  original,
  index,
  getValue,
  subRows: subRows.map(prepareRow),
})

export const prepareColumn = <D extends RowData>({ id, columns, getIndex, getCanHide, getIsVisible }: TableColumn<D>): Column<D> => ({
  id,
  index: getIndex(),
  canHide: getCanHide(),
  hidden: !getIsVisible(),
  columns: columns.map(prepareColumn),
})

export const prepareCell = <D extends RowData, V = unknown>({ getValue, row, column }: Cell<D, V>): CellType<D, V> => ({
  column: prepareColumn(column),
  value: getValue(),
  row: prepareRow(row),
})

const getRendererProps = <D extends RowData>(props: HeaderContext<D, unknown>) => {
  const rendererProps: HeaderProps<D> = {
    rows: [],
    data: [],
  }

  props.table.getRowModel().rows.forEach((row) => {
    const item = prepareRow(row)

    rendererProps.rows.push(item)
    rendererProps.data.push(item.original)
  })

  return rendererProps
}

export const getColumnDef = <D extends RowData>({
  id,
  width: size,
  minWidth: minSize,
  maxWidth: maxSize,
  Header,
  Footer,
  Cell,
  align,
  filterable,
  disableSortBy,
  disableResizing,
  canHide: enableHiding,
  sortType: sortingFn,
  accessor,
}: ColumnType<D>): ColumnDef<D> => {
  const commonDef: Omit<ColumnDef<D>, 'accessorFn' | 'accessorKey'> = {
    id,
    header: typeof Header === 'function' ? (props) => Header(getRendererProps(props)) : Header,
    footer: typeof Footer === 'function' ? (props) => Footer(getRendererProps(props)) : Footer,
    enableHiding,
    sortDescFirst: false,
    enableSorting: true,
    meta: { align },
    enableResizing: !disableResizing,
  }

  if (size != undefined) {
    commonDef.size = size
  }

  if (minSize != undefined) {
    commonDef.minSize = minSize
  }

  if (maxSize !== undefined) {
    commonDef.maxSize = maxSize
  }

  if (sortingFn != undefined) {
    commonDef.sortingFn = (rowA, rowB) => sortingFn(prepareRow(rowA), prepareRow(rowB))
  }

  if (Cell != undefined) {
    commonDef.cell =
      typeof Cell === 'function'
        ? (props) => Cell({ column: prepareColumn(props.column), row: prepareRow(props.row), value: props.getValue() })
        : Cell
  }

  if (filterable !== undefined) {
    commonDef.enableColumnFilter = filterable
  }

  if (disableSortBy !== undefined) {
    commonDef.enableSorting = !disableSortBy
  }

  if (accessor != undefined) {
    if (typeof accessor === 'function') {
      return {
        id: '',
        ...commonDef,
        accessorFn: (value) => accessor(value),
      }
    }

    return {
      ...commonDef,
      accessorKey: accessor,
    }
  }

  return commonDef as ColumnDef<D>
}

const getColumnVisibility = (hiddenColumns?: string[]) => {
  const result: Record<string, boolean> = {}

  hiddenColumns?.forEach((column) => {
    result[column] = false
  })

  return result
}

export const getTableInitialState = ({
  hiddenColumns,
  columnOrder,
  sortBy,
  columnResizing,
  paginationOptions: pagination,
}: InitialState): InitialTableState => ({
  pagination,
  columnOrder,
  columnSizing: columnResizing?.columnWidths ?? {},
  columnVisibility: getColumnVisibility(hiddenColumns),
  sorting: sortBy?.map(({ id, desc }) => ({ id, desc: !!desc })) ?? [],
})

export const getCellStyle = ({
  size: width,
  minSize: minWidth,
  maxSize: maxWidth,
}: {
  size: number
  minSize?: number
  maxSize?: number
}): CSSProperties => {
  const style: CSSProperties = {
    width,
    minWidth: minWidth || width,
    flex: `${width} 0 auto`,
    boxSizing: 'border-box',
  }

  if (maxWidth) {
    style.maxWidth = maxWidth
  }

  return style
}

export const getRowStyle = ({ totalSize }: { totalSize: number }): CSSProperties => {
  // fix unit tests console error "`NaN` is an invalid value"
  const minWidth = isNaN(totalSize) ? 0 : totalSize

  return {
    minWidth,
  }
}
