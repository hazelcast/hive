import { ReactNode } from 'react'

export type RowData = object

export type HeaderProps<D extends RowData> = {
  rows: RowType<D>[]
  data: D[]
}

export type AccessorFn<TItem> = (item: TItem) => ReactNode | number | string | string[]

export type Renderable<TProps> = (props: TProps) => ReactNode | JSX.Element | string

export type Column<D extends RowData> = {
  id: string
  index: number
  hidden: boolean
  canHide: boolean
  columns: Column<D>[]
}

export type ColumnCoreType<D extends RowData = object, V = any> = {
  width?: number
  minWidth?: number
  maxWidth?: number
  Footer?: string | Renderable<HeaderProps<D>>
  notAvailable?: boolean
  Cell?: Renderable<CellType<D, V>>
  canHide?: boolean // true by default{
  align?: 'left' | 'center' | 'right'
  disableResizing?: boolean
  disableSortBy?: boolean
  filterable?: boolean
  sortType?: (r1: RowType<D>, r2: RowType<D>) => number
}
export type ColumnIdentifier<D extends RowData> =
  | {
      id: string
      accessor?: keyof D | AccessorFn<D>
      Header?: string | Renderable<HeaderProps<D>>
    }
  | {
      id?: never
      Header: string
      accessor?: keyof D | AccessorFn<D>
    }
  | {
      id?: never
      Header?: never
      accessor: keyof D
    }

export type ColumnType<D extends RowData = object, V = any> = ColumnCoreType<D, V> & ColumnIdentifier<D>

export type RowType<D extends RowData, K = any> = {
  id: string
  getCanExpand: () => boolean
  getIsExpanded: () => boolean
  getToggleExpandedHandler: () => () => void
  original: D
  subRows: RowType<D, K>[]
  index: number
}

export type CellType<D extends RowData, V = any> = {
  row: RowType<D, V>
  column: Column<D>
  value: V
}

export type SortingRule = {
  id: string
  desc?: boolean | undefined
}

export type InitialState = Partial<TableState>

export type TableState = {
  hiddenColumns: string[]
  columnOrder: string[]
  columnResizing: {
    columnWidths: Record<string, number>
  }
  sortBy: SortingRule[]
  paginationOptions?: { pageIndex?: number; pageSize?: number }
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    align?: 'center' | 'left' | 'right'
  }
}
