import React from 'react'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { ChevronLeft, ChevronRight } from 'react-feather'
import Select from 'react-select'

import { getShownItemsRange, GetShownItemsRangeParams, Pagination, PaginationProps, ShownItemsRange } from '../src/Pagination'
import { IconButton, IconButtonProps } from '../src/IconButton'
import { Button, ButtonProps } from '../src/Button'

import styles from '../src/Pagination.module.scss'
import { NumberField, NumberFieldProps } from '../src/NumberField'
import { Link, SelectField } from '../src'
import { SelectFieldProps } from '../src/Select/SelectField'
import { SelectFieldOption } from '../src/Select/helpers'

describe('helpers', () => {
  describe('getShownItemsRange', () => {
    const data: [GetShownItemsRangeParams, ShownItemsRange][] = [
      [
        { currentPage: 1, pageSize: 5, numberOfItems: 54 },
        { firstItemShown: 1, lastItemShown: 5 },
      ],
      [
        { currentPage: 2, pageSize: 5, numberOfItems: 54 },
        { firstItemShown: 6, lastItemShown: 10 },
      ],
      // ...
      [
        { currentPage: 11, pageSize: 5, numberOfItems: 54 },
        { firstItemShown: 51, lastItemShown: 54 },
      ],
      // Let's try different pageSize
      [
        { currentPage: 1, pageSize: 10, numberOfItems: 54 },
        { firstItemShown: 1, lastItemShown: 10 },
      ],
      [
        { currentPage: 2, pageSize: 10, numberOfItems: 54 },
        { firstItemShown: 11, lastItemShown: 20 },
      ],
      // ...
      [
        { currentPage: 6, pageSize: 10, numberOfItems: 54 },
        { firstItemShown: 51, lastItemShown: 54 },
      ],
      // Let's try different pageSize
      [
        { currentPage: 1, pageSize: 20, numberOfItems: 54 },
        { firstItemShown: 1, lastItemShown: 20 },
      ],
      [
        { currentPage: 2, pageSize: 20, numberOfItems: 54 },
        { firstItemShown: 21, lastItemShown: 40 },
      ],
      [
        { currentPage: 3, pageSize: 20, numberOfItems: 54 },
        { firstItemShown: 41, lastItemShown: 54 },
      ],
    ]

    it.each(data)('returns %p for %p', (getShownItemsRangeParams, expectedShownItemsRange) => {
      expect(getShownItemsRange(getShownItemsRangeParams)).toEqual<ShownItemsRange>(expectedShownItemsRange)
    })
  })
})

const numberOfItems = 10000
const pageSize = 5
const setPageSize = jest.fn() as PaginationProps['setPageSize']
const pageSizeOptions = [5, 10]
const pageCount = Math.ceil(numberOfItems / pageSize)
const goToPage = jest.fn() as PaginationProps['goToPage']
const previousPage = jest.fn() as PaginationProps['previousPage']
const nextPage = jest.fn() as PaginationProps['nextPage']
let currentPage = 1
let canPreviousPage = true
let canNextPage = true

const buttonPropsBase: ButtonProps = {
  type: 'button',
  kind: 'transparent',
  className: styles.button,
  bodyClassName: styles.body,
  outlineClassName: styles.outline,
  capitalize: false,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  onClick: expect.anything(),
  children: 'Base',
}

