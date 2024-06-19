import cn from 'classnames'
import { HotKeys, IgnoreKeys } from 'react-hotkeys'
import React, { AnchorHTMLAttributes, FC, LegacyRef, MutableRefObject, ReactNode, useCallback, MouseEvent } from 'react'
import { Cell as CellType, ColumnInterfaceBasedOnValue, Row as RowType, Column, UseResizeColumnsState } from 'react-table'

import { Loader } from '../Loader'
import { CellProps } from './Cell'
import { CellWrapper } from './CellWrapper'
import { LinkRow, Row, RowProps } from './Row'
import { isCellSelected, useColumnsSelection } from './features/columnsSelection'

import styles from './TableContent.module.scss'

export type TableContentProps<D extends object> = {
  loading?: boolean
  page: RowType<D>[]
  className?: string
  rootRef?: LegacyRef<HTMLDivElement>
  cellIndexOffset: number
  overlayLoading?: boolean
  onEndSelection: () => void
  columns: readonly Column<D>[]
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
    rootRef,
    page,
    onCopy,
    columns,
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

  const handleOnContesxtMenu = useCallback((e: MouseEvent<HotKeys>) => {
    // disable table custom context menu
    e.stopPropagation()
  }, [])

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/no-static-element-interactions
    <div
      ref={rootRef}
      data-test="table-content"
      className={cn(styles.content, className)}
      onMouseDown={() => {
        selectionStartedRef.current = true
        document.body.addEventListener('mouseup', onEndSelection)
        document.body.addEventListener('contextmenu', onEndSelection)
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

        const expandedRow =
          row.isExpanded && renderRowSubComponent ? (
            <IgnoreKeys tabIndex={-1} className={styles.subRowWrapper} onContextMenu={handleOnContesxtMenu}>
              {renderRowSubComponent(row)}
            </IgnoreKeys>
          ) : null

        if (getHref) {
          const href = getHref(row)
          if (href) {
            return (
              <React.Fragment key={rowKey}>
                <LinkRow AnchorComponent={AnchorComponent} {...restRowProps} ariaRowIndex={row.index + 1 + cellIndexOffset} href={href}>
                  {cells}
                </LinkRow>
                {expandedRow}
              </React.Fragment>
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
            {expandedRow}
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
