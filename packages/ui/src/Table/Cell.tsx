import React, { FC, useRef } from 'react'
import { AlertTriangle } from 'react-feather'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

import styles from './Cell.module.scss'

type CellWarningProps = {
  align: 'left' | 'right'
  warning: string
}

const CellWarning: FC<CellWarningProps> = ({ align, warning }) => {
  const idRef = useRef(uuid())

  return (
    <Tooltip id={idRef.current} content={warning}>
      {(ref) => (
        <div
          ref={ref}
          className={cn(styles.warningIcon, {
            [styles.left]: align === 'left',
            [styles.right]: align === 'right',
          })}
        >
          <Icon icon={AlertTriangle} ariaLabel={warning} size="small" aria-labelledby={idRef.current} />
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
}

export const Cell: FC<CellProps> = ({ align = 'left', warning, colSpan, children }) => (
  <td className={styles.cell} colSpan={colSpan}>
    <div
      className={cn(styles.content, {
        [styles.alignLeft]: align === 'left',
        [styles.alignRight]: align === 'right',
        [styles.alignCenter]: align === 'center',
      })}
    >
      {warning && align === 'right' && <CellWarning warning={warning} align="right" />}
      {children}
      {warning && (align === 'left' || align === 'center') && <CellWarning warning={warning} align="left" />}
    </div>
  </td>
)
