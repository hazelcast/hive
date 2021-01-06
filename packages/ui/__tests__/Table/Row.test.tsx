import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React, { PropsWithChildren } from 'react'

import { HeaderRow, HeaderRowProps, Row, RowProps } from '../../src/Table/Row'

import styles from '../../src/Table/Row.module.scss'

const rowDataTest = 'table-cell-row'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedProps: Record<string, any> = {
  'data-test': rowDataTest,
  className: styles.row,
  style: undefined,
  role: undefined,
  onClick: undefined,
  'aria-rowindex': undefined,
  children: undefined,
}

describe('Row', () => {
  const onClick = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowData: [PropsWithChildren<RowProps>, Record<string, any>][] = [
    [{}, expectedProps],
    [
      { ariaRowIndex: 1, onClickOrHref: onClick, style: { width: 40 }, className: 'testClassName', role: '', children: 'Row' },
      {
        ...expectedProps,
        className: `${styles.row} ${styles.clickable} testClassName`,
        style: { width: 40 },
        role: '',
        'aria-rowindex': 1,
        children: 'Row',
        onClick,
      },
    ],
  ]

  it.each(rowData)('returns <div> with correct props for given Row props', async (cellProps, expectedElementProps) => {
    const wrapper = await mountAndCheckA11Y(<Row {...cellProps} />)

    expect(wrapper.findDataTest(rowDataTest).props()).toEqual(expectedElementProps)
  })

  it('returns <div> with <a> child when passing the href prop', async () => {
    const props = {
      ariaRowIndex: 1,
      onClickOrHref: 'testHref',
      style: { width: 40 },
      className: 'testClassName',
      role: '',
      children: 'Row',
    }
    const wrapper = await mountAndCheckA11Y(<Row {...props} />)
    const div = wrapper.findDataTest(rowDataTest)

    expect(div.props()).toEqual({
      'data-test': rowDataTest,
      role: props.role,
      'aria-rowindex': props.ariaRowIndex,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })
    expect(div.find('a').props()).toEqual({
      className: `${styles.row} ${styles.clickable} ${styles.link} testClassName`,
      style: props.style,
      href: props.onClickOrHref,
      children: props.children,
    })
  })
})

const headerRowDataTest = 'table-header-row'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedHeaderRowElementProps: Record<string, any> = {
  'data-test': headerRowDataTest,
  className: styles.headerRow,
  style: undefined,
  role: undefined,
  'aria-rowindex': undefined,
  children: undefined,
}

describe('HeaderRow', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: [PropsWithChildren<HeaderRowProps>, Record<string, any>][] = [
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
