import { renderAndCheckA11Y } from '../../../src'
import React, { PropsWithChildren } from 'react'
import { useUID } from 'react-uid'
import { screen, within } from '@testing-library/react'

import { Cell, CellProps, CellWarning, CellWarningProps } from '../../../src/components/Table/Cell'

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
    await renderAndCheckA11Y(
      <div>
        <CellWarning align={align} warning="testWarning" />
      </div>,
    )

    const cellWarningContent = screen.getByTestId('cell-warning-content')
    expect(cellWarningContent).toHaveClass(`${styles.warningIcon} ${styles[align]}`)
    expect(within(cellWarningContent).queryByTestId('cell-warning-content-icon')).toBeInTheDocument()
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
  }

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
    await renderAndCheckA11Y(
      <Wrapper>
        <Cell {...cellProps}>Cell</Cell>
      </Wrapper>,
    )

    const cell = screen.getByTestId('table-cell')
    expect(cell).toHaveClass(expectedProps.className as string)
    if (expectedProps.style) {
      expect(cell).toHaveAttribute('style')
    } else {
      expect(cell).not.toHaveAttribute('style')
    }
    expect(cell).toHaveRole(expectedProps.role as string)
    if (expectedProps['aria-colspan'] != null) {
      expect(cell).toHaveAttribute('aria-colspan', String(expectedProps['aria-colspan']))
    } else {
      expect(cell).not.toHaveAttribute('aria-colspan')
    }
    if (expectedProps['aria-sort']) {
      expect(cell).toHaveAttribute('aria-sort', expectedProps['aria-sort'] as string)
    } else {
      expect(cell).not.toHaveAttribute('aria-sort')
    }
  })

  it('renders CellWarning when warning prop is defined', async () => {
    const warning = 'testWarning'

    const { rerender } = await renderAndCheckA11Y(
      <Wrapper>
        <Cell {...cellPropsBase} warning={warning} />
      </Wrapper>,
    )

    expect(screen.queryByTestId('cell-warning-content')).toBeInTheDocument()

    rerender(
      <Wrapper>
        <Cell {...cellPropsBase} />
      </Wrapper>,
    )

    expect(screen.queryByTestId('cell-warning-content')).not.toBeInTheDocument()
  })
})
