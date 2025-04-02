import { ColumnType, RowData } from './tableTypes'

export const getColumnId = <D extends RowData>({ id, accessor, Header }: ColumnType<D>) => {
  if (id) {
    return id
  }

  if (typeof accessor === 'string') {
    return accessor
  }

  return Header as string
}
