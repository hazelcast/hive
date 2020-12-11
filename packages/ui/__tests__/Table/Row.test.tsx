import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'

import { Row, RowProps } from '../../src/Table/Row'

import styles from '../../src/Table/Row.module.scss'

const expectedProps = {
  'data-test': 'table-cell-row',
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
  const data: [RowProps, Record<string, any>][] = [
    [{ isHeaderRow: false }, { ...expectedProps }],
    [{ isHeaderRow: true }, { ...expectedProps, 'data-test': 'table-header-row', className: styles.headerRow }],
    [
      { isHeaderRow: false, ariaRowIndex: 1, onClick, style: { width: 40 }, className: 'testClassName', role: '' },
      {
        ...expectedProps,
        className: `${styles.row} ${styles.clickable} testClassName`,
        style: { width: 40 },
        role: '',
        'aria-rowindex': 1,
        onClick,
      },
    ],
    [
      { isHeaderRow: true, ariaRowIndex: 1, style: { width: 40 }, className: 'testClassName', role: '' },
      {
        ...expectedProps,
        'data-test': 'table-header-row',
        className: `${styles.headerRow} testClassName`,
        style: { width: 40 },
        role: '',
        'aria-rowindex': 1,
      },
    ],
  ]

  it.each(data)('returns div with correct props for given Cell props', async (cellProps, expectedProps) => {
    const wrapper = await mountAndCheckA11Y(<Row {...cellProps} />)

    expect(wrapper.findDataTest(expectedProps['data-test']).props()).toEqual(expectedProps)
  })
})
