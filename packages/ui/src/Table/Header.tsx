import React, { FC, useMemo, useCallback, MouseEvent, KeyboardEvent } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { TableHeaderProps, TableResizerProps } from 'react-table'
import cn from 'classnames'

import { Icon } from '../Icon'
import { keyIsOneOf } from '../utils/keyboard'

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
  onClick?: (event: MouseEvent | KeyboardEvent) => void
  canResize: boolean
  isResizing: boolean
  getResizerProps: (props?: Partial<TableResizerProps>) => TableResizerProps
  isLastHeader: boolean
} & Omit<TableHeaderProps, 'key'>

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
  isLastHeader,
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

  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (keyIsOneOf(event, 'Enter') && onClick) {
        onClick(event)
      }
    },
    [onClick],
  )

  return (
    <div
      data-test="table-header-container"
      className={cn(styles.container, className)}
      style={style}
      role={role}
      aria-colspan={colSpan}
      aria-sort={ariaSort}
    >
      <div
        data-test="table-header-content"
        className={cn(styles.th, {
          [styles.sortable]: canSort,
          [styles.alignLeft]: align === 'left',
          [styles.alignRight]: align === 'right',
          [styles.alignCenter]: align === 'center',
        })}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        onKeyPress={onClick ? onKeyPress : undefined}
        onClick={onClick}
      >
        {canSort && align === 'right' && Chevron}
        {children}
        {canSort && (align === 'left' || align === 'center') && Chevron}
      </div>
      {canResize && !isLastHeader && (
        <div data-test="table-header-column-resizer-container" className={styles.resizer} {...getResizerProps()}>
          <div
            data-test="table-header-column-resizer"
            className={cn(styles.separator, {
              [styles.resizing]: isResizing,
            })}
          />
        </div>
      )}
    </div>
  )
}
