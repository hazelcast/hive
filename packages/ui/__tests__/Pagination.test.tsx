import React from 'react'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { getShownItemsRange, GetShownItemsRangeParams, Pagination, PaginationProps, ShownItemsRange } from '../src/Pagination'

import styles from '../src/Pagination.module.scss'

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

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    currentPage = 1
    canPreviousPage = true
    canNextPage = true
  })

  it('renders number of rows select, buttons, and page jump', () => {
    currentPage = 1
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    render(
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

    const label = screen.queryByTestId('pagination-rows-per-page-select-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Rows')
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('pagination-rows-per-page-select')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('input')

    expect(input).toBeInTheDocument()
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(pageSize)).toBeInTheDocument()

    const error = screen.queryByTestId('pagination-rows-per-page-select-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')

    const rangeOfShownItems = screen.queryByTestId('pagination-range-of-shown-items')!

    expect(rangeOfShownItems).toBeInTheDocument()
    expect(rangeOfShownItems).toHaveTextContent('1 – 5 of 10000')

    const nextPageButton = screen.queryByTestId('pagination-buttons-next-page')!

    expect(nextPageButton).toBeInTheDocument()
    expect(nextPageButton).toHaveClass(styles.iconButton)
    expect(nextPageButton).toHaveAttribute('aria-label', 'Next page')

    expect(screen.queryByTestId('pagination-buttons-previous-page')).not.toBeInTheDocument()

    const buttons = screen.getAllByTestId('pagination-buttons-go-to-page')
    expect(buttons).toHaveLength(6)

    expect(buttons[0]).toHaveClass(`${styles.button} ${styles.selected}`)
    expect(buttons[0]).toHaveTextContent('1')
    expect(buttons[0]).toHaveAttribute('type', 'button')

    expect(buttons[1]).toHaveClass(styles.button)
    expect(buttons[1]).toHaveTextContent('2')
    expect(buttons[1]).toHaveAttribute('type', 'button')

    expect(buttons[2]).toHaveClass(styles.button)
    expect(buttons[2]).toHaveTextContent('3')
    expect(buttons[2]).toHaveAttribute('type', 'button')

    expect(buttons[3]).toHaveClass(styles.button)
    expect(buttons[3]).toHaveTextContent('4')
    expect(buttons[3]).toHaveAttribute('type', 'button')

    expect(buttons[4]).toHaveClass(styles.button)
    expect(buttons[4]).toHaveTextContent('5')
    expect(buttons[4]).toHaveAttribute('type', 'button')

    expect(buttons[5]).toHaveClass(styles.button)
    expect(buttons[5]).toHaveTextContent('2000')
    expect(buttons[5]).toHaveAttribute('type', 'button')

    const numberField = screen.queryByTestId('pagination-jump-from-input-field')!

    expect(numberField).toBeInTheDocument()

    const numberFieldInput = numberField.querySelector('input')

    expect(numberFieldInput).toBeInTheDocument()
    expect(numberFieldInput).toHaveAttribute('value', '1')
    expect(numberFieldInput).toHaveAttribute('type', 'number')
    expect(numberFieldInput).toHaveAttribute('aria-label', 'Go to page')
    expect(numberFieldInput).not.toHaveAttribute('placeholder')
  })

  it('renders correct buttons when current page is somewhere in the middle', () => {
    currentPage = 1000
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    render(
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

    const rangeOfShownItems = screen.queryByTestId('pagination-range-of-shown-items')!

    expect(rangeOfShownItems).toBeInTheDocument()
    expect(rangeOfShownItems).toHaveTextContent('4996 – 5000 of 10000')

    const nextPageButton = screen.getByTestId('pagination-buttons-next-page')!

    expect(nextPageButton).toBeInTheDocument()
    expect(nextPageButton).toHaveClass(styles.iconButton)
    expect(nextPageButton).toHaveAttribute('aria-label', 'Next page')

    const prevPageButton = screen.queryByTestId('pagination-buttons-previous-page')!

    expect(prevPageButton).toBeInTheDocument()
    expect(prevPageButton).toHaveClass(styles.iconButton)
    expect(prevPageButton).toHaveAttribute('aria-label', 'Previous page')

    const buttons = screen.getAllByTestId('pagination-buttons-go-to-page')
    expect(buttons).toHaveLength(5)

    expect(buttons[0]).toHaveClass(styles.button)
    expect(buttons[0]).toHaveTextContent('1')
    expect(buttons[0]).toHaveAttribute('type', 'button')

    expect(buttons[1]).toHaveClass(styles.button)
    expect(buttons[1]).toHaveTextContent('999')
    expect(buttons[1]).toHaveAttribute('type', 'button')

    expect(buttons[2]).toHaveClass(`${styles.button} ${styles.selected}`)
    expect(buttons[2]).toHaveTextContent('1000')
    expect(buttons[2]).toHaveAttribute('type', 'button')

    expect(buttons[3]).toHaveClass(styles.button)
    expect(buttons[3]).toHaveTextContent('1001')
    expect(buttons[3]).toHaveAttribute('type', 'button')

    expect(buttons[4]).toHaveClass(styles.button)
    expect(buttons[4]).toHaveTextContent('2000')
    expect(buttons[4]).toHaveAttribute('type', 'button')
  })

  it('renders correct buttons when current page is the last page', () => {
    currentPage = pageCount
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    render(
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

    const rangeOfShownItems = screen.queryByTestId('pagination-range-of-shown-items')!

    expect(rangeOfShownItems).toBeInTheDocument()
    expect(rangeOfShownItems).toHaveTextContent('9996 – 10000 of 10000')

    expect(screen.queryByTestId('pagination-buttons-next-page')).not.toBeInTheDocument()

    const prevPageButton = screen.getByTestId('pagination-buttons-previous-page')!

    expect(prevPageButton).toBeInTheDocument()
    expect(prevPageButton).toHaveClass(styles.iconButton)
    expect(prevPageButton).toHaveAttribute('aria-label', 'Previous page')

    const buttons = screen.getAllByTestId('pagination-buttons-go-to-page')
    expect(buttons).toHaveLength(6)

    expect(buttons[0]).toHaveClass(styles.button)
    expect(buttons[0]).toHaveTextContent('1')
    expect(buttons[0]).toHaveAttribute('type', 'button')

    expect(buttons[1]).toHaveClass(styles.button)
    expect(buttons[1]).toHaveTextContent('1996')
    expect(buttons[1]).toHaveAttribute('type', 'button')

    expect(buttons[2]).toHaveClass(styles.button)
    expect(buttons[2]).toHaveTextContent('1997')
    expect(buttons[2]).toHaveAttribute('type', 'button')

    expect(buttons[3]).toHaveClass(styles.button)
    expect(buttons[3]).toHaveTextContent('1998')
    expect(buttons[3]).toHaveAttribute('type', 'button')

    expect(buttons[4]).toHaveClass(styles.button)
    expect(buttons[4]).toHaveTextContent('1999')
    expect(buttons[4]).toHaveAttribute('type', 'button')

    expect(buttons[5]).toHaveClass(`${styles.button} ${styles.selected}`)
    expect(buttons[5]).toHaveTextContent('2000')
    expect(buttons[5]).toHaveAttribute('type', 'button')
  })

  it('changes pages correctly', async () => {
    currentPage = 10
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    render(
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

    const prevPageButton = screen.getByTestId('pagination-buttons-previous-page')
    const nextvPageButton = screen.getByTestId('pagination-buttons-next-page')
    const buttons = screen.getAllByTestId('pagination-buttons-go-to-page')
    expect(previousPage).toHaveBeenCalledTimes(0)
    expect(nextPage).toHaveBeenCalledTimes(0)
    expect(goToPage).toHaveBeenCalledTimes(0)

    // Let's click on `Previous` button
    await act(() => userEvent.click(prevPageButton))
    expect(previousPage).toHaveBeenCalledTimes(1)
    // Let's click on `Next` button
    await act(() => userEvent.click(nextvPageButton))
    expect(nextPage).toHaveBeenCalledTimes(1)

    // Let's click on page buttons
    await act(() => userEvent.click(buttons[0]))
    expect(goToPage).toHaveBeenCalledTimes(1)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(1)

    await act(() => userEvent.click(buttons[1]))
    expect(goToPage).toHaveBeenCalledTimes(2)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(9)

    await act(() => userEvent.click(buttons[2]))
    expect(goToPage).toHaveBeenCalledTimes(3)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(10)

    await act(() => userEvent.click(buttons[3]))
    expect(goToPage).toHaveBeenCalledTimes(4)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(11)

    await act(() => userEvent.click(buttons[4]))
    expect(goToPage).toHaveBeenCalledTimes(5)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(2000)

    expect(previousPage).toHaveBeenCalledTimes(1)
    expect(nextPage).toHaveBeenCalledTimes(1)
  })

  it('jumps page correctly', async () => {
    currentPage = 10
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    render(
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

    await act(async () => {
      fireEvent.change(screen.getByTestId('pagination-jump-from-input-field').querySelector('input')!, { target: { value: '42' } })
    })

    // We need the `async` call here to wait for processing of the asynchronous 'submit'

    await act(() => userEvent.click(screen.getByTestId('pagination-jump-from-button')))

    expect(goToPage).toHaveBeenCalledTimes(1)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(42)
  })

  it('changes number of rows correctly', async () => {
    currentPage = 10
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    const { container } = render(
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

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await act(() => userEvent.click(screen.getByRole('option', { name: '10' })))

    expect(setPageSize).toHaveBeenCalledTimes(1)
    expect(setPageSize).toHaveBeenCalledWith(10)
  })

  it('renders small version of pagination', async () => {
    currentPage = 1
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount

    render(
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

    let nextPageButton = screen.queryByTestId('pagination-buttons-next-page')!

    expect(nextPageButton).toBeInTheDocument()
    expect(nextPageButton).toHaveClass(styles.iconButton)
    expect(nextPageButton).toHaveAttribute('aria-label', 'Next page')

    let buttons = screen.queryAllByTestId('pagination-buttons-go-to-page')
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveClass(`${styles.button} ${styles.selected}`)
    expect(buttons[0]).toHaveTextContent('1')
    expect(buttons[0]).toHaveAttribute('type', 'button')

    expect(buttons[1]).toHaveClass(styles.button)
    expect(buttons[1]).toHaveTextContent('2')
    expect(buttons[1]).toHaveAttribute('type', 'button')

    expect(buttons[2]).toHaveClass(styles.button)
    expect(buttons[2]).toHaveTextContent('2000')
    expect(buttons[2]).toHaveAttribute('type', 'button')

    expect(screen.queryByTestId('pagination-range-of-shown-items')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pagination-rows-per-page-select')).not.toBeInTheDocument()

    // Show more options
    await act(() => userEvent.click(screen.getByTestId('pagination-controls-toggle')))

    expect(screen.queryByTestId('pagination-buttons')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pagination-buttons-next-page')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pagination-range-of-shown-items')).not.toBeInTheDocument()

    const select = screen.queryByTestId('pagination-rows-per-page-select')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('input')

    expect(input).toBeInTheDocument()
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(pageSize)).toBeInTheDocument()

    const error = screen.queryByTestId('pagination-rows-per-page-select-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')

    const numberField = screen.queryByTestId('pagination-jump-from-input-field')!

    expect(numberField).toBeInTheDocument()

    const numberFieldInput = numberField.querySelector('input')

    expect(numberFieldInput).toBeInTheDocument()
    expect(numberFieldInput).toHaveAttribute('value', '1')
    expect(numberFieldInput).toHaveAttribute('type', 'number')
    expect(numberFieldInput).toHaveAttribute('aria-label', 'Go to page')
    expect(numberFieldInput).not.toHaveAttribute('placeholder')

    // Back to pagination buttons
    await act(() => userEvent.click(screen.getByTestId('pagination-controls-toggle')))

    nextPageButton = screen.queryByTestId('pagination-buttons-next-page')!

    expect(nextPageButton).toBeInTheDocument()
    expect(nextPageButton).toHaveClass(styles.iconButton)
    expect(nextPageButton).toHaveAttribute('aria-label', 'Next page')

    buttons = screen.queryAllByTestId('pagination-buttons-go-to-page')
    expect(buttons).toHaveLength(3)
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveClass(`${styles.button} ${styles.selected}`)
    expect(buttons[0]).toHaveTextContent('1')
    expect(buttons[0]).toHaveAttribute('type', 'button')

    expect(buttons[1]).toHaveClass(styles.button)
    expect(buttons[1]).toHaveTextContent('2')
    expect(buttons[1]).toHaveAttribute('type', 'button')

    expect(buttons[2]).toHaveClass(styles.button)
    expect(buttons[2]).toHaveTextContent('2000')
    expect(buttons[2]).toHaveAttribute('type', 'button')

    expect(screen.queryByTestId('pagination-range-of-shown-items')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pagination-rows-per-page-select')).not.toBeInTheDocument()
  })
})
