import React, { FC } from 'react'
import { AlertTriangle } from 'react-feather'
import cn from 'classnames'

import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

import styles from './Cell.module.scss'

type CellWarningProps = {
  align: 'left' | 'right'
  warning: string
}

const CellWarning: FC<CellWarningProps> = ({ align, warning }) => (
  <Tooltip overlay={warning}>
    <Icon
      className={cn(styles.warningIcon, {
        [styles.left]: align === 'left',
        [styles.right]: align === 'right',
      })}
      icon={AlertTriangle}
      ariaLabel={warning}
      size="small"
    />
  </Tooltip>
)

export type CellProps = {
  /**
   * Number fields should be right aligned as that allows
   * you to compare them or add them up quickly in your head.
   */
  align?: 'left' | 'right' | 'center'
  warning?: string
  colSpan?: number
}

export const Cell: FC<CellProps> = ({
  align = 'left',
  warning,
  colSpan,
  children,
}) => (
  <td className={styles.cell} colSpan={colSpan}>
    <div
      className={cn(styles.content, {
        [styles.alignLeft]: align === 'left',
        [styles.alignRight]: align === 'right',
        [styles.alignCenter]: align === 'center',
      })}
    >
      {warning && align === 'right' && (
        <CellWarning warning={warning} align="right" />
      )}
      {children}
      {warning && (align === 'left' || align === 'center') && (
        <CellWarning warning={warning} align="left" />
      )}
    </div>
  </td>
)
