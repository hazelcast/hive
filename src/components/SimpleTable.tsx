import React, { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import cls from 'classnames'

import styles from './SimpleTable.module.css'

type TableVariant = 'surface' | 'ghost'
type TableAlign = 'start' | 'center' | 'end' | 'baseline'
type TableJustify = 'start' | 'center' | 'end'

const justifyClass = (justify: TableJustify | undefined) => {
  if (!justify) return undefined
  return { start: styles.justifyStart, center: styles.justifyCenter, end: styles.justifyEnd }[justify]
}

const alignClass = (align: TableAlign | undefined) => {
  if (!align) return undefined
  return {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    baseline: styles.alignBaseline,
  }[align]
}

export type SimpleTableProps = HTMLAttributes<HTMLTableElement> & {
  variant?: TableVariant
}

export type SimpleTableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  align?: TableAlign
}

export type SimpleTableCellProps = TdHTMLAttributes<HTMLTableDataCellElement> & {
  justify?: TableJustify
}

export type SimpleTableColumnHeaderCellProps = ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  justify?: TableJustify
}

export type SimpleTableRowHeaderCellProps = ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  justify?: TableJustify
}

export const SimpleTable = ({ className, variant = 'ghost', ...rest }: SimpleTableProps) => (
  <table className={cls(styles.root, variant === 'surface' && styles.surface, className)} {...rest} />
)

SimpleTable.Header = function SimpleTableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />
}

SimpleTable.Body = function SimpleTableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}

SimpleTable.Footer = function SimpleTableFooter(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot {...props} />
}

SimpleTable.Row = function SimpleTableRow({ className, align, ...rest }: SimpleTableRowProps) {
  return <tr className={cls(alignClass(align), className)} {...rest} />
}

SimpleTable.Cell = function SimpleTableCell({ className, justify, ...rest }: SimpleTableCellProps) {
  return <td className={cls(justifyClass(justify), className)} {...rest} />
}

SimpleTable.ColumnHeaderCell = function SimpleTableColumnHeaderCell({ className, justify, ...rest }: SimpleTableColumnHeaderCellProps) {
  return <th className={cls(justifyClass(justify), className)} {...rest} />
}

SimpleTable.RowHeaderCell = function SimpleTableRowHeaderCell({ className, justify, ...rest }: SimpleTableRowHeaderCellProps) {
  return <th scope="row" className={cls(styles.rowHeaderCell, justifyClass(justify), className)} {...rest} />
}
