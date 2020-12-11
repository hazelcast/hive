import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Icon, IconProps } from '../../src'

import { Header, HeaderProps } from '../../src/Table/Header'

import styles from '../../src/Table/Header.module.scss'

const HeaderPropsBase: HeaderProps = {
  key: 1,
  align: 'left',
  canSort: false,
  isSorted: false,
  isSortedDesc: false,
  canResize: false,
  isResizing: false,
  getResizerProps: jest.fn() as HeaderProps['getResizerProps'],
}

const expectedPropsBase = {
  'data-test': 'table-header',
  className: `${styles.th} ${styles.alignLeft}`,
  style: undefined,
  role: undefined,
  'aria-colspan': undefined,
  'aria-sort': undefined,
  onClick: undefined,
  onKeyPress: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  children: expect.anything(),
}

describe('Header', () => {
  const onClick = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: [HeaderProps, Record<string, any>][] = [
    [HeaderPropsBase, expectedPropsBase],
    [
      { ...HeaderPropsBase, canSort: true, isSorted: true, isSortedDesc: true },
      { ...expectedPropsBase, className: `${styles.th} ${styles.sortable} ${styles.alignLeft}`, 'aria-sort': 'descending' },
    ],
    [
      { ...HeaderPropsBase, canSort: true, isSorted: true, isSortedDesc: false },
      { ...expectedPropsBase, className: `${styles.th} ${styles.sortable} ${styles.alignLeft}`, 'aria-sort': 'ascending' },
    ],
    [
      { ...HeaderPropsBase, align: 'center' },
      { ...expectedPropsBase, className: `${styles.th} ${styles.alignCenter}` },
    ],
    [
      { ...HeaderPropsBase, align: 'right' },
      { ...expectedPropsBase, className: `${styles.th} ${styles.alignRight}` },
    ],
    [
      { ...HeaderPropsBase, colSpan: 1, style: { width: 40 }, className: 'testClassName', onClick },
      {
        ...expectedPropsBase,
        className: `${styles.th} ${styles.alignLeft} testClassName`,
        'aria-colspan': 1,
        style: { width: 40 },
        onClick,
        onKeyPress: onClick,
      },
    ],
  ]

  it.each(data)('returns div with correct props for given Header props', async (HeaderProps, expectedProps) => {
    const wrapper = await mountAndCheckA11Y(<Header {...HeaderProps}>Header</Header>)

    expect(wrapper.findDataTest('table-header').props()).toEqual({
      ...expectedProps,
    })
  })

  it('renders ChevronDown Icon when sorting in descending order', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Header {...HeaderPropsBase} canSort isSorted isSortedDesc>
        Header
      </Header>,
    )

    expect(wrapper.find(Icon).props()).toEqual<IconProps>({
      className: `${styles.sortingIcon} ${styles.left}`,
      icon: ChevronDown,
      ariaLabel: 'Descending',
      size: 'small',
    })
  })

  it('renders ChevronUp Icon when sorting in ascending order', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Header {...HeaderPropsBase} canSort isSorted isSortedDesc={false}>
        Header
      </Header>,
    )

    expect(wrapper.find(Icon).props()).toEqual<IconProps>({
      className: `${styles.sortingIcon} ${styles.left}`,
      icon: ChevronUp,
      ariaLabel: 'Ascending',
      size: 'small',
    })
  })

  it('renders resizer when resizing is enabled', async () => {
    const getResizerProps = () => ({
      testprop: 'testProp',
    })

    const wrapper = await mountAndCheckA11Y(
      <Header {...HeaderPropsBase} canResize getResizerProps={getResizerProps}>
        Header
      </Header>,
    )

    expect(wrapper.findDataTest('table-header-column-resizer').props()).toEqual({
      'data-test': 'table-header-column-resizer',
      className: `${styles.resizer}`,
      testprop: 'testProp',
    })

    wrapper.setProps({ isResizing: true })
    expect(wrapper.findDataTest('table-header-column-resizer').props()).toEqual({
      'data-test': 'table-header-column-resizer',
      className: `${styles.resizer} ${styles.isResizing}`,
      testprop: 'testProp',
    })
  })
})
