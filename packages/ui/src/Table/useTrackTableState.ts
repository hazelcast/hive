import { useEffect, useRef } from 'react'
import { Table } from '@tanstack/react-table'

import { useRefValue } from '../hooks'
import { TableState } from './types'

export const useTrackTableState = <D>(tableInstance: Table<D>, onChange?: (state: TableState) => void) => {
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
        sortBy: sorting,
        pageSize,
        columnOrder,
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
