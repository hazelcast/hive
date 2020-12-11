import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { AlertTriangle } from 'react-feather'
import { useUID } from 'react-uid'

import { Tooltip, TooltipProps } from '../../src/Tooltip'
import { Icon, IconProps } from '../../src/Icon'
import { Cell, CellProps, CellWarning, CellWarningProps } from '../../src/Table/Cell'

import styles from '../../src/Table/Cell.module.scss'

jest.mock('react-uid')
const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('CellWarning', () => {
  const iconId = 'iconId'

  beforeEach(() => {
    useUIDMock.mockImplementation(() => iconId)
  })

  const aligns: CellWarningProps['align'][] = ['left', 'right']
  it.each(aligns)('renders children with correct props for %s align ', async (align) => {
    const wrapper = await mountAndCheckA11Y(
      <div>
        <CellWarning align={align} warning="testWarning" />
      </div>,
    )

    const tooltip = wrapper.find(Tooltip)
    expect(tooltip.props()).toEqual<TooltipProps>({
      id: iconId,
      content: 'testWarning',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    const cellWarningContent = wrapper.findDataTest('cell-warning-content')
    expect(cellWarningContent.props()).toEqual({
      'data-test': 'cell-warning-content',
      className: `${styles.warningIcon} ${styles[align]}`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })

    expect(cellWarningContent.find(Icon).props()).toEqual<IconProps>({
      icon: AlertTriangle,
      ariaLabelledBy: iconId,
      size: 'small',
    })
  })
})

describe('Cell', () => {
  const cellPropsBase: CellProps = {
    key: 1,
    align: 'left',
  }

  const expectedPropsBase = {
    'data-test': 'table-cell',
    className: `${styles.td} ${styles.alignLeft}`,
    style: undefined,
    role: undefined,
    'aria-colspan': undefined,
    'aria-sort': undefined,
    onClick: undefined,
    onKeyPress: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    children: expect.anything(),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: [CellProps, Record<string, any>][] = [
    [cellPropsBase, expectedPropsBase],
    [
      { ...cellPropsBase, align: 'left' },
      { ...expectedPropsBase, className: `${styles.td} ${styles.alignLeft}` },
    ],
    [
      { ...cellPropsBase, align: 'center' },
      { ...expectedPropsBase, className: `${styles.td} ${styles.alignCenter}` },
    ],
    [
      { ...cellPropsBase, align: 'right' },
      { ...expectedPropsBase, className: `${styles.td} ${styles.alignRight}` },
    ],
    [
      { ...cellPropsBase, colSpan: 1, style: { width: 40 }, className: 'testClassName', role: '' },
      {
        ...expectedPropsBase,
        className: `${styles.td} ${styles.alignLeft} testClassName`,
        style: { width: 40 },
        'aria-colspan': 1,
        role: '',
      },
    ],
  ]

  it.each(data)('returns div with correct props for given Cell props', async (cellProps, expectedProps) => {
    const wrapper = await mountAndCheckA11Y(<Cell {...cellProps} />)

    expect(wrapper.findDataTest('table-cell').props()).toEqual({
      ...expectedProps,
    })
  })

  it('renders CellWarning when warning prop is defined', async () => {
    const warning = 'testWarning'

    const wrapper = await mountAndCheckA11Y(<Cell {...cellPropsBase} warning={warning} />)

    expect(wrapper.find(CellWarning).props()).toEqual<CellWarningProps>({
      warning: warning,
      align: 'left',
    })
  })
})
