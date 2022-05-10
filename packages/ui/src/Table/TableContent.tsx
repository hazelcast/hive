import cn from 'classnames'
import React, { AnchorHTMLAttributes, FC, MutableRefObject, ReactNode, useRef } from 'react'
import { Cell as CellType, ColumnInterfaceBasedOnValue, Row as RowType, Column, UseResizeColumnsState } from 'react-table'

import { Loader } from '../Loader'
import { CellProps } from './Cell'
import { CellWrapper } from './CellWrapper'
import { LinkRow, Row, RowProps } from './Row'
import { isCellSelected, useColumnsSelection } from './features/columnsSelection'

import styles from './Table.module.scss'
import { useOnClickOutside } from '../hooks'

export type TableContentProps<D extends object> = {
  loading?: boolean
  page: RowType<D>[]
  className?: string
  cellIndexOffset: number
  overlayLoading?: boolean
  onEndSelection: () => void
  columns: readonly Column<D>[]
  onKeyUp: (e: KeyboardEvent) => void
  onCopy?: (value: string[][]) => void
  prepareRow: (row: RowType<D>) => void
  onRowClick?: (row: RowType<D>) => void
  selectionStartedRef: MutableRefObject<boolean>
  getHref?: (row: RowType<D>) => string | undefined
  getCustomRowProps?: (row: RowType<D>) => RowProps
  renderRowSubComponent?: (props: RowType<D>) => ReactNode
  getCustomCellProps?: (cellInfo: CellType<D>) => CellProps
  columnResizing: UseResizeColumnsState<D>['columnResizing']
  AnchorComponent?: FC<AnchorHTMLAttributes<HTMLAnchorElement>>
} & ReturnType<typeof useColumnsSelection>

export const TableContent = <D extends object>(props: TableContentProps<D>) => {
  const {
    page,
    onCopy,
    columns,
    onKeyUp,
    getHref,
    loading,
    className,
    prepareRow,
    onRowClick,
    columnResizing,
    overlayLoading,
    onEndSelection,
    AnchorComponent,
    cellIndexOffset,
    selectedColumns,
    onClickSelection,
    getCustomRowProps,
    getCustomCellProps,
    selectionStartedRef,
    renderRowSubComponent,
    onMouseEnterSelection,
    selectedColumnValuesRef,
  } = props
  const rootRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(!!onCopy, {
    target: rootRef.current,
    handler: () => {
      document.body.removeEventListener('keyup', onKeyUp)
    },
  })

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={rootRef}
      role="rowgroup"
      data-test="table-cell-row-group"
      className={cn(styles.content, className)}
      onMouseDown={() => {
        selectionStartedRef.current = true
        document.body.addEventListener('mouseup', onEndSelection)
        document.body.addEventListener('contextmenu', onEndSelection)
        document.body.addEventListener('keyup', onKeyUp)
      }}
    >
      {page.map((row, rowIndex) => {
        prepareRow(row)
        const { key: rowKey, ...restRowProps } = row.getRowProps(getCustomRowProps?.(row))
        const cells = row.cells.map((cell, i) => {
          const { key: cellKey, ...restCellProps } = cell.getCellProps(getCustomCellProps?.(cell))
          // We don't want to use cell.column.Cell as that is a ColumnInstance which already has a cell renderer
          const column = columns[i] as ColumnInterfaceBasedOnValue<D>
          const cellId = `${rowIndex}:${i}`
          const selected = isCellSelected(cellId, selectedColumns)

          return (
            <CellWrapper
              cell={cell}
              key={cellKey}
              cellId={cellId}
              column={column}
              selected={selected}
              selectable={!!onCopy}
              align={cell.column.align}
              columnResizing={columnResizing}
              onClickSelection={onClickSelection}
              selectionStartedRef={selectionStartedRef}
              onMouseEnterSelection={onMouseEnterSelection}
              selectedColumnValuesRef={selectedColumnValuesRef}
              {...restCellProps}
            />
          )
        })

        if (getHref) {
          const href = getHref(row)
          if (href) {
            return (
              <LinkRow
                key={rowKey}
                AnchorComponent={AnchorComponent}
                {...restRowProps}
                ariaRowIndex={row.index + 1 + cellIndexOffset}
                href={href}
              >
                {cells}
              </LinkRow>
            )
          }
        }

        return (
          <React.Fragment key={rowKey}>
            <Row
              {...restRowProps}
              ariaRowIndex={row.index + 1 + cellIndexOffset}
              onClick={
                onRowClick
                  ? () => {
                      onRowClick(row)
                    }
                  : undefined
              }
            >
              {cells}
            </Row>
            {row.isExpanded ? renderRowSubComponent && <div>{renderRowSubComponent(row)}</div> : null}
          </React.Fragment>
        )
      })}
      {overlayLoading && loading && (
        <div className={styles.overlayLoading}>
          <Loader />
        </div>
      )}
    </div>
  )
}