const nextPrevButtonPropsBase: IconButtonProps = {
  kind: 'primary',
  icon: ChevronRight,
  ariaLabel: 'Base',
  className: styles.iconButton,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  onClick: expect.anything(),
}

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    currentPage = 1
    canPreviousPage = true
    canNextPage = true
  })

  it('renders number of rows select, buttons, and page jump', async () => {
    currentPage = 1
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const wrapper = await mountAndCheckA11Y(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={goToPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        numberOfItems={numberOfItems}
        // This way we can force-display full pagination
        displaySmallBreakpoint={0}
      />,
    )

    expect(wrapper.find(SelectField).props()).toEqual<SelectFieldProps<number>>({
      className: styles.rowsPerPage,
      labelClassName: styles.label,
      name: 'rowsPerPage',
      value: pageSize,
      isSearchable: false,
      label: 'Rows',
      options: pageSizeOptions.map((opt) => ({ value: opt, label: opt.toString() })),
      size: 'small',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
    })

    expect(wrapper.findDataTest('pagination-range-of-shown-items').props()).toEqual({
      'data-test': 'pagination-range-of-shown-items',
      className: styles.shownItems,
      children: '1 – 5 of 10000',
    })

    const iconButton = wrapper.findDataTest('pagination-buttons').find(IconButton)
    expect(iconButton.props()).toEqual<IconButtonProps>({
      ...nextPrevButtonPropsBase,
      icon: ChevronRight,
      ariaLabel: 'Next page',
    })

    const buttons = wrapper.findDataTest('pagination-buttons').find(Button)
    expect(buttons).toHaveLength(6)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '1',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '3',
    })
    expect(buttons.at(3).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '4',
    })
    expect(buttons.at(4).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '5',
    })
    expect(buttons.at(5).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2000',
    })

    expect(wrapper.find(NumberField).props()).toEqual<NumberFieldProps>({
      inputContainerClassName: styles.inputContainer,
      name: 'page',
      label: 'Go to page',
      showAriaLabel: true,
      showIconButtons: false,
      min: 1,
      max: pageCount,
      size: 'small',
      value: currentPage,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
    })
  })

  it('renders correct buttons when current page is somewhere in the middle', async () => {
    currentPage = 1000
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const wrapper = await mountAndCheckA11Y(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={goToPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        numberOfItems={numberOfItems}
        // This way we can force-display full pagination
        displaySmallBreakpoint={0}
      />,
    )

    expect(wrapper.findDataTest('pagination-range-of-shown-items').props()).toEqual({
      'data-test': 'pagination-range-of-shown-items',
      className: styles.shownItems,
      children: '4996 – 5000 of 10000',
    })

    const iconButton = wrapper.findDataTest('pagination-buttons').find(IconButton)
    expect(iconButton).toHaveLength(2)
    expect(iconButton.at(0).props()).toEqual<IconButtonProps>({
      ...nextPrevButtonPropsBase,
      icon: ChevronLeft,
      ariaLabel: 'Previous page',
    })
    expect(iconButton.at(1).props()).toEqual<IconButtonProps>({
      ...nextPrevButtonPropsBase,
      icon: ChevronRight,
      ariaLabel: 'Next page',
    })

    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(5)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '999',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '1000',
    })
    expect(buttons.at(3).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1001',
    })
    expect(buttons.at(4).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2000',
    })
  })

  it('renders correct buttons when current page is the last page', async () => {
    currentPage = pageCount
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const wrapper = await mountAndCheckA11Y(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={goToPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        numberOfItems={numberOfItems}
        // This way we can force-display full pagination
        displaySmallBreakpoint={0}
      />,
    )

    expect(wrapper.findDataTest('pagination-range-of-shown-items').props()).toEqual({
      'data-test': 'pagination-range-of-shown-items',
      className: styles.shownItems,
      children: '9996 – 10000 of 10000',
    })

    const iconButton = wrapper.findDataTest('pagination-buttons').find(IconButton)
    expect(iconButton.props()).toEqual<IconButtonProps>({
      ...nextPrevButtonPropsBase,
      icon: ChevronLeft,
      ariaLabel: 'Previous page',
    })

    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(6)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1996',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1997',
    })
    expect(buttons.at(3).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1998',
    })
    expect(buttons.at(4).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1999',
    })
    expect(buttons.at(5).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '2000',
    })
  })

  it('changes pages correctly', async () => {
    currentPage = 10
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const wrapper = await mountAndCheckA11Y(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={goToPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        numberOfItems={numberOfItems}
        // This way we can force-display full pagination
        displaySmallBreakpoint={0}
      />,
    )

    const iconButtons = wrapper.findDataTest('pagination-buttons').find(IconButton)
    const buttons = wrapper.findDataTest('pagination-buttons').find(Button)
    expect(previousPage).toHaveBeenCalledTimes(0)
    expect(nextPage).toHaveBeenCalledTimes(0)
    expect(goToPage).toHaveBeenCalledTimes(0)

    // Let's click on `Previous` button
    iconButtons.at(0).simulate('click')
    expect(previousPage).toHaveBeenCalledTimes(1)
    // Let's click on `Next` button
    iconButtons.at(1).simulate('click')
    expect(nextPage).toHaveBeenCalledTimes(1)

    // Let's click on page buttons
    buttons.at(0).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(1)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(1)
    buttons.at(1).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(2)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(9)
    buttons.at(2).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(3)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(10)
    buttons.at(3).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(4)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(11)
    buttons.at(4).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(5)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(2000)

    expect(previousPage).toHaveBeenCalledTimes(1)
    expect(nextPage).toHaveBeenCalledTimes(1)
  })

  it('jumps page correctly', async () => {
    currentPage = 10
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const wrapper = await mountAndCheckA11Y(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={goToPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        numberOfItems={numberOfItems}
        // This way we can force-display full pagination
        displaySmallBreakpoint={0}
      />,
    )

    expect(goToPage).toHaveBeenCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find(NumberField).find('input'), 42)
    })
    wrapper.update()

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find(Link).simulate('click')
    })

    expect(goToPage).toHaveBeenCalledTimes(1)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(42)
  })

  it('changes number of rows correctly', async () => {
    currentPage = 10
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const wrapper = await mountAndCheckA11Y(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={goToPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        numberOfItems={numberOfItems}
        // This way we can force-display full pagination
        displaySmallBreakpoint={0}
      />,
    )

    expect(setPageSize).toHaveBeenCalledTimes(0)

    const selectInstance = wrapper.find(Select).instance() as Select<SelectFieldOption<number>>
    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.({ value: 10, label: '10' }, { action: 'select-option' })
    })
    wrapper.update()

    expect(setPageSize).toHaveBeenCalledTimes(1)
    expect(setPageSize).toHaveBeenCalledWith<Parameters<typeof setPageSize>>(10)
  })

  it('renders small version of pagination', async () => {
    currentPage = 1
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const wrapper = await mountAndCheckA11Y(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={goToPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
        numberOfItems={numberOfItems}
      />,
    )

    expect(wrapper.findDataTest('pagination-buttons').find(IconButton).props()).toEqual<IconButtonProps>({
      ...nextPrevButtonPropsBase,
      icon: ChevronRight,
      ariaLabel: 'Next page',
    })

    let buttons = wrapper.findDataTest('pagination-buttons').find(Button)
    expect(buttons).toHaveLength(3)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '1',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2000',
    })

    expect(wrapper.findDataTest('pagination-range-of-shown-items').exists()).toBe(false)
    expect(wrapper.find(SelectField).exists()).toBe(false)

    // Show more options
    act(() => {
      wrapper.find(IconButton).at(1).simulate('click')
    })
    wrapper.update()

    expect(wrapper.findDataTest('pagination-buttons').exists()).toBe(false)
    expect(wrapper.findDataTest('pagination-range-of-shown-items').exists()).toBe(false)

    expect(wrapper.find(SelectField).props()).toEqual<SelectFieldProps<number>>({
      className: styles.rowsPerPage,
      labelClassName: styles.label,
      name: 'rowsPerPage',
      value: pageSize,
      isSearchable: false,
      label: 'Rows',
      size: 'small',
      options: pageSizeOptions.map((opt) => ({ value: opt, label: opt.toString() })),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
    })

    expect(wrapper.find(NumberField).props()).toEqual<NumberFieldProps>({
      inputContainerClassName: styles.inputContainer,
      name: 'page',
      label: 'Go to page',
      showAriaLabel: true,
      showIconButtons: false,
      min: 1,
      max: pageCount,
      size: 'small',
      value: currentPage,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
    })

    // Back to pagination buttons
    act(() => {
      wrapper.find(IconButton).simulate('click')
    })
    wrapper.update()

    expect(wrapper.findDataTest('pagination-buttons').find(IconButton).props()).toEqual<IconButtonProps>({
      ...nextPrevButtonPropsBase,
      icon: ChevronRight,
      ariaLabel: 'Next page',
    })

    buttons = wrapper.findDataTest('pagination-buttons').find(Button)
    expect(buttons).toHaveLength(3)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '1',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2000',
    })

    expect(wrapper.findDataTest('pagination-range-of-shown-items').exists()).toBe(false)
    expect(wrapper.find(SelectField).exists()).toBe(false)
  })
})
