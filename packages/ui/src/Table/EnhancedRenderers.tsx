import React, { useEffect, useState } from 'react'
import { Cell as CellType, HeaderGroup, UseResizeColumnsState } from 'react-table'

import { TruncatedText } from '../TruncatedText'

type EnhancedCellRendererProps<D extends object> = {
  cell: CellType<D, string | number>
  hasCellRenderer: boolean
  columnResizing: UseResizeColumnsState<D>['columnResizing']
}

export const EnhancedCellRenderer = <D extends object>({ cell, hasCellRenderer, columnResizing }: EnhancedCellRendererProps<D>) => {
  if (hasCellRenderer) {
    return cell.render('Cell') as JSX.Element
  }

  return <TruncatedTextRenderer id={cell.column.id} text={cell.value} columnResizing={columnResizing} />
}

type EnhancedHeaderRendererProps<D extends object> = {
  column: HeaderGroup<D>
  columnResizing: UseResizeColumnsState<D>['columnResizing']
}

export const EnhancedHeaderRenderer = <D extends object>({ column, columnResizing }: EnhancedHeaderRendererProps<D>) => {
  if (typeof column.Header === 'string') {
    return <TruncatedTextRenderer id={column.id} text={column.Header} columnResizing={columnResizing} />
  }

  return column.render('Header') as JSX.Element
}

type TruncatedTextRendererProps<D extends object> = {
  id: string
  text: string | number
  columnResizing: UseResizeColumnsState<D>['columnResizing']
}

const TruncatedTextRenderer = <D extends object>({ id, text, columnResizing }: TruncatedTextRendererProps<D>) => {
  const [width, setWidth] = useState<number | undefined>()
  useEffect(() => {
    const currentColumnResized = columnResizing.isResizingColumn === id
    if (currentColumnResized && !!columnResizing.columnWidths) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setWidth(columnResizing.columnWidths[id])
    }
  }, [columnResizing.columnWidths, columnResizing.isResizingColumn, id])

  return <TruncatedText text={text} forceUpdateToken={width} />
}
