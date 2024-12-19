import { useEffect, useRef } from 'react'
import { Table } from '@tanstack/react-table'

import { useRefValue } from '../hooks'
import { ColumnId, SortingRule, TableState } from './types'

export const useTrackTableState = <D extends object>(tableInstance: Table<D>, onChange?: (state: TableState<D>) => void) => {
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
        sortBy: sorting as SortingRule<D>[],
        pageSize,
        columnOrder: columnOrder as ColumnId<D>[],
        columnResizing: {
          columnWidths: columnSizing as Record<ColumnId<D>, number>,
        },
        hiddenColumns: Object.entries(columnVisibility).reduce<ColumnId<D>[]>((res, [id, visible]) => {
          if (!visible) {
            return [...res, id as ColumnId<D>]
          }

          return res
        }, []),
      })
    } else {
      skippedInitialStateChangeRef.current = true
    }
  }, [sorting, pageSize, columnOrder, columnVisibility, columnSizing, getOnChange])
}
