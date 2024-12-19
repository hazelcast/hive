import '@tanstack/react-table' //or vue, svelte, solid, qwik, etc.

export type HeaderProps<D extends object> = {
  rows: RowType<D>[]
}

export type CellProps<D extends object> = {
  column: Column
  row: RowType<D>
}

export type ColumnId<D extends object> = Extract<keyof D, string>

export type Column = {
  id: string
}
export type ColumnType<D extends object> = {
  width?: number
  minWidth?: number
  maxWidth?: number
  Footer?: string | ((props: HeaderProps<D>) => JSX.Element | string)
  accessor?: ColumnId<D> | ((data: D, index: number) => string | number | JSX.Element)
  Cell?: string | ((props: CellProps<D>) => JSX.Element)
  canHide?: boolean // true by default
  align?: 'left' | 'center' | 'right'
  disableResizing?: boolean
  sortType?: (r1: RowType<D>, r2: RowType<D>) => number
} & (
  | {
      id: string
      Header?: string | Extract<keyof D, string> | ((props: HeaderProps<D>) => JSX.Element | string)
    }
  | {
      id?: never
      Header: string
    }
)

export type RowType<D extends object> = {
  canExpand: boolean
  isExpanded: boolean
  getToggleExpandedHandler: () => () => void
  original: D
  subRows: RowType<D>[]
}

export type CellType<D extends object> = {
  row: RowType<D>
  column: ColumnType<D>
}

export type SortingRule<D extends object> = {
  id: ColumnId<D>
  desc?: boolean | undefined
}

export type InitialState = {
  paginationOptions?: { pageIndex?: number; pageSize?: number }
}

export type TableState<D extends object> = {
  hiddenColumns: ColumnId<D>[]
  columnOrder: ColumnId<D>[]
  pageSize: number
  columnResizing: {
    columnWidths: Record<ColumnId<D>, number>
  }
  sortBy: SortingRule<D>[]
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    align?: 'center' | 'left' | 'right'
  }
}
