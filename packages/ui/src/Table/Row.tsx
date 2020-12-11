import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Row.module.scss'
import { TableHeaderGroupProps } from 'react-table'

type RowClickProps =
  | {
      isHeaderRow: false
      onClick?: () => void
    }
  | {
      isHeaderRow: true
      onClick?: never
    }

export type RowProps = RowClickProps & Omit<TableHeaderGroupProps, 'key'> & { ariaRowIndex?: number }

export const Row: FC<RowProps> = ({ children, isHeaderRow = false, onClick, className, style, role, ariaRowIndex }) => {
  if (isHeaderRow) {
    return (
      <div data-test="table-header-row" className={cn(styles.headerRow, className)} style={style} role={role} aria-rowindex={ariaRowIndex}>
        {children}
      </div>
    )
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      data-test="table-cell-row"
      className={cn(
        styles.row,
        {
          [styles.clickable]: !!onClick,
        },
        className,
      )}
      style={style}
      role={role}
      aria-rowindex={ariaRowIndex}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
