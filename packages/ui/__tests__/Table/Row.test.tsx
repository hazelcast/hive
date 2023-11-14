import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React, { PropsWithChildren } from 'react'
import { act } from 'react-dom/test-utils'

import { HeaderRow, HeaderRowProps, LinkRow, LinkRowProps, Row, RowProps } from '../../src/Table/Row'

import styles from '../../src/Table/Row.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>

describe('Row', () => {
  const rowDataTest = 'table-cell-row'
  const rowData: [PropsWithChildren<RowProps>, AnyProps][] = [
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
        style: undefined,
        children: 'Row',
      },
    ],
    [
      {
        ariaRowIndex: 1,
        onClick: jest.fn(),
        style: { width: 40 },
        className: 'testClassName',
        role: 'row',
        children: <div role="cell">Row</div>,
      },
      {
        'data-test': rowDataTest,
        className: `${styles.row} ${styles.clickable} testClassName`,
        role: 'row',
        'aria-rowindex': 1,
        tabIndex: 0,

        onClick: expect.anything(),

        onKeyPress: expect.anything(),
        style: { width: 40 },
        children: <div role="cell">Row</div>,
      },
    ],
  ]

  it.each(rowData)('returns <div> with correct props for given Row props', async (cellProps, expectedDivProps) => {
    const wrapper = await mountAndCheckA11Y(
      <div role={cellProps.role === 'row' ? 'table' : undefined}>
        <Row {...cellProps} />
      </div>,
    )

    expect(wrapper.findDataTest(rowDataTest).props()).toEqual(expectedDivProps)
  })

  const linkRowData: [PropsWithChildren<LinkRowProps>, AnyProps, AnyProps][] = [
    [
      { href: 'testHref', children: 'Row' },
      {
        'data-test': rowDataTest,
        className: styles.linkRow,
        role: undefined,
        'aria-rowindex': undefined,
        'aria-owns': '1',
        children: expect.anything(),
      },
      { className: styles.link, id: '1', style: undefined, href: 'testHref', children: 'Row' },
    ],
    [
      {
        ariaRowIndex: 1,
        href: 'testHref',
        style: { width: 40 },
        className: 'testClassName',
        role: 'row',
        children: 'Row',
      },
      {
        'data-test': rowDataTest,
        className: `${styles.linkRow} testClassName`,
        role: 'row',
        'aria-rowindex': 1,
        'aria-owns': '2',
        children: expect.anything(),
      },
      { className: styles.link, id: '2', style: { width: 40 }, href: 'testHref', children: 'Row' },
    ],
  ]

  // Blocked by https://github.com/w3c/html-aria/issues/473
  it.skip.each(linkRowData)(
    'returns <div> with <a> child, both with correct props for given Row props',
    async (cellProps, expectedOuterDivProps, expectedInnerAnchorProps) => {
      const wrapper = await mountAndCheckA11Y(<LinkRow {...cellProps} />)

      expect(wrapper.findDataTest(rowDataTest).props()).toEqual(expectedOuterDivProps)
      expect(wrapper.findDataTest(rowDataTest).find('a').props()).toEqual(expectedInnerAnchorProps)
    },
  )

  it('Should call onClick on Enter key press', async () => {
    const onClick = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Row onClick={onClick} />)

    expect(onClick).toBeCalledTimes(0)

    act(() => {
      const onKeyPress = wrapper.findDataTest('table-cell-row').prop('onKeyPress') as (event: {
        preventDefault: () => void
        key: string
      }) => void
      onKeyPress({ preventDefault: () => null, key: 'Tab' })
    })
    wrapper.update()

    expect(onClick).toBeCalledTimes(0)

    act(() => {
      const onKeyPress = wrapper.findDataTest('table-cell-row').prop('onKeyPress') as (event: {
        preventDefault: () => void
        key: string
      }) => void
      onKeyPress({ preventDefault: () => null, key: 'Enter' })
    })
    wrapper.update()

    expect(onClick).toBeCalledTimes(1)
  })
})

const headerRowDataTest = 'table-header-row'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedHeaderRowElementProps: AnyProps = {
  'data-test': headerRowDataTest,
  className: styles.headerRow,
  style: undefined,
  role: 'row',
  'aria-rowindex': undefined,
  children: expect.anything(),
}

describe('HeaderRow', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: [PropsWithChildren<HeaderRowProps>, AnyProps][] = [
    [{ role: 'row', children: <div role="cell" /> }, expectedHeaderRowElementProps],
    [
      { ariaRowIndex: 1, role: 'row', style: { width: 40 }, className: 'testClassName', children: <div role="cell">Header Row</div> },
      {
        ...expectedHeaderRowElementProps,
        className: `${styles.headerRow} testClassName`,
        style: { width: 40 },
        'aria-rowindex': 1,
      },
    ],
  ]

  it.each(data)('returns <div> with correct props for given HeaderRow props', async (cellProps, expectedElementProps) => {
    const wrapper = await mountAndCheckA11Y(
      <div role="table">
        <HeaderRow {...cellProps} />
      </div>,
    )

    expect(wrapper.findDataTest(headerRowDataTest).props()).toEqual(expectedElementProps)
  })
})
