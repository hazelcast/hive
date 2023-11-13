import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React, { PropsWithChildren } from 'react'
import { AlertTriangle } from 'react-feather'
import { useUID } from 'react-uid'

import { Tooltip, TooltipProps } from '../../src/Tooltip'
import { Icon, IconProps } from '../../src/Icon'
import { Cell, CellProps, CellWarning, CellWarningProps } from '../../src/Table/Cell'

import styles from '../../src/Table/Cell.module.scss'

jest.mock('react-uid')
const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const Wrapper = (props: PropsWithChildren<object>) => (
  <div role="table">
    <div role="row">{props.children}</div>
  </div>
)

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

      children: expect.anything(),
    })

    const cellWarningContent = wrapper.findDataTest('cell-warning-content')
    expect(cellWarningContent.props()).toEqual({
      'data-test': 'cell-warning-content',
      className: `${styles.warningIcon} ${styles[align]}`,

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
    align: 'left',
    role: 'cell',
  }

  const expectedPropsBase = {
    'data-test': 'table-cell',
    className: `${styles.td} ${styles.alignLeft}`,
    style: undefined,
    role: 'cell',
    'aria-colspan': undefined,
    'aria-sort': undefined,
    onClick: undefined,
    onKeyPress: undefined,

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
      { ...cellPropsBase, colSpan: 1, style: { width: 40 }, className: 'testClassName' },
      {
        ...expectedPropsBase,
        className: `${styles.td} ${styles.alignLeft} testClassName`,
        style: { width: 40 },
        'aria-colspan': 1,
      },
    ],
  ]

  it.each(data)('returns div with correct props for given Cell props', async (cellProps, expectedProps) => {
    const wrapper = await mountAndCheckA11Y(
      <Wrapper>
        <Cell {...cellProps}>Cell</Cell>
      </Wrapper>,
    )

    expect(wrapper.findDataTest('table-cell').props()).toEqual(expectedProps)
  })

  it('renders CellWarning when warning prop is defined', async () => {
    const warning = 'testWarning'

    const wrapper = await mountAndCheckA11Y(
      <Wrapper>
        <Cell {...cellPropsBase} warning={warning} />
      </Wrapper>,
    )

    expect(wrapper.find(CellWarning).props()).toEqual<CellWarningProps>({
      warning: warning,
      align: 'left',
    })
  })
})
