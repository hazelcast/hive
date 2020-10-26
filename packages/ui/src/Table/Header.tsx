import React, { FC } from 'react'
import cn from 'classnames'

import { Icon } from '../Icon'
import styles from './Header.module.scss'
import { ChevronDown, ChevronUp } from 'react-feather'

type HeaderChevronProps = {
  align: 'left' | 'right'
  ariaLabel: string
  icon: typeof ChevronDown | typeof ChevronUp
}

const HeaderChevron: FC<HeaderChevronProps> = ({
  align,
  ariaLabel,
  icon,
}) => (
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

type HeaderSortProps =
  | {
      canSort?: true
      isSorted: boolean
      isSortedDesc: boolean
    }
  | {
      canSort: false
      isSorted?: never
      isSortedDesc?: never
    }

export type HeaderProps = {
  /**
   * Number fields should be right aligned as that allows
   * you to compare them or add them up quickly in your head.
   */
  align?: 'left' | 'right' | 'center'
} & HeaderSortProps

export const Header: FC<HeaderProps> = ({
  children,
  canSort = false,
  isSorted,
  isSortedDesc,
  align = 'left',
}) => {
  let ariaSort: React.AriaAttributes['aria-sort']
  if (isSorted) {
    ariaSort = isSortedDesc ? 'descending' : 'ascending'
  }

  return (
    <th
      className={cn(styles.header, { [styles.sortable]: canSort })}
      scope="col"
      aria-sort={ariaSort}
    >
      <div
        className={cn(styles.content, {
          [styles.alignLeft]: align === 'left',
          [styles.alignRight]: align === 'right',
          [styles.alignCenter]: align === 'center',
        })}
      >
        {canSort && align === 'right' && (
          <HeaderChevron
            align="right"
            ariaLabel={isSortedDesc ? 'Descending' : 'Ascending'}
            icon={!isSorted || isSortedDesc ? ChevronDown : ChevronUp}
          />
        )}
        {children}
        {canSort && (align === 'left' || align === 'center') && (
          <HeaderChevron
            align="left"
            ariaLabel={isSortedDesc ? 'Descending' : 'Ascending'}
            icon={!isSorted || isSortedDesc ? ChevronDown : ChevronUp}
          />
        )}
      </div>
    </th>
  )
}
