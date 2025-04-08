import React, { FC, PropsWithChildren, useCallback, KeyboardEvent, AnchorHTMLAttributes, CSSProperties } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { keyIsOneOf } from '../../utils/keyboard'

import styles from './Row.module.scss'

type RowBase = { className?: string; style?: CSSProperties; role?: string; ariaRowIndex?: number }
export type RowProps = RowBase & { onClick?: () => void }
export type LinkRowProps = RowBase & { href: string; AnchorComponent?: FC<AnchorHTMLAttributes<HTMLAnchorElement>> }
export type HeaderRowProps = RowBase

export const Row = ({ children, className, style, role, ariaRowIndex, onClick }: PropsWithChildren<RowProps>) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (keyIsOneOf(event, 'Enter') && onClick) {
        onClick()
      }
    },
    [onClick],
  )

  return (
    <div
      data-test="table-cell-row"
      className={cn(
        styles.row,
        {
          [styles.clickable]: !!onClick,
        },
        className,
      )}
      style={style}
      aria-rowindex={ariaRowIndex}
      role={role}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? onKeyDown : undefined}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

const DefaultAnchor: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => <a {...props} />

export const LinkRow = ({
  children,
  className,
  style,
  role,
  ariaRowIndex,
  href,
  AnchorComponent = DefaultAnchor,
}: PropsWithChildren<LinkRowProps>) => {
  const anchorId = useUID()

  return (
    <div data-test="table-cell-row" className={cn(styles.linkRow, className)} role={role} aria-rowindex={ariaRowIndex} aria-owns={anchorId}>
      <AnchorComponent className={styles.link} style={style} href={href} id={anchorId}>
        {children}
      </AnchorComponent>
    </div>
  )
}

export const HeaderRow = ({ children, className, style, role, ariaRowIndex }: PropsWithChildren<HeaderRowProps>) => (
  <div data-test="table-header-row" className={cn(styles.row, className)} style={style} role={role} aria-rowindex={ariaRowIndex}>
    {children}
  </div>
)
