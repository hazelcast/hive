import React, { useMemo, useState } from 'react'

import { ColumnType } from '../Table/Table'
import { CheckableSelectField } from '../Select'
import { CheckableSelectProps } from '../Select/CheckableSelectField'
import { SelectFieldOption } from '../Select/helpers'

export function useTableCustomizableColumns<T>(
  columns: T,
  opts?: {
    'data-test'?: string
    size: CheckableSelectProps<T>['size']
  },
) {
  const untypedColumns = (columns as unknown) as ColumnType<object>[]
  const { size = 'medium', 'data-test': dataTest = 'table-custom-columns' } = opts || {}
  // Header is used as a label
  const toggleableColumns = useMemo(() => untypedColumns.filter(({ Header }) => !!Header), [untypedColumns])
  const options = useMemo<SelectFieldOption<string>[]>(
    () =>
      toggleableColumns.map(({ Header }) => ({
        value: String(Header),
        label: String(Header),
      })),
    [toggleableColumns],
  )
  const [value, setValue] = useState<string[]>(toggleableColumns.map(({ Header }) => String(Header)))
  const valueSet = useMemo(() => new Set(value), [value])
  const toggleableColumnsSet = useMemo(() => new Set(toggleableColumns.map(({ Header }) => String(Header))), [toggleableColumns])
  const tableColumns = useMemo(() => {
    return untypedColumns.filter(({ Header }) => (toggleableColumnsSet.has(String(Header)) ? valueSet.has(String(Header)) : true))
  }, [untypedColumns, valueSet, toggleableColumnsSet])

  return {
    tableColumns: (tableColumns as unknown) as T,
    control: (
      <CheckableSelectField<string>
        name="custom-columns"
        options={options}
        value={value}
        data-test={dataTest}
        label="Columns"
        onChange={setValue}
        size={size}
      />
    ),
  }
}
