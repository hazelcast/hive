import React, { FC, MouseEvent, RefObject, useEffect, useRef } from 'react'
import { AlertTriangle } from 'react-feather'
import { TableCellProps } from 'react-table'
import { useUID } from 'react-uid'
import cn from 'classnames'

import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'
import { useOpenCloseState } from '../hooks'
import { CellCopyablePopover } from './features/columnsSelection'

import styles from './Cell.module.scss'

export type CellWarningProps = {
  align: 'left' | 'right'
  warning: string
}

export const CellWarning: FC<CellWarningProps> = ({ align, warning }) => {
  const id = useUID()

  return (
    <Tooltip id={id} content={warning}>
      {(tooltipRef) => (
        <div
          data-test="cell-warning-content"
          ref={tooltipRef}
          className={cn(styles.warningIcon, {
            [styles.left]: align === 'left',
            [styles.right]: align === 'right',
          })}
        >
          <Icon icon={AlertTriangle} ariaLabelledBy={id} size="small" />
        </div>
      )}
    </Tooltip>
  )
}

export type CellProps = {
  /**
   * Number fields should be right aligned as that allows
   * you to compare them or add them up quickly in your head.
   */
  align?: 'left' | 'right' | 'center'
  selected?: boolean
  warning?: string
  colSpan?: number
  cellId?: string
  selectionStartedRef?: RefObject<boolean>
  onMouseEnterSelection?: (id: string) => void
  onClickSelection?: (id: string, modifiers: { ctrl: boolean; shift: boolean }) => void
} & Omit<TableCellProps, 'key'>

export const Cell: FC<CellProps> = ({
  align = 'left',
  warning,
  colSpan,
  children,
  style,
  className,
  role,
  cellId,
  onClickSelection,
  selected,
  onMouseEnterSelection,
  selectionStartedRef,
}) => {
  const rootRef = useRef(null)
  const { isOpen, open, close } = useOpenCloseState()
  const handleClick = (e: MouseEvent) => {
    if (onClickSelection && cellId) {
      if (e.button === 2 && selected) {
        return
      }
      onClickSelection(cellId, {
        shift: e.shiftKey,
        ctrl: e.ctrlKey || e.metaKey,
      })
    }
  }
  const handleMouseEnter = () => {
    if (cellId && onMouseEnterSelection && selectionStartedRef?.current) {
      onMouseEnterSelection(cellId)
    }
  }

  useEffect(() => {
    if (!selected) {
      close()
    }
  }, [close, selected])

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        ref={rootRef}
        data-test="table-cell"
        className={cn(
          styles.td,
          {
            [styles.alignLeft]: align === 'left',
            [styles.alignRight]: align === 'right',
            [styles.alignCenter]: align === 'center',
            [styles.selectable]: onClickSelection,
            [styles.selected]: selected,
          },
          className,
        )}
        aria-colspan={colSpan}
        style={style}
        role={role}
        onDoubleClick={selected ? open : undefined}
        onMouseEnter={onClickSelection ? handleMouseEnter : undefined}
        onMouseDown={onClickSelection ? handleClick : undefined}
      >
        {warning && align === 'right' && <CellWarning warning={warning} align="right" />}
        {children}
        {warning && (align === 'left' || align === 'center') && <CellWarning warning={warning} align="left" />}
      </div>
      {selected && (
        <CellCopyablePopover
          anchorElement={rootRef.current}
          isOpen={isOpen}
          onClose={close}
          contentClassName={cn(styles.td, {
            [styles.alignLeft]: align === 'left',
            [styles.alignRight]: align === 'right',
            [styles.alignCenter]: align === 'center',
          })}
        >
          {children}
        </CellCopyablePopover>
      )}
    </>
  )
}
