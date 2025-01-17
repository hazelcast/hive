import React from 'react'
import { Cell as CellType, flexRender, HeaderContext } from '@tanstack/react-table'

import { TruncatedText } from '../TruncatedText'

import styles from './Cell.module.scss'

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
  context: HeaderContext<D, unknown>
  type: 'header' | 'footer'
}

export const EnhancedHeaderFooterRenderer = <D extends object>({ context, type }: EnhancedHeaderFooterRendererProps<D>) => {
  const value = context.column.columnDef[type]

  if (typeof value === 'string') {
    return <TruncatedText text={value} forceUpdateToken={context.column.getIsResizing()} />
  }

  return <>{flexRender(value, context)}</>
}

export type EnhancedCellRendererProps<D extends object> = {
  cell: CellType<D, unknown>
  columnResizing: boolean
}

export const EnhancedCellRenderer = <D extends object>({ cell, columnResizing }: EnhancedCellRendererProps<D>) => (
  <TruncatedText text={cell.renderValue() as string} forceUpdateToken={columnResizing} tooltipClassName={styles.truncated} />
)
