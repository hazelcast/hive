import { CSSProperties } from 'react'
import { ColumnDef, Row as TableRow, InitialTableState } from '@tanstack/react-table'

import { ColumnType, InitialState, RowType } from './types'

export const prepareRow = <D extends object>({
  getCanExpand,
  getIsExpanded,
  getToggleExpandedHandler,
  original,
  subRows,
}: TableRow<D>): RowType<D> => ({
  canExpand: getCanExpand(),
  isExpanded: getIsExpanded(),
  getToggleExpandedHandler,
  original,
  subRows: subRows.map(prepareRow),
})

export const getColumnDef = <D extends object>({
  id,
  width: size,
  minWidth: minSize,
  maxWidth: maxSize,
  Header,
  Footer,
  Cell,
  align,
  disableResizing,
  canHide: enableHiding,
  sortType: sortingFn,
  accessor,
}: ColumnType<D>): ColumnDef<D> => {
  const commonDef: Omit<ColumnDef<D>, 'accessorFn' | 'accessorKey'> = {
    id,
    header: typeof Header === 'function' ? (props) => Header({ rows: props.table.getRowModel().rows.map(prepareRow) }) : Header,
    footer: typeof Footer === 'function' ? (props) => Footer({ rows: props.table.getRowModel().rows.map(prepareRow) }) : Footer,
    enableHiding,
    sortDescFirst: false,
    enableSorting: true,
    meta: { align },
    enableResizing: !disableResizing,
  }

  if (size) {
    commonDef.size = size
  }

  if (minSize) {
    commonDef.minSize = minSize
  }

  if (maxSize) {
    commonDef.maxSize = maxSize
  }

  if (sortingFn) {
    commonDef.sortingFn = (rowA, rowB) => sortingFn(prepareRow(rowA), prepareRow(rowB))
  }

  if (Cell) {
    commonDef.cell = typeof Cell === 'function' ? (props) => Cell({ column: props.column, row: prepareRow(props.row) }) : Cell
  }

  if (accessor) {
    if (typeof accessor === 'function') {
      return {
        id: '',
        ...commonDef,
        accessorFn: accessor,
      }
    }

    return {
      ...commonDef,
      accessorKey: accessor,
    }
  }

  return commonDef as ColumnDef<D>
}

export const getTableInitialState = ({ paginationOptions: pagination }: InitialState): InitialTableState => ({ pagination })

export const getCellStyle = ({ size, minSize, maxSize }: { size: number; minSize?: number; maxSize?: number }): CSSProperties => {
  // fix unit tests console error "`NaN` is an invalid value"
  const width = isNaN(size) ? 0 : size
  const minWidth = minSize && isNaN(minSize) ? 0 : minSize
  const maxWidth = maxSize && isNaN(maxSize) ? 0 : maxSize

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
