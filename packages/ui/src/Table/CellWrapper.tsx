import React, { RefObject, useEffect } from 'react'
import { ColumnInterface, ColumnInterfaceBasedOnValue, Cell, UseResizeColumnsState } from 'react-table'

import { ROW_EXPANDER_COLUMN_ID } from './constants'
import { CellProps, Cell as TableCell } from './Cell'
import { EnhancedCellRenderer } from './EnhancedRenderers'

export type CellWrapperProps<D extends object> = CellProps & {
  cell: Cell<D>
  selectable?: boolean
  column?: ColumnInterface<D> & ColumnInterfaceBasedOnValue
  selectedColumnValuesRef?: RefObject<(string | undefined)[][]>
  columnResizing: UseResizeColumnsState<D>['columnResizing']
}

export const CellWrapper = <D extends object>(props: CellWrapperProps<D>) => {
  const {
    selectable,
    column,
    cell,
    columnResizing,
    selectedColumnValuesRef,
    onClickSelection,
    onMouseEnterSelection,
    selectionStartedRef,
    ...rest
  } = props

  const isSelectable = selectable && column?.id !== ROW_EXPANDER_COLUMN_ID

  useEffect(() => {
    if (rest.cellId) {
      const [rowIndex, cellIndex] = rest.cellId.split(':') as [string, string]

      if (selectedColumnValuesRef?.current) {
        if (rest.selected) {
          const row = selectedColumnValuesRef.current[Number(rowIndex)]
          if (row) {
            row[Number(cellIndex)] = typeof cell.value !== 'object' ? String(cell.value) : ''
          }
        } else {
          if (selectedColumnValuesRef.current[Number(rowIndex)] && selectedColumnValuesRef.current[Number(rowIndex)][Number(cellIndex)]) {
            selectedColumnValuesRef.current[Number(rowIndex)][Number(cellIndex)] = undefined
          }
        }
      }
    }
  }, [rest, cell, selectedColumnValuesRef])

  const content = column ? (
    <EnhancedCellRenderer cell={cell} hasCellRenderer={!!column.Cell} columnResizing={columnResizing} />
  ) : (
    cell.render('Cell')
  )

  return (
    <TableCell
      onClickSelection={isSelectable ? onClickSelection : undefined}
      selectionStartedRef={isSelectable ? selectionStartedRef : undefined}
      onMouseEnterSelection={isSelectable ? onMouseEnterSelection : undefined}
      {...rest}
    >
      {content}
    </TableCell>
  )
}
