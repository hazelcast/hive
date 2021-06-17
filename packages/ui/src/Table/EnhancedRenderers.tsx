import React, { ReactElement, ReactText } from 'react'
import { Cell as CellType, HeaderGroup, UseResizeColumnsState } from 'react-table'

import { TruncatedText } from '../TruncatedText'

/**
 * Few notes about text truncation:
 * We try to enhance Header, Footer and Cell with text truncation and a tooltip using TruncatedText.
 * This is only possible for string and number values.
 * If we use a component as a custom renderer, we can't pass its value to TruncatedText
 * because its prop `text` only accepts string or number.
 * The above also applies to simple functions returning string - react-table transforms them into react components.
 * Here's how react-table renderers are made: https://github.com/tannerlinsley/react-table/blob/6e2fe31ac028e543ce0f9d56168d5f922389fbbc/src/publicUtils.js#L199
 */

export type EnhancedHeaderFooterRendererProps<D extends object> = {
  column: HeaderGroup<D>
  columnResizing: UseResizeColumnsState<D>['columnResizing']
  type: 'Header' | 'Footer'
}

export const EnhancedHeaderFooterRenderer = <D extends object>({ column, columnResizing, type }: EnhancedHeaderFooterRendererProps<D>) => {
  const value = column[type]
  if (typeof value === 'string') {
    return <TruncatedText text={value} forceUpdateToken={columnResizing.isResizingColumn} />
  }

  return column.render(type) as ReactElement
}

export type EnhancedCellRendererProps<D extends object> = {
  cell: CellType<D, ReactText>
  hasCellRenderer: boolean
  columnResizing: UseResizeColumnsState<D>['columnResizing']
}

export const EnhancedCellRenderer = <D extends object>({ cell, hasCellRenderer, columnResizing }: EnhancedCellRendererProps<D>) => {
  if (hasCellRenderer) {
    return cell.render('Cell') as ReactElement
  }

  return <TruncatedText text={cell.value} forceUpdateToken={columnResizing.isResizingColumn} />
}
