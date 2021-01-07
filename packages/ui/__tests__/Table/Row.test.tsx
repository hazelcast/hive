import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React, { PropsWithChildren } from 'react'

import { HeaderRow, HeaderRowProps, LinkRow, LinkRowProps, Row, RowProps } from '../../src/Table/Row'

import styles from '../../src/Table/Row.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>

describe('Row', () => {
  const rowDataTest = 'table-cell-row'
  const rowData: [PropsWithChildren<RowProps>, AnyProps, AnyProps][] = [
    [
      { children: 'Row' },
      {
        'data-test': rowDataTest,
        className: styles.row,
        role: undefined,
        tabIndex: undefined,
        onClick: undefined,
        onKeyPress: undefined,
        'aria-rowindex': undefined,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      },
      { style: undefined, children: 'Row' },
    ],
    [
      { ariaRowIndex: 1, onClick: jest.fn(), style: { width: 40 }, className: 'testClassName', role: '', children: 'Row' },
      {
        'data-test': rowDataTest,
        className: `${styles.row} ${styles.clickable} testClassName`,
        role: '',
        'aria-rowindex': 1,
        tabIndex: 0,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onClick: expect.anything(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onKeyPress: expect.anything(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      },
      { style: { width: 40 }, children: 'Row' },
    ],
  ]

  it.each(rowData)(
    'returns <div> with <div> child, both with correct props for given Row props',
    async (cellProps, expectedOuterDivProps, expectedInnerDivProps) => {
      const wrapper = await mountAndCheckA11Y(<Row {...cellProps} />)

      expect(wrapper.findDataTest(rowDataTest).props()).toEqual(expectedOuterDivProps)
      expect(wrapper.findDataTest(rowDataTest).children('div').props()).toEqual(expectedInnerDivProps)
    },
  )

  const linkRowData: [PropsWithChildren<LinkRowProps>, AnyProps, AnyProps][] = [
    [
      { href: 'testHref', children: 'Row' },
      {
        'data-test': rowDataTest,
        className: styles.linkRow,
        role: undefined,
        'aria-rowindex': undefined,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      },
      { className: styles.link, style: undefined, href: 'testHref', children: 'Row' },
    ],
    [
      { ariaRowIndex: 1, href: 'testHref', style: { width: 40 }, className: 'testClassName', role: '', children: 'Row' },
      {
        'data-test': rowDataTest,
        className: `${styles.linkRow} testClassName`,
        role: '',
        'aria-rowindex': 1,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        children: expect.anything(),
      },
      { className: styles.link, style: { width: 40 }, href: 'testHref', children: 'Row' },
    ],
  ]

  it.each(linkRowData)(
    'returns <div> with <a> child, both with correct props for given Row props',
    async (cellProps, expectedOuterDivProps, expectedInnerAnchorProps) => {
      const wrapper = await mountAndCheckA11Y(<LinkRow {...cellProps} />)

      expect(wrapper.findDataTest(rowDataTest).props()).toEqual(expectedOuterDivProps)
      expect(wrapper.findDataTest(rowDataTest).children('a').props()).toEqual(expectedInnerAnchorProps)
    },
  )
})

const headerRowDataTest = 'table-header-row'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedHeaderRowElementProps: AnyProps = {
  'data-test': headerRowDataTest,
  className: styles.headerRow,
  style: undefined,
  role: undefined,
  'aria-rowindex': undefined,
  children: undefined,
}

describe('HeaderRow', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: [PropsWithChildren<HeaderRowProps>, AnyProps][] = [
    [{}, expectedHeaderRowElementProps],
    [
      { ariaRowIndex: 1, style: { width: 40 }, className: 'testClassName', role: '', children: 'Header Row' },
      {
        ...expectedHeaderRowElementProps,
        className: `${styles.headerRow} testClassName`,
        style: { width: 40 },
        role: '',
        'aria-rowindex': 1,
        children: 'Header Row',
      },
    ],
  ]

  it.each(data)('returns <div> with correct props for given HeaderRow props', async (cellProps, expectedElementProps) => {
    const wrapper = await mountAndCheckA11Y(<HeaderRow {...cellProps} />)

    expect(wrapper.findDataTest(headerRowDataTest).props()).toEqual(expectedElementProps)
  })
})
