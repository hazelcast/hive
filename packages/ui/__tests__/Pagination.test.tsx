import React from 'react'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Formik, FormikConfig } from 'formik'
import Select from 'react-select'

import { PageJumpFormValues, Pagination, PaginationProps } from '../src/Pagination'
import { SelectField, SelectFieldOption, SelectProps } from '../src/SelectField'
import { Button, ButtonProps } from '../src/Button'
import { NumberFieldFormik, NumberFieldFormikProps } from '../src/NumberFieldFormik'

import styles from '../src/Pagination.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

const numberOfItems = 10000
const pageSize = 5
const setPageSize = jest.fn() as PaginationProps['setPageSize']
const pageSizeOptions = [5, 10]
const pageCount = Math.ceil(numberOfItems / pageSize)
const goToPage = jest.fn() as PaginationProps['goToPage']
const previousPage = jest.fn() as PaginationProps['previousPage']
const nextPage = jest.fn() as PaginationProps['nextPage']
let showPageJump = true
let showRowsSelect = true
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

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    showPageJump = true
    showRowsSelect = true
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
        showPageJump={showPageJump}
        showRowsSelect={showRowsSelect}
      />,
    )

    expect(wrapper.find(SelectField).props()).toEqual<SelectProps<number>>({
      className: styles.rowsPerPage,
      name: 'rowsPerPage',
      value: { value: pageSize, label: pageSize.toString() },
      label: 'Rows per page',
      options: pageSizeOptions.map((opt) => ({ value: opt, label: opt.toString() })),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
    })

    expect(wrapper.findDataTest('pagination-range-of-shown-items').props()).toEqual({
      'data-test': 'pagination-range-of-shown-items',
      className: styles.shownItems,
      children: '1 - 5 of 10000',
    })

    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(7)
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
    expect(buttons.at(6).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      iconRight: ChevronRight,
      iconRightColor: styleConsts.colorPrimary,
      iconRightAriaLabel: 'Next page',
      children: 'Next',
    })

    const formik = wrapper.find(Formik)
    expect(formik.props()).toEqual<FormikConfig<PageJumpFormValues>>({
      initialValues: {
        page: currentPage,
      },
      enableReinitialize: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onSubmit: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
    })
    expect(formik.find(NumberFieldFormik).props()).toEqual<NumberFieldFormikProps<PageJumpFormValues>>({
      className: styles.pageJump,
      name: 'page',
      label: 'Go to',
      min: 1,
      max: pageCount,
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
        showPageJump={showPageJump}
        showRowsSelect={showRowsSelect}
      />,
    )

    expect(wrapper.findDataTest('pagination-range-of-shown-items').props()).toEqual({
      'data-test': 'pagination-range-of-shown-items',
      className: styles.shownItems,
      children: '4996 - 5000 of 10000',
    })

    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(7)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      iconLeft: ChevronLeft,
      iconLeftColor: styleConsts.colorPrimary,
      iconLeftAriaLabel: 'Previous page',
      children: 'Previous',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '999',
    })
    expect(buttons.at(3).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '1000',
    })
    expect(buttons.at(4).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1001',
    })
    expect(buttons.at(5).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2000',
    })
    expect(buttons.at(6).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      iconRight: ChevronRight,
      iconRightColor: styleConsts.colorPrimary,
      iconRightAriaLabel: 'Next page',
      children: 'Next',
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
        showPageJump={showPageJump}
        showRowsSelect={showRowsSelect}
      />,
    )

    expect(wrapper.findDataTest('pagination-range-of-shown-items').props()).toEqual({
      'data-test': 'pagination-range-of-shown-items',
      className: styles.shownItems,
      children: '9996 - 10000 of 10000',
    })

    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(7)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      iconLeft: ChevronLeft,
      iconLeftColor: styleConsts.colorPrimary,
      iconLeftAriaLabel: 'Previous page',
      children: 'Previous',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1996',
    })
    expect(buttons.at(3).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1997',
    })
    expect(buttons.at(4).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1998',
    })
    expect(buttons.at(5).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1999',
    })
    expect(buttons.at(6).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '2000',
    })
  })

  it('renders only buttons', async () => {
    currentPage = 1000
    canPreviousPage = currentPage !== 1
    canNextPage = currentPage !== pageCount
    showPageJump = false
    showRowsSelect = false

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
        showPageJump={showPageJump}
        showRowsSelect={showRowsSelect}
      />,
    )

    expect(wrapper.find(SelectField).exists()).toBe(false)
    expect(wrapper.find(Formik).exists()).toBe(false)

    expect(wrapper.findDataTest('pagination-range-of-shown-items').props()).toEqual({
      'data-test': 'pagination-range-of-shown-items',
      className: styles.shownItems,
      children: '4996 - 5000 of 10000',
    })

    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(7)
    expect(buttons.at(0).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      iconLeft: ChevronLeft,
      iconLeftColor: styleConsts.colorPrimary,
      iconLeftAriaLabel: 'Previous page',
      children: 'Previous',
    })
    expect(buttons.at(1).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1',
    })
    expect(buttons.at(2).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '999',
    })
    expect(buttons.at(3).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      className: `${styles.button} ${styles.selected}`,
      children: '1000',
    })
    expect(buttons.at(4).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '1001',
    })
    expect(buttons.at(5).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      children: '2000',
    })
    expect(buttons.at(6).props()).toEqual<ButtonProps>({
      ...buttonPropsBase,
      iconRight: ChevronRight,
      iconRightColor: styleConsts.colorPrimary,
      iconRightAriaLabel: 'Next page',
      children: 'Next',
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
        showPageJump={showPageJump}
        showRowsSelect={showRowsSelect}
      />,
    )

    const buttons = wrapper.find(Button)
    expect(previousPage).toHaveBeenCalledTimes(0)
    expect(nextPage).toHaveBeenCalledTimes(0)
    expect(goToPage).toHaveBeenCalledTimes(0)

    // Let's click on `Previous` button
    buttons.at(0).simulate('click')
    expect(previousPage).toHaveBeenCalledTimes(1)
    // Let's click on `Next` button
    buttons.at(6).simulate('click')
    expect(nextPage).toHaveBeenCalledTimes(1)

    // Let's click on page buttons
    buttons.at(1).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(1)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(1)
    buttons.at(2).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(2)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(9)
    buttons.at(3).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(3)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(10)
    buttons.at(4).simulate('click')
    expect(goToPage).toHaveBeenCalledTimes(4)
    expect(goToPage).toHaveBeenCalledWith<Parameters<typeof goToPage>>(11)
    buttons.at(5).simulate('click')
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
        showPageJump={showPageJump}
        showRowsSelect={showRowsSelect}
      />,
    )

    expect(goToPage).toHaveBeenCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find(NumberFieldFormik).find('input'), 42)
    })
    wrapper.update()

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find(Formik).simulate('submit')
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
        showPageJump={showPageJump}
        showRowsSelect={showRowsSelect}
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
})
