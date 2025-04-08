import React, { CSSProperties, RefObject, useEffect } from 'react'
import { Cell, flexRender } from '@tanstack/react-table'

import { ROW_EXPANDER_COLUMN_ID } from './constants'
import { CellProps, Cell as TableCell } from './Cell'
import { RowData } from './tableTypes'

export type CellWrapperProps<D extends RowData> = CellProps & {
  cell: Cell<D, unknown>
  selectable?: boolean
  style: CSSProperties
  selectedColumnValuesRef?: RefObject<(string | undefined)[][]>
}

export const CellWrapper = <D extends object>(props: CellWrapperProps<D>) => {
  const { selectable, cell, selectedColumnValuesRef, onClickSelection, onMouseEnterSelection, selectionStartedRef, ...rest } = props

  const isSelectable = selectable && cell.column?.id !== ROW_EXPANDER_COLUMN_ID

  useEffect(() => {
    if (rest.cellId) {
      const [rowIndex, cellIndex] = rest.cellId.split(':') as [string, string]

      if (selectedColumnValuesRef?.current) {
        if (rest.selected) {
          const row = selectedColumnValuesRef.current[Number(rowIndex)]
          if (row) {
            row[Number(cellIndex)] = typeof cell.getValue() !== 'object' ? String(cell.getValue()) : ''
          }
        } else {
          if (selectedColumnValuesRef.current[Number(rowIndex)] && selectedColumnValuesRef.current[Number(rowIndex)][Number(cellIndex)]) {
            selectedColumnValuesRef.current[Number(rowIndex)][Number(cellIndex)] = undefined
          }
        }
      }
    }
  }, [rest, cell, selectedColumnValuesRef])

  return (
    <TableCell
      onClickSelection={isSelectable ? onClickSelection : undefined}
      selectionStartedRef={isSelectable ? selectionStartedRef : undefined}
      onMouseEnterSelection={isSelectable ? onMouseEnterSelection : undefined}
      {...rest}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  )
}
