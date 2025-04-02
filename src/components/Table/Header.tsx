import React, { useMemo, useCallback, MouseEvent, KeyboardEvent, AriaAttributes, DragEvent, useRef, CSSProperties } from 'react'
import { ChevronDown, ChevronUp, Menu } from 'react-feather'
import cn from 'classnames'

import { Icon, IconType } from '../Icon'
import { keyIsOneOf } from '../../utils/keyboard'

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
  size?: number
  index: number
  style?: CSSProperties
  role: string
  className?: string
  children?: React.ReactNode
  resizeHandler: (e: unknown) => void
  onDragStart?: (e: DragEvent) => void
  onDrop?: (e: DragEvent, index: number) => void
}

export const Header = ({
  align = 'left',
  colSpan,
  children,
  canSort,
  isSorted,
  isSortedDesc,
  canResize,
  isResizing,
  onClick,
  style,
  className,
  role,
  index,
  size,
  onDragStart,
  onDrop,
  resizeHandler,
}: HeaderProps) => {
  const rootRef = useRef<HTMLTableHeaderCellElement>(null)
  const isDragStarterRef = useRef(false)
  const counterRef = useRef(0)

  const draggable = !!onDrop && !!onDragStart
  let ariaSort: AriaAttributes['aria-sort']
  let ariaLabel: AriaAttributes['aria-label'] = 'Not Sorted'
  let icon: IconType = ChevronUp

  if (isSorted) {
    ariaSort = isSortedDesc ? 'descending' : 'ascending'
    ariaLabel = isSortedDesc ? 'Descending' : 'Ascending'
    icon = isSortedDesc ? ChevronDown : ChevronUp
  }

  const Chevron = useMemo(
    () => (
      <Icon
        data-test="chevron"
        className={cn(styles.sortingIcon, {
          [styles.left]: align === 'left',
          [styles.right]: align === 'right',
          [styles.isSorted]: isSorted,
        })}
        icon={icon}
        ariaLabel={ariaLabel}
        size="smallMedium"
      />
    ),
    [align, ariaLabel, icon, isSorted],
  )
  const DraggableIcon = (
    <Icon
      icon={Menu}
      size="small"
      ariaLabel="draggable-indicator"
      className={cn(styles.dragIcon, { [styles.dragIconRight]: align === 'right' })}
    />
  )

  const onKeyDown = useCallback(
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
    onKeyDown: onClick ? onKeyDown : undefined,
    onClick,
  }

  return (
    <div
      ref={rootRef}
      data-test="table-header-container"
      className={cn(styles.container, className)}
      style={{
        ...style,
        ...(size != null ? { width: size } : {}),
      }}
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

                if (onDragStart) {
                  onDragStart(e)
                }
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
                if (onDrop) {
                  onDrop(e, index)
                }

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
      {canResize && (
        <div
          data-test="table-header-column-resizer-container"
          className={styles.resizer}
          onMouseDown={resizeHandler}
          onTouchStart={resizeHandler}
        >
          <div
            data-test="table-header-column-resizer"
            className={cn('resizer', styles.separator, {
              [styles.resizing]: isResizing,
            })}
          />
        </div>
      )}
    </div>
  )
}
