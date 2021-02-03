import React, { FC, useCallback, KeyboardEvent } from 'react'
import cn from 'classnames'

import styles from './Row.module.scss'
import { TableHeaderGroupProps } from 'react-table'
import { keyIsOneOf } from '../utils/keyboard'

type RowBase = Omit<TableHeaderGroupProps, 'key'> & { ariaRowIndex?: number }
export type RowProps = RowBase & { onClick?: () => void }
export type LinkRowProps = RowBase & { href: string }
export type HeaderRowProps = RowBase

export const Row: FC<RowProps> = ({ children, className, style, role, ariaRowIndex, onClick }) => {
  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (keyIsOneOf(event, 'Enter') && onClick) {
        onClick()
      }
    },
    [onClick],
  )

  return (
    <div
      data-test="table-cell-row"
      className={cn(
        styles.row,
        {
          [styles.clickable]: !!onClick,
        },
        className,
      )}
      aria-rowindex={ariaRowIndex}
      role={role}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? onKeyPress : undefined}
      onClick={
        onClick
          ? () => {
              onClick()
            }
          : undefined
      }
    >
      <div style={style}>{children}</div>
    </div>
  )
}

export const LinkRow: FC<LinkRowProps> = ({ children, className, style, role, ariaRowIndex, href }) => (
  <div data-test="table-cell-row" className={cn(styles.linkRow, className)} role={role} aria-rowindex={ariaRowIndex}>
    <a className={styles.link} style={style} href={href}>
      {children}
    </a>
  </div>
)

export const HeaderRow: FC<HeaderRowProps> = ({ children, className, style, role, ariaRowIndex }) => (
  <div data-test="table-header-row" className={cn(styles.headerRow, className)} style={style} role={role} aria-rowindex={ariaRowIndex}>
    {children}
  </div>
)
