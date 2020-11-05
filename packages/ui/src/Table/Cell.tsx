import React, { FC } from 'react'
import cn from 'classnames'

import { Icon } from '../Icon'
import styles from './Cell.module.scss'
import { AlertTriangle } from 'react-feather'
import { Link } from '../Link'
import { Tooltip } from '../Tooltip'

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
  link?: string
  warning?: string
  colSpan?: number
}

export const Cell: FC<CellProps> = ({
  align = 'left',
  link,
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
      {link ? (
        <Link href={link} size="small">
          {children}
        </Link>
      ) : (
        children
      )}
      {warning && (align === 'left' || align === 'center') && (
        <CellWarning warning={warning} align="left" />
      )}
    </div>
  </td>
)
