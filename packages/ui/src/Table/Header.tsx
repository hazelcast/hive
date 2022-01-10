import React, { FC, useMemo, useCallback, MouseEvent, KeyboardEvent, AriaAttributes, DragEvent, useRef } from 'react'
import { ChevronDown, ChevronUp, Menu } from 'react-feather'
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
  index: number
  onDragStart?: (e: DragEvent) => void
  onDrop?: (e: DragEvent, index: number) => void
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
  index,
  onDragStart,
  onDrop,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const isDragStarterRef = useRef(false)
  const counterRef = useRef(0)

  const draggable = !!onDrop && !!onDragStart
  let ariaSort: AriaAttributes['aria-sort']
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
        icon={!isSorted ? ChevronUp : isSortedDesc ? ChevronDown : ChevronUp}
        ariaLabel={!isSorted ? 'Not Sorted' : isSortedDesc ? 'Descending' : 'Ascending'}
        size="smallMedium"
      />
    ),
    [align, isSorted, isSortedDesc],
  )
  const DraggableIcon = <Icon className={cn(styles.dragIcon, { [styles.dragIconRight]: align === 'right' })} icon={Menu} size="small" />

  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (keyIsOneOf(event, 'Enter') && onClick) {
        onClick(event)
      }
    },
    [onClick],
  )

  const buttonRoleProps = {
    tabIndex: onClick ? 0 : undefined,
    role: onClick ? 'button' : undefined,
    onKeyPress: onClick ? onKeyPress : undefined,
    onClick,
  }

  return (
    <div
      ref={rootRef}
      data-test="table-header-container"
      className={cn(styles.container, className)}
      style={style}
      role={role}
      aria-colspan={colSpan}
      aria-sort={ariaSort}
    >
      <div
        draggable={draggable}
        data-test="table-header-content"
        className={cn(styles.th, {
          [styles.sortable]: canSort,
          [styles.alignLeft]: align === 'left',
          [styles.alignRight]: align === 'right',
          [styles.alignCenter]: align === 'center',
        })}
        onDragStart={
          draggable
            ? (e) => {
                e.dataTransfer.setData('text/plain', String(index))
                isDragStarterRef.current = true
                onDragStart && onDragStart(e)
              }
            : undefined
        }
        onDragEnd={() => {
          isDragStarterRef.current = false
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={
          draggable
            ? (e) => {
                e.preventDefault()
                if (!isDragStarterRef.current && rootRef.current && counterRef.current === 0) {
                  rootRef.current.classList.add(styles.dragOver)
                }
                counterRef.current++
              }
            : undefined
        }
        onDragLeave={
          draggable
            ? () => {
                counterRef.current--
                if (rootRef.current && counterRef.current === 0) {
                  rootRef.current.classList.remove(styles.dragOver)
                }
              }
            : undefined
        }
        onDrop={
          draggable
            ? (e) => {
                onDrop && onDrop(e, index)
                if (rootRef.current) {
                  rootRef.current.classList.remove(styles.dragOver)
                }
                isDragStarterRef.current = false
                counterRef.current = 0
              }
            : undefined
        }
        {...buttonRoleProps}
      >
        {draggable && align === 'right' && DraggableIcon}
        {canSort && align === 'right' && Chevron}
        {children}
        {canSort && (align === 'left' || align === 'center') && Chevron}
        {draggable && (align === 'left' || align === 'center') && DraggableIcon}
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
