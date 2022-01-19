import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'

import { Icon, IconProps } from '../../src/Icon'
import { Header, HeaderProps } from '../../src/Table/Header'

import styles from '../../src/Table/Header.module.scss'

const headerPropsBase: HeaderProps = {
  index: 0,
  align: 'left',
  canSort: false,
  isSorted: false,
  isSortedDesc: false,
  canResize: false,
  isResizing: false,
  getResizerProps: jest.fn() as HeaderProps['getResizerProps'],
  isLastHeader: false,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedContainerProps: Record<string, any> = {
  'data-test': 'table-header-container',
  className: styles.container,
  style: undefined,
  role: undefined,
  'aria-colspan': undefined,
  'aria-sort': undefined,
  children: expect.anything(),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedContentProps: Record<string, any> = {
  'data-test': 'table-header-content',
  className: `${styles.th} ${styles.alignLeft}`,
  role: undefined,
  onClick: undefined,
  onKeyPress: undefined,
  children: expect.anything(),
  draggable: false,
  onDragEnd: expect.anything(),
  onDragEnter: undefined,
  onDragLeave: undefined,
  onDragOver: expect.anything(),
  onDragStart: undefined,
  onDrop: undefined,
}

describe('Header', () => {
  const onClick = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: [HeaderProps, Record<string, any>, Record<string, any>][] = [
    [headerPropsBase, expectedContainerProps, expectedContentProps],
    [
      { ...headerPropsBase, canSort: true, isSorted: true, isSortedDesc: true },
      { ...expectedContainerProps, 'aria-sort': 'descending' },
      { ...expectedContentProps, className: `${styles.th} ${styles.sortable} ${styles.alignLeft}` },
    ],
    [
      { ...headerPropsBase, canSort: true, isSorted: true, isSortedDesc: false },
      { ...expectedContainerProps, 'aria-sort': 'ascending' },
      { ...expectedContentProps, className: `${styles.th} ${styles.sortable} ${styles.alignLeft}` },
    ],
    [
      { ...headerPropsBase, align: 'left' },
      { ...expectedContainerProps },
      { ...expectedContentProps, className: `${styles.th} ${styles.alignLeft}` },
    ],
    [
      { ...headerPropsBase, align: 'center' },
      { ...expectedContainerProps },
      { ...expectedContentProps, className: `${styles.th} ${styles.alignCenter}` },
    ],
    [
      { ...headerPropsBase, align: 'right' },
      { ...expectedContainerProps },
      { ...expectedContentProps, className: `${styles.th} ${styles.alignRight}` },
    ],
    [
      { ...headerPropsBase, colSpan: 1, style: { width: 40 }, className: 'testClassName', onClick, role: '' },
      {
        ...expectedContainerProps,
        className: `${styles.container} testClassName`,
        style: { width: 40 },
        role: '',
        'aria-colspan': 1,
      },
      { ...expectedContentProps, role: 'button', tabIndex: 0, onClick, onKeyPress: expect.anything() },
    ],
  ]

  it.each(data)(
    'returns div with correct props for given Header props',
    async (headerProps, expectedContainerProps, expectedContentProps) => {
      const wrapper = await mountAndCheckA11Y(<Header {...headerProps}>Header</Header>)

      expect(wrapper.findDataTest('table-header-container').props()).toEqual(expectedContainerProps)
      expect(wrapper.findDataTest('table-header-content').props()).toEqual(expectedContentProps)
    },
  )

  it('renders ChevronDown Icon when sorting in descending order', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Header {...headerPropsBase} canSort isSorted isSortedDesc>
        Header
      </Header>,
    )

    expect(wrapper.find(Icon).props()).toEqual<IconProps>({
      className: `${styles.sortingIcon} ${styles.left}`,
      icon: ChevronDown,
      ariaLabel: 'Descending',
      size: 'smallMedium',
    })
  })

  it('renders ChevronUp Icon when sorting in ascending order', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Header {...headerPropsBase} canSort isSorted isSortedDesc={false}>
        Header
      </Header>,
    )

    expect(wrapper.find(Icon).props()).toEqual<IconProps>({
      className: `${styles.sortingIcon} ${styles.left}`,
      icon: ChevronUp,
      ariaLabel: 'Ascending',
      size: 'smallMedium',
    })
  })

  it('renders resizer when resizing is enabled', async () => {
    const getResizerProps = () => ({
      testprop: 'testProp',
    })

    const wrapper = await mountAndCheckA11Y(
      <Header {...headerPropsBase} canResize getResizerProps={getResizerProps}>
        Header
      </Header>,
    )

    expect(wrapper.findDataTest('table-header-column-resizer-container').props()).toEqual({
      'data-test': 'table-header-column-resizer-container',
      className: `${styles.resizer}`,
      testprop: 'testProp',
      children: expect.anything(),
    })

    wrapper.setProps({ isResizing: true })
    expect(wrapper.findDataTest('table-header-column-resizer').props()).toEqual({
      'data-test': 'table-header-column-resizer',
      className: `${styles.separator} ${styles.resizing}`,
    })
  })

  it('draggable attribute', async () => {
    const wrapper = await mountAndCheckA11Y(<Header {...headerPropsBase}>Header</Header>)

    expect(wrapper.findDataTest('table-header-content').prop('draggable')).toBeFalsy()

    wrapper.setProps({
      onDrop: jest.fn(),
      onDragStart: jest.fn(),
    })

    expect(wrapper.findDataTest('table-header-content').prop('draggable')).toBeTruthy()

    wrapper.setProps({
      onDrop: undefined,
      onDragStart: jest.fn(),
    })

    expect(wrapper.findDataTest('table-header-content').prop('draggable')).toBeFalsy()

    wrapper.setProps({
      onDrop: jest.fn(),
      onDragStart: undefined,
    })

    expect(wrapper.findDataTest('table-header-content').prop('draggable')).toBeFalsy()
  })

  it('calls onDragStart callback with correct data', async () => {
    const onDragStart = jest.fn()
    const onDrop = jest.fn()
    const setData = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Header {...headerPropsBase} onDragStart={onDragStart} onDrop={onDrop}>
        Header
      </Header>,
    )

    expect(onDragStart).toBeCalledTimes(0)
    expect(onDrop).toBeCalledTimes(0)
    expect(setData).toBeCalledTimes(0)

    expect(wrapper.findDataTest('table-header-content').prop('draggable')).toBeTruthy()

    wrapper.findDataTest('table-header-content').simulate('dragstart', {
      dataTransfer: {
        setData,
      },
    })

    expect(onDragStart).toBeCalledTimes(1)
    expect(setData).toBeCalledTimes(1)
    expect(setData).toBeCalledWith('text/plain', '0')
  })
})
