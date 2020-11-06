import React, { FC, useMemo } from 'react'
import cn from 'classnames'

import { Icon } from '../Icon'
import styles from './Header.module.scss'
import { ChevronDown, ChevronUp } from 'react-feather'
import { TableHeaderProps } from 'react-table'

type HeaderChevronProps = {
  align: 'left' | 'right'
  ariaLabel: string
  icon: typeof ChevronDown | typeof ChevronUp
}

const ChevronIcon: FC<HeaderChevronProps> = ({ align, ariaLabel, icon }) => (
  <Icon
    className={cn(styles.sortingIcon, {
      [styles.left]: align === 'left',
      [styles.right]: align === 'right',
    })}
    icon={icon}
    ariaLabel={ariaLabel}
    size="small"
  />
)

export type HeaderProps = {
  /**
   * Number fields should be right aligned as that allows
   * you to compare them or add them up quickly in your head.
   */
  align?: 'left' | 'right' | 'center'
  canSort: boolean
  isSorted: boolean
  isSortedDesc?: boolean
  onClick?: () => void
  colSpan?: number
}

export const Header: FC<HeaderProps & TableHeaderProps> = ({
  align = 'left',
  children,
  canSort,
  isSorted,
  isSortedDesc,
  onClick,
  className,
  colSpan,
  role,
}) => {
  let ariaSort: React.AriaAttributes['aria-sort']
  if (isSorted) {
    ariaSort = isSortedDesc ? 'descending' : 'ascending'
  }

  const Chevron = useMemo(
    () => (
      <ChevronIcon
        align="right"
        ariaLabel={!isSorted ? 'Not Sorted' : isSortedDesc ? 'Descending' : 'Ascending'}
        icon={!isSorted || isSortedDesc ? ChevronDown : ChevronUp}
      />
    ),
    [isSorted, isSortedDesc],
  )

  return (
    <th
      className={cn(className, styles.header, {
        [styles.sortable]: canSort,
      })}
      role={role}
      colSpan={colSpan}
      scope="col"
      aria-sort={ariaSort}
      onClick={onClick}
    >
      <div
        className={cn(styles.content, {
          [styles.alignLeft]: align === 'left',
          [styles.alignRight]: align === 'right',
          [styles.alignCenter]: align === 'center',
        })}
      >
        {canSort && align === 'right' && Chevron}
        {children}
        {canSort && (align === 'left' || align === 'center') && Chevron}
      </div>
    </th>
  )
}
