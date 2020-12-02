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

type RowProps = RowClickProps & Omit<TableHeaderGroupProps, 'key'> & { ariaRowIndex?: number }

export const Row: FC<RowProps> = ({ children, isHeaderRow = false, onClick, className, style, role, ariaRowIndex }) => {
  if (isHeaderRow) {
    return (
      <div className={cn(styles.headerRow, className)} style={style} role={role}>
        {children}
      </div>
    )
  }

  return (
    <div
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
      onKeyPress={onClick}
    >
      {children}
    </div>
  )
}
