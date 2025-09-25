import { renderAndCheckA11Y } from '../../../src'
import React, { PropsWithChildren } from 'react'
import { fireEvent, screen, act } from '@testing-library/react'

import { HeaderRow, HeaderRowProps, LinkRow, LinkRowProps, Row, RowProps } from '../../../src/components/Table/Row'

import styles from '../../src/Table/Row.module.scss'

type AnyProps = Record<string, any>

describe('Row', () => {
  const rowDataTest = 'table-cell-row'
  const rowData: [PropsWithChildren<RowProps>, AnyProps][] = [
    [
      { children: 'Row' },
      {
        'data-test': rowDataTest,
        className: styles.row,
        role: null,
        tabIndex: null,
        ariaRowIndex: null,
        'aria-rowindex': null,
        style: null,
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
        'aria-rowindex': '1',
        tabIndex: '0',
        style: 'width: 40px;',
        children: <div role="cell">Row</div>,
      },
    ],
  ]

  it.each(rowData)('returns <div> with correct props for given Row props', async (cellProps, expectedDivProps) => {
    await renderAndCheckA11Y(
      <div data-test="wrapper" role={cellProps.role === 'row' ? 'table' : undefined}>
        <Row {...cellProps} />
      </div>,
    )
    const row = screen.getByTestId(rowDataTest)

    expect(row).toBeInTheDocument()
    expect(row.getAttribute('role')).toBe(expectedDivProps.role)
    expect(row.getAttribute('class')).toBe(expectedDivProps.className)
    expect(row.getAttribute('aria-rowIndex')).toBe(expectedDivProps['aria-rowindex'])
    expect(row.getAttribute('tabindex')).toBe(expectedDivProps.tabIndex)
    expect(row.getAttribute('style')).toBe(expectedDivProps.style)
  })

  const linkRowData: [PropsWithChildren<LinkRowProps>, AnyProps, AnyProps][] = [
    [
      { href: 'testHref', children: 'Row' },
      {
        'data-test': rowDataTest,
        className: styles.linkRow,
        role: null,
        'aria-rowindex': null,
        'aria-owns': '1',
        children: expect.anything(),
      },
      { className: styles.link, id: '1', style: null, href: 'testHref', children: 'Row' },
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
      { className: styles.link, id: '2', style: 'width: 40px;', href: 'testHref', children: 'Row' },
    ],
  ]

  // Blocked by https://github.com/w3c/html-aria/issues/473
  it.skip.each(linkRowData)(
    'returns <div> with <a> child, both with correct props for given Row props',
    async (cellProps, expectedOuterDivProps, expectedInnerAnchorProps) => {
      await renderAndCheckA11Y(<LinkRow {...cellProps} />)

      const row = screen.getByTestId(rowDataTest)

      expect(row).toBeInTheDocument()
      expect(row.getAttribute('role')).toBe(expectedOuterDivProps.role)
      expect(row.getAttribute('class')).toBe(expectedOuterDivProps.className)
      expect(row.getAttribute('aria-rowIndex')).toBe(expectedOuterDivProps['aria-rowindex'])
      expect(row.getAttribute('style')).toBe(expectedOuterDivProps.style)

      const link = row.querySelector('a')

      expect(link).toBeInTheDocument()
      if (link) {
        expect(link.getAttribute('href')).toBe(expectedInnerAnchorProps.href)
        expect(link.getAttribute('class')).toBe(expectedInnerAnchorProps.className)
        expect(link.getAttribute('style')).toBe(expectedInnerAnchorProps.style)
      }
    },
  )

  it('Should call onClick on Enter key press', async () => {
    const onClick = jest.fn()
    await renderAndCheckA11Y(<Row onClick={onClick} />)

    expect(onClick).toHaveBeenCalledTimes(0)

    act(() => {
      fireEvent.keyDown(screen.getByTestId('table-cell-row'), { key: 'Tab' })
    })

    expect(onClick).toHaveBeenCalledTimes(0)

    act(() => {
      fireEvent.keyDown(screen.getByTestId('table-cell-row'), { key: 'Enter' })
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

const headerRowDataTest = 'table-header-row'
const expectedHeaderRowElementProps: AnyProps = {
  'data-test': headerRowDataTest,
  className: styles.row,
  style: null,
  role: 'row',
  'aria-rowindex': null,
}

describe('HeaderRow', () => {
  const data: [PropsWithChildren<HeaderRowProps>, AnyProps][] = [
    [{ role: 'row', children: <div role="cell" /> }, expectedHeaderRowElementProps],
    [
      { ariaRowIndex: 1, role: 'row', style: { width: 40 }, className: 'testClassName', children: <div role="cell" /> },
      {
        ...expectedHeaderRowElementProps,
        className: `${styles.row} testClassName`,
        style: 'width: 40px;',
        'aria-rowindex': '1',
      },
    ],
  ]

  it.each(data)('returns <div> with correct props for given HeaderRow props', async (cellProps, expectedElementProps) => {
    await renderAndCheckA11Y(
      <div role="table">
        <HeaderRow {...cellProps} />
      </div>,
    )

    const row = screen.getByTestId(headerRowDataTest)

    expect(row).toBeInTheDocument()
    expect(row.getAttribute('role')).toBe(expectedElementProps.role)
    expect(row.getAttribute('class')).toBe(expectedElementProps.className)
    expect(row.getAttribute('aria-rowIndex')).toBe(expectedElementProps['aria-rowindex'])
    expect(row.getAttribute('style')).toBe(expectedElementProps.style)
  })
})
