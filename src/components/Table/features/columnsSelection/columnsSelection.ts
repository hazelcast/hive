import { useCallback, useRef, useState } from 'react'

import { useRefValue } from '../../../../hooks'
import { SelectedColumnsState } from './helpers'

export type ColumnsSelectionProps = {
  rowsPerPage: number
  columnsPerRow: number
}

const initialSelectedColumnsState: SelectedColumnsState = {
  columns: new Set(),
  range: [undefined, undefined],
}

export const useColumnsSelection = (props: ColumnsSelectionProps) => {
  const { columnsPerRow, rowsPerPage } = props

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(initialSelectedColumnsState)
  const selectionStartedRef = useRef(false)
  const selectedColumnValuesRef = useRef<(string | undefined)[][]>([])
  const getColumnsPerRow = useRefValue(columnsPerRow)
  const getRowsPerPage = useRefValue(rowsPerPage)
  const getSelectedColumns = useRefValue(selectedColumns)

  const clearSelectedColumnsValue = useCallback(() => {
    selectedColumnValuesRef.current = Array.from(Array(getRowsPerPage()), () => new Array<string>(getColumnsPerRow()))
  }, [selectedColumnValuesRef, getRowsPerPage, getColumnsPerRow])
  const onEndSelection = useCallback(() => {
    document.body.removeEventListener('mouseup', onEndSelection)
    document.body.removeEventListener('contextmenu', onEndSelection)
    selectionStartedRef.current = false
  }, [])
  const onClickSelection = useCallback(
    (id: string, modifiers: { ctrl: boolean; shift: boolean }) => {
      setSelectedColumns((currentValue) => {
        if (modifiers.ctrl) {
          return {
            ...currentValue,
            columns: new Set(currentValue.columns.add(id)),
          }
        }

        if (modifiers.shift && currentValue.columns.size === 1) {
          const firstItem = currentValue.columns.values().next()

          return {
            columns: new Set(),
            range: [firstItem.value as string, id],
          }
        }

        clearSelectedColumnsValue()
        return {
          range: [undefined, undefined],
          columns: new Set([id]),
        }
      })
    },
    [clearSelectedColumnsValue],
  )
  const onMouseEnterSelection = useCallback((id: string) => {
    setSelectedColumns((currentValue) => {
      if (currentValue.columns.size === 1 && currentValue.range[0] === undefined) {
        const firstItem = currentValue.columns.values().next()

        return {
          columns: new Set(),
          range: [firstItem.value as string, id],
        }
      }

      return {
        ...currentValue,
        range: [currentValue.range[0], id],
      }
    })
  }, [])

  return {
    onEndSelection,
    selectedColumns,
    onClickSelection,
    setSelectedColumns,
    getSelectedColumns,
    selectionStartedRef,
    onMouseEnterSelection,
    selectedColumnValuesRef,
  }
}
