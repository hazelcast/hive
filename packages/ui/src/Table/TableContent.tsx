import cn from 'classnames'
import { HotKeys, IgnoreKeys } from 'react-hotkeys'
import React, { AnchorHTMLAttributes, FC, LegacyRef, MutableRefObject, ReactNode, useCallback, MouseEvent } from 'react'
import { Row as TableRow, ColumnSizingState } from '@tanstack/react-table'

import { Loader } from '../Loader'
import { CellProps } from './Cell'
import { getCellStyle, getRowStyle, prepareRow } from './utils'
import { CellWrapper } from './CellWrapper'
import { CellType, RowType } from './types'
import { LinkRow, Row, RowProps } from './Row'
import { isCellSelected, useColumnsSelection } from './features/columnsSelection'

import styles from './TableContent.module.scss'

export type TableContentProps<D extends object> = {
  loading?: boolean
  page: TableRow<D>[]
  className?: string
  rootRef?: LegacyRef<HTMLDivElement>
  cellIndexOffset: number
  overlayLoading?: boolean
  onEndSelection: () => void
  onCopy?: (value: string[][]) => void
  onRowClick?: (row: RowType<D>) => void
  totalSize: number
  selectionStartedRef: MutableRefObject<boolean>
  getHref?: (row: RowType<D>) => string | undefined
  getCustomRowProps?: (row: RowType<D>) => RowProps
  getCustomCellProps?: (cellInfo: CellType<D>) => CellProps
  renderRowSubComponent?: (props: RowType<D>) => ReactNode
  columnResizing: ColumnSizingState
  AnchorComponent?: FC<AnchorHTMLAttributes<HTMLAnchorElement>>
} & ReturnType<typeof useColumnsSelection>

export const TableContent = <D extends object>(props: TableContentProps<D>) => {
  const {
    rootRef,
    page,
    onCopy,
    getHref,
    loading,
    className,
    totalSize,
    onRowClick,
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

  const handleOnContextMenu = useCallback((e: MouseEvent<HotKeys>) => {
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
        const { id: rowKey, ...restRowProps } = row
        const cells = row.getVisibleCells().map((cell, i) => {
          const { id: cellKey, ...restCellProps } = cell
          const cellId = `${rowIndex}:${i}`
          const selected = isCellSelected(cellId, selectedColumns)
          const { style: cellStyle = {}, ...customProps } = getCustomCellProps
            ? getCustomCellProps({
                column: cell.column,
                row: prepareRow(cell.row),
              })
            : {}

          return (
            <CellWrapper
              cell={cell}
              style={{
                ...cellStyle,
                ...getCellStyle({
                  size: restCellProps.column.getSize(),
                  minSize: restCellProps.column.columnDef.minSize || restCellProps.column.getSize(),
                }),
              }}
              role="cell"
              key={cellKey}
              cellId={cellId}
              selected={selected}
              selectable={!!onCopy}
              onClickSelection={onClickSelection}
              align={cell.column.columnDef.meta?.align}
              selectionStartedRef={selectionStartedRef}
              onMouseEnterSelection={onMouseEnterSelection}
              selectedColumnValuesRef={selectedColumnValuesRef}
              {...customProps}
            />
          )
        })

        const expandedRow =
          row.getIsExpanded() && renderRowSubComponent ? (
            <IgnoreKeys tabIndex={-1} className={styles.subRowWrapper} onContextMenu={handleOnContextMenu}>
              {renderRowSubComponent(prepareRow(row))}
            </IgnoreKeys>
          ) : null

        if (getHref) {
          const href = getHref(prepareRow(row))
          if (href) {
            return (
              <React.Fragment key={rowKey}>
                <LinkRow
                  role="row"
                  AnchorComponent={AnchorComponent}
                  {...restRowProps}
                  ariaRowIndex={row.index + 1 + cellIndexOffset}
                  href={href}
                >
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
              role="row"
              {...restRowProps}
              style={getRowStyle({ totalSize })}
              {...(getCustomRowProps ? getCustomRowProps(prepareRow(row)) : {})}
              ariaRowIndex={row.index + 1 + cellIndexOffset}
              onClick={
                onRowClick
                  ? () => {
                      onRowClick(prepareRow(row))
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
