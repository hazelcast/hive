import { useEffect, useRef } from 'react'
import { Table } from '@tanstack/react-table'

import { useRefValue } from '../hooks'
import { RowData, SortingRule, TableState } from './tableTypes'

export const useTrackTableState = <D extends RowData>(tableInstance: Table<D>, onChange?: ((state: TableState) => void) | null) => {
  const {
    columnOrder,
    columnVisibility,
    columnSizing,
    sorting,
    pagination: { pageSize },
  } = tableInstance.getState()
  const skippedInitialStateChangeRef = useRef(false)
  const getOnChange = useRefValue(onChange)

  useEffect(() => {
    const cb = getOnChange()
    if (cb && skippedInitialStateChangeRef.current) {
      cb({
        sortBy: sorting as SortingRule[],
        paginationOptions: { pageSize },
        columnOrder: columnOrder,
        columnResizing: {
          columnWidths: columnSizing,
        },
        hiddenColumns: Object.entries(columnVisibility).reduce<string[]>((res, [id, visible]) => {
          if (!visible) {
            return [...res, id]
          }

          return res
        }, []),
      })
    } else {
      skippedInitialStateChangeRef.current = true
    }
  }, [sorting, pageSize, columnOrder, columnVisibility, columnSizing, getOnChange])
}
