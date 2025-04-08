import React, { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import cls from 'classnames'

import styles from './SimpleTable.module.scss'

export type SimpleTableProps = HTMLAttributes<HTMLTableElement>

export const SimpleTable = (props: SimpleTableProps) => {
  const { className, ...rest } = props

  return <table className={cls(className, styles.root)} {...rest} />
}

SimpleTable.Body = function SimpleTableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}
SimpleTable.Footer = function SimpleTableFooter(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot {...props} />
}
SimpleTable.Header = function SimpleTableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />
}
SimpleTable.Row = function SimpleTableRow(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} />
}
SimpleTable.Td = function SimpleTableTd(props: TdHTMLAttributes<HTMLTableDataCellElement>) {
  return <td {...props} />
}
SimpleTable.Th = function SimpleTableTh(props: ThHTMLAttributes<HTMLTableDataCellElement>) {
  return <th {...props} />
}
