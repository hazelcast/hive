import React, { FC } from 'react'
import { AlertTriangle } from 'react-feather'
import { useUID } from 'react-uid'
import cn from 'classnames'

import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

import styles from './Cell.module.scss'
import { TableCellProps } from 'react-table'

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
  warning?: string
  colSpan?: number
} & Omit<TableCellProps, 'key'>

export const Cell: FC<CellProps> = ({ align = 'left', warning, colSpan, children, style, className, role }) => (
  <div
    data-test="table-cell"
    className={cn(
      styles.td,
      {
        [styles.alignLeft]: align === 'left',
        [styles.alignRight]: align === 'right',
        [styles.alignCenter]: align === 'center',
      },
      className,
    )}
    aria-colspan={colSpan}
    style={style}
    role={role}
  >
    {warning && align === 'right' && <CellWarning warning={warning} align="right" />}
    {children}
    {warning && (align === 'left' || align === 'center') && <CellWarning warning={warning} align="left" />}
  </div>
)
