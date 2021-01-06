import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Row.module.scss'
import { TableHeaderGroupProps } from 'react-table'

export type RowProps = Omit<TableHeaderGroupProps, 'key'> & { ariaRowIndex?: number; onClickOrHref?: string | (() => void) }

export const Row: FC<RowProps> = ({ children, className, style, role, ariaRowIndex, onClickOrHref }) => {
  if (typeof onClickOrHref === 'string') {
    return (
      <div data-test="table-cell-row" role={role} aria-rowindex={ariaRowIndex}>
        <a className={cn(styles.row, styles.clickable, styles.link, className)} style={style} href={onClickOrHref}>
          {children}
        </a>
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
          [styles.clickable]: !!onClickOrHref,
        },
        className,
      )}
      style={style}
      role={role}
      aria-rowindex={ariaRowIndex}
      onClick={onClickOrHref}
    >
      {children}
    </div>
  )
}

export type HeaderRowProps = Omit<TableHeaderGroupProps, 'key'> & { ariaRowIndex?: number }

export const HeaderRow: FC<HeaderRowProps> = ({ children, className, style, role, ariaRowIndex }) => (
  <div data-test="table-header-row" className={cn(styles.headerRow, className)} style={style} role={role} aria-rowindex={ariaRowIndex}>
    {children}
  </div>
)
