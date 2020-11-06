import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Row.module.scss'

type RowClickProps =
  | {
      isHeaderRow: false
      onClick?: () => void
    }
  | {
      isHeaderRow: true
      onClick?: never
    }

type RowProps = { inactive?: boolean } & RowClickProps

export const Row: FC<RowProps> = ({ children, inactive = false, isHeaderRow = false, onClick }) => {
  if (isHeaderRow) {
    return <tr className={styles.headerRow}>{children}</tr>
  }

  if (inactive) {
    return <tr className={styles.inactive}>{children}</tr>
  }

  return (
    <tr
      onClick={onClick}
      className={cn(styles.row, {
        [styles.clickable]: !!onClick,
      })}
    >
      {children}
    </tr>
  )
}
