import React, { PropsWithChildren } from 'react'

import { Cell, CellProps } from '../../src/Table/Cell'
import { Header, HeaderProps } from '../../src/Table/Header'
import { Row } from '../../src/Table/Row'

export default {
  title: 'Components/Table/Row',
  component: Row,
}

export const HeaderRow = () => (
  <Row isHeaderRow>
    <Header canSort={false} isSorted={false}>
      Header-1
    </Header>
    <Header canSort={false} isSorted={false}>
      Header-2
    </Header>
    <Header canSort={false} isSorted={false}>
      Header-3
    </Header>
  </Row>
)
HeaderRow.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=2875%3A0',
  },
}

export const CellRow = () => (
  <Row isHeaderRow={false}>
    <Cell>Cell-1</Cell>
    <Cell>Cell-2</Cell>
    <Cell>Cell-3</Cell>
  </Row>
)

const headers: PropsWithChildren<HeaderProps>[] = [
  {
    children: 'Header-1',
    canSort: true,
    isSorted: true,
    isSortedDesc: false,
  },
  {
    children: 'Header-2',
    canSort: true,
    isSorted: true,
    isSortedDesc: true,
    align: 'right',
  },
  {
    children: 'Header-3',
    canSort: false,
    isSorted: false,
  },
]
const cells: PropsWithChildren<CellProps>[] = [
  {
    children: 'Cell-1',
  },
  {
    children: 'Cell-2',
    align: 'right',
  },
  {
    children: 'Cell-3',
  },
]
export const MultipleRows = () => (
  <>
    <Row isHeaderRow>
      {headers.map(({ children, ...props }, i) => (
        <Header key={i} {...props}>
          {children}
        </Header>
      ))}
    </Row>
    <Row isHeaderRow={false}>
      {cells.map(({ children, ...props }, i) => (
        <Cell key={i} {...props}>
          {children}
        </Cell>
      ))}
    </Row>
    <Row isHeaderRow={false}>
      {cells.map(({ children, ...props }, i) => (
        <Cell key={i} {...props} warning="Cell warning">
          {children}
        </Cell>
      ))}
    </Row>
    <Row isHeaderRow={false} inactive>
      {cells.map(({ children, ...props }, i) => (
        <Cell key={i} {...props}>
          {children}
        </Cell>
      ))}
    </Row>
  </>
)
