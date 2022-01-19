import React, { useCallback, useMemo, useState } from 'react'
import { ColumnInstance, IdType } from 'react-table'

import { Column, selectionColumnId } from '../Table/Table'
import { CheckableSelectField } from '../Select'
import { SelectFieldOption } from '../Select/helpers'

export function useTableCustomizableColumns<T extends object>({
  columns,
  visibleColumns,
  setHiddenColumns,
  dataTest = 'table-custom-columns',
}: {
  dataTest?: string
  columns: Column<T>[]
  visibleColumns: ColumnInstance<T>[]
  setHiddenColumns: (columns: IdType<T>[]) => void
}) {
  // Header is used as a label
  const toggleableColumns = useMemo(
    () => columns.filter(({ Header, id, accessor, canHide = true }) => canHide && !!Header && (!!id || !!accessor)),
    [columns],
  )
  const options = useMemo<SelectFieldOption<string>[]>(
    () =>
      toggleableColumns.map(({ Header, id, accessor }) => ({
        value: String(id || accessor),
        label: String(Header),
      })),
    [toggleableColumns],
  )

  const onChange = useCallback(
    (value: string[]) => {
      const visibleColumns = new Set(value)

      setHiddenColumns(
        toggleableColumns
          .filter(({ id, accessor }) => !visibleColumns.has((id || accessor) as string))
          .map(({ id, accessor }) => (id || accessor) as string),
      )
      setValue(value)
    },
    [setHiddenColumns, toggleableColumns],
  )
  const [value, setValue] = useState<string[]>(visibleColumns.filter(({ id }) => id !== selectionColumnId).map(({ id }) => id))

  return (
    <CheckableSelectField<string>
      name="custom-columns"
      options={options}
      value={value}
      data-test={dataTest}
      label="Columns"
      onChange={onChange}
    />
  )
}
