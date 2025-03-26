import React, { ReactNode } from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'

import { Header, HeaderProps } from '../../src/Table/Header'

import styles from '../../src/Table/Header.module.scss'
import iconStyles from '../../src/Icon.module.scss'

const Wrapper = ({ children, ...props }: { children: (props: Partial<HeaderProps>) => ReactNode } & object) => (
  <div role="table">
    <div role="row">{children(props)}</div>
  </div>
)

const headerPropsBase: HeaderProps = {
  index: 0,
  align: 'left',
  role: 'columnheader',
  canSort: false,
  isSorted: false,
  isSortedDesc: false,
  canResize: false,
  isResizing: false,
  resizeHandler: jest.fn() as HeaderProps['resizeHandler'],
}

const expectedContainerProps: Record<string, any> = {
  'data-test': 'table-header-container',
  className: styles.container,
  style: null,
  role: 'columnheader',
  'aria-colspan': null,
  'aria-sort': null,
  children: expect.anything(),
}

const expectedContentProps: Record<string, any> = {
  'data-test': 'table-header-content',
  className: `${styles.th} ${styles.alignLeft}`,
  role: null,
  style: null,
  tabIndex: null,
  draggable: false,
}

describe('Header', () => {
  const onClick = jest.fn()

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
      { ...headerPropsBase, colSpan: 1, style: { width: 40 }, className: 'testClassName', onClick },
      {
        ...expectedContainerProps,
        className: `${styles.container} testClassName`,
        style: 'width: 40px;',
        'aria-colspan': '1',
      },
      { ...expectedContentProps, role: 'button', tabIndex: '0', onClick, onKeyPress: expect.anything() },
    ],
  ]

  it.each(data)(
    'returns div with correct props for given Header props',
    async (headerProps, expectedContainerProps, expectedContentProps) => {
      await renderAndCheckA11Y(<Wrapper>{() => <Header {...headerProps}>Header</Header>}</Wrapper>)

      const container = screen.getByTestId('table-header-container')

      expect(container).toBeInTheDocument()
      expect(container.getAttribute('class')).toBe(expectedContainerProps.className)
      expect(container.getAttribute('style')).toBe(expectedContainerProps.style)
      expect(container.getAttribute('role')).toBe(expectedContainerProps.role)
      expect(container.getAttribute('aria-colspan')).toBe(expectedContainerProps['aria-colspan'])
      expect(container.getAttribute('aria-sort')).toBe(expectedContainerProps['aria-sort'])

      const content = screen.getByTestId('table-header-content')

      expect(content).toBeInTheDocument()
      expect(content.getAttribute('class')).toBe(expectedContentProps.className)
      expect(content.getAttribute('tabindex')).toBe(expectedContentProps.tabIndex)
    },
  )

  it('renders ChevronDown Icon when sorting in descending order', async () => {
    await renderAndCheckA11Y(
      <Wrapper>
        {() => (
          <Header {...headerPropsBase} canSort isSorted isSortedDesc>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    expect(screen.getByTestId('chevron')).toBeInTheDocument()

    const icon = screen.getByTestId('chevron').querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon!.getAttribute('class')).toBe(`${iconStyles.smallMedium} ${styles.sortingIcon} ${styles.left} ${styles.isSorted}`)
    expect(icon!.getAttribute('aria-label')).toBe('Descending')
  })

  it('renders ChevronUp Icon when sorting in ascending order', async () => {
    await renderAndCheckA11Y(
      <Wrapper>
        {() => (
          <Header {...headerPropsBase} canSort isSorted isSortedDesc={false}>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    expect(screen.getByTestId('chevron')).toBeInTheDocument()

    const icon = screen.getByTestId('chevron').querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon!.getAttribute('class')).toBe(`${iconStyles.smallMedium} ${styles.sortingIcon} ${styles.left} ${styles.isSorted}`)
    expect(icon!.getAttribute('aria-label')).toBe('Ascending')
  })

  it('renders resizer when resizing is enabled', async () => {
    const resizeHandler = () => jest.fn()

    const { rerender } = await renderAndCheckA11Y(
      <Wrapper>
        {(props) => (
          <Header {...headerPropsBase} canResize resizeHandler={resizeHandler} {...props}>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    const resizerContainer = screen.getByTestId('table-header-column-resizer-container')

    expect(resizerContainer).toBeInTheDocument()
    expect(resizerContainer.getAttribute('class')).toBe(styles.resizer)

    rerender(
      <Wrapper>
        {(props) => (
          <Header {...headerPropsBase} canResize resizeHandler={resizeHandler} {...props} isResizing>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    const resizer = screen.getByTestId('table-header-column-resizer')
    expect(resizer).toBeInTheDocument()
    expect(resizer.getAttribute('class')).toBe(`resizer ${styles.separator} ${styles.resizing}`)
  })

  it('draggable attribute', async () => {
    const { rerender } = await renderAndCheckA11Y(
      <Wrapper>
        {(props) => (
          <Header {...headerPropsBase} {...props}>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    expect(screen.getByTestId('table-header-content').getAttribute('draggable')).toBe('false')

    rerender(
      <Wrapper>
        {(props) => (
          <Header {...headerPropsBase} {...props} onDrop={jest.fn()} onDragStart={jest.fn()}>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    expect(screen.getByTestId('table-header-content').getAttribute('draggable')).toBe('true')

    rerender(
      <Wrapper>
        {(props) => (
          <Header {...headerPropsBase} {...props} onDragStart={jest.fn()}>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    expect(screen.getByTestId('table-header-content').getAttribute('draggable')).toBe('false')

    rerender(
      <Wrapper>
        {(props) => (
          <Header {...headerPropsBase} {...props} onDrop={jest.fn()}>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    expect(screen.getByTestId('table-header-content').getAttribute('draggable')).toBe('false')
  })

  it('calls onDragStart callback with correct data', async () => {
    const onDragStart = jest.fn()
    const onDrop = jest.fn()
    const setData = jest.fn()
    await renderAndCheckA11Y(
      <Wrapper>
        {() => (
          <Header {...headerPropsBase} onDragStart={onDragStart} onDrop={onDrop}>
            Header
          </Header>
        )}
      </Wrapper>,
    )

    expect(onDragStart).toBeCalledTimes(0)
    expect(onDrop).toBeCalledTimes(0)
    expect(setData).toBeCalledTimes(0)

    expect(screen.getByTestId('table-header-content').getAttribute('draggable')).toBeTruthy()

    fireEvent.dragStart(screen.getByTestId('table-header-content'), {
      dataTransfer: {
        setData,
      },
    })

    expect(onDragStart).toBeCalledTimes(1)
    expect(setData).toBeCalledTimes(1)
    expect(setData).toBeCalledWith('text/plain', '0')
  })
})
