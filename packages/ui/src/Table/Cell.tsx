import React, { FC } from 'react'
import { AlertTriangle } from 'react-feather'
import { useUID } from 'react-uid'
import cn from 'classnames'

import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

import styles from './Cell.module.scss'
import { TableCellProps } from 'react-table'

type CellWarningProps = {
  align: 'left' | 'right'
  warning: string
}

const CellWarning: FC<CellWarningProps> = ({ align, warning }) => {
  const id = useUID()

  return (
    <Tooltip id={id} content={warning}>
      {(ref) => (
        <div
          ref={ref}
          className={cn(styles.warningIcon, {
            [styles.left]: align === 'left',
            [styles.right]: align === 'right',
          })}
        >
          <Icon icon={AlertTriangle} ariaLabel={warning} size="small" aria-labelledby={id} />
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
} & TableCellProps

export const Cell: FC<CellProps> = ({ align = 'left', warning, colSpan, children, style, className, role }) => (
  <div
    className={cn(
      styles.td,
      {
        [styles.alignLeft]: align === 'left',
        [styles.alignRight]: align === 'right',
        [styles.alignCenter]: align === 'center',
      },
      className,
    )}
    style={style}
    role={role}
    aria-colspan={colSpan}
  >
    {warning && align === 'right' && <CellWarning warning={warning} align="right" />}
    {children}
    {warning && (align === 'left' || align === 'center') && <CellWarning warning={warning} align="left" />}
  </div>
)
