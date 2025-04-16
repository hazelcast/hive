export type SelectedColumnsState = { range: [string | undefined, string | undefined]; columns: Set<string> }

export const cellIdToNumbersArray = (cellId: string): [number, number] => {
  const values = cellId.split(':')

  return [Number(values[0]), Number(values[1])]
}

export const inRange = (cellId: string, range: [string | undefined, string | undefined]): boolean => {
  const start = range[0]
  const end = range[1]

  if (start) {
    if (end) {
      const cellValues = cellIdToNumbersArray(cellId)
      const startValues = cellIdToNumbersArray(start)
      const endValues = cellIdToNumbersArray(end)
      const minRowIndex = Math.min(startValues[0], endValues[0])
      const maxRowIndex = Math.max(startValues[0], endValues[0])
      const minCellIndex = Math.min(startValues[1], endValues[1])
      const maxCellIndex = Math.max(startValues[1], endValues[1])

      return cellValues[0] >= minRowIndex && cellValues[0] <= maxRowIndex && cellValues[1] >= minCellIndex && cellValues[1] <= maxCellIndex
    }

    return cellId === start
  }

  return false
}

export const isCellSelected = (cellId: string, selectedColumns: SelectedColumnsState): boolean => {
  return selectedColumns.columns.has(cellId) || inRange(cellId, selectedColumns.range)
}
