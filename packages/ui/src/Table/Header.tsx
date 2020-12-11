import React, { FC, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { TableHeaderProps, TableResizerProps } from 'react-table'
import cn from 'classnames'

import { Icon } from '../Icon'

import styles from './Header.module.scss'

export type HeaderProps = {
  /**
   * Number fields should be right aligned as that allows
   * you to compare them or add them up quickly in your head.
   */
  align?: 'left' | 'right' | 'center'
  colSpan?: number
  canSort: boolean
  isSorted: boolean
  isSortedDesc?: boolean
  onClick?: () => void
  canResize: boolean
  isResizing: boolean
  getResizerProps: (props?: Partial<TableResizerProps>) => TableResizerProps
} & TableHeaderProps

export const Header: FC<HeaderProps> = ({
  align = 'left',
  colSpan,
  children,
  canSort,
  isSorted,
  isSortedDesc,
  canResize,
  isResizing,
  getResizerProps,
  onClick,
  style,
  className,
  role,
}) => {
  let ariaSort: React.AriaAttributes['aria-sort']
  if (isSorted) {
    ariaSort = isSortedDesc ? 'descending' : 'ascending'
  }

  const Chevron = useMemo(
    () => (
      <Icon
        className={cn(styles.sortingIcon, {
          [styles.left]: align === 'left',
          [styles.right]: align === 'right',
        })}
        icon={!isSorted || isSortedDesc ? ChevronDown : ChevronUp}
        ariaLabel={!isSorted ? 'Not Sorted' : isSortedDesc ? 'Descending' : 'Ascending'}
        size="small"
      />
    ),
    [align, isSorted, isSortedDesc],
  )

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      data-test="table-header"
      className={cn(
        styles.th,
        {
          [styles.sortable]: canSort,
          [styles.alignLeft]: align === 'left',
          [styles.alignRight]: align === 'right',
          [styles.alignCenter]: align === 'center',
        },
        className,
      )}
      style={style}
      role={role}
      aria-colspan={colSpan}
      aria-sort={ariaSort}
      onClick={onClick}
    >
      {canSort && align === 'right' && Chevron}
      {children}
      {canSort && (align === 'left' || align === 'center') && Chevron}
      {canResize && (
        <div
          data-test="table-header-column-resizer"
          {...getResizerProps()}
          className={cn(styles.resizer, {
            [styles.isResizing]: isResizing,
          })}
        />
      )}
    </div>
  )
}
