import React, { FC, useCallback, useMemo } from 'react'
import { useDeepCompareMemo } from 'use-deep-compare'
import { Form, Formik } from 'formik'
import { ChevronLeft, ChevronRight } from 'react-feather'
import cn from 'classnames'

import { usePagination } from './hooks/usePagination'
import { SelectField, SelectFieldOption } from './SelectField'
import { Button } from './Button'
import { NumberFieldFormik } from './NumberFieldFormik'
import { IconButton } from './IconButton'

import styles from './Pagination.module.scss'

export type GetShownItemsRangeParams = {
  currentPage: number
  pageSize: number
  numberOfItems: number
}

export type ShownItemsRange = {
  firstItemShown: number
  lastItemShown: number
}

export const getShownItemsRange = ({ currentPage, pageSize, numberOfItems }: GetShownItemsRangeParams): ShownItemsRange => {
  /**
   * Example for quick understanding: let's assume currentPage = 2, pageSize = 10, numberOfItems = 54, then
   * firstItemShown = (2 * 10) - 10 + 1 = 20 - 9 = 11,
   * lastItemShown = 11 + 10 - 1 = 20,
   * resulting range of items is 11–20.
   *
   * Let's assume the page was changed to the last one, now we have currentPage = 6, pageSize = 10, numberOfItems = 54, then
   * firstItemShown = (6 * 10) - 10 + 1 = 60 - 9 = 51,
   * we're on the last page, we can safely assume the numberOfItems is what we're looking for: lastItemShown = 54,
   * resulting range of items is 51–54.
   */
  const isLastPage = currentPage * pageSize > numberOfItems

  const firstItemShown = currentPage * pageSize - pageSize + 1
  const lastItemShown = isLastPage ? numberOfItems : firstItemShown + pageSize - 1

  return {
    firstItemShown,
    lastItemShown,
  }
}

export type PageJumpFormValues = {
  page: number
}

export type PaginationProps = {
  pageCount: number
  currentPage: number
  canPreviousPage: boolean
  canNextPage: boolean
  goToPage: (page: number) => void
  nextPage: () => void
  previousPage: () => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  pageSizeOptions: number[]
  numberOfItems: number
  siblingCount?: number
  showRangeOfShownItems?: boolean
  showPageJump?: boolean
  showRowsSelect?: boolean
}

export const Pagination: FC<PaginationProps> = ({
  pageCount,
  currentPage,
  canPreviousPage,
  canNextPage,
  goToPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
  pageSizeOptions,
  numberOfItems,
  siblingCount,
  showRangeOfShownItems = true,
  showPageJump = true,
  showRowsSelect = true,
}) => {
  const pages = usePagination({ pageCount, currentPage, siblingCount })
  const { firstItemShown, lastItemShown } = useMemo(
    () =>
      getShownItemsRange({
        currentPage,
        pageSize,
        numberOfItems,
      }),
    [currentPage, pageSize, numberOfItems],
  )

  const rowsPerPageOptions: SelectFieldOption<number>[] = useDeepCompareMemo(
    () => pageSizeOptions.map((opt) => ({ value: opt, label: opt.toString() })),
    [pageSizeOptions],
  )
  const rowsPerPageValue: SelectFieldOption<number> = useMemo(() => ({ value: pageSize, label: pageSize.toString() }), [pageSize])

  const onPageSizeChange = useCallback(
    (option: SelectFieldOption<number>) => {
      setPageSize(option.value)
    },
    [setPageSize],
  )

  const submitPageJump = useCallback(
    ({ page }: PageJumpFormValues) => {
      goToPage(page)
    },
    [goToPage],
  )

  return (
    <div className={styles.container}>
      {showRowsSelect && (
        <SelectField
          className={styles.rowsPerPage}
          labelClassName={styles.label}
          name="rowsPerPage"
          value={rowsPerPageValue}
          label="Rows per page"
          options={rowsPerPageOptions}
          onChange={onPageSizeChange}
        />
      )}

      {showRangeOfShownItems && (
        <span
          data-test="pagination-range-of-shown-items"
          className={styles.shownItems}
        >{`${firstItemShown} – ${lastItemShown} of ${numberOfItems}`}</span>
      )}

      {pageCount > 1 && (
        <div className={styles.buttons}>
          {pages.map((page, i) => {
            if (page === 'previous') {
              return canPreviousPage ? (
                <IconButton
                  key="previous"
                  kind="primary"
                  icon={ChevronLeft}
                  ariaLabel="Previous page"
                  className={styles.iconButton}
                  outlineClassName={styles.outline}
                  onClick={previousPage}
                />
              ) : null
            }
            if (page === 'next') {
              return canNextPage ? (
                <IconButton
                  key="next"
                  kind="primary"
                  icon={ChevronRight}
                  ariaLabel="Next page"
                  className={styles.iconButton}
                  outlineClassName={styles.outline}
                  onClick={nextPage}
                />
              ) : null
            }
            if (page === 'ellipsis') {
              return <span key={`ellipsis-${i}`}>&ndash;</span>
            }

            return (
              <Button
                key={page}
                type="button"
                kind="transparent"
                className={cn(styles.button, {
                  [styles.selected]: page === currentPage,
                })}
                bodyClassName={styles.body}
                outlineClassName={styles.outline}
                capitalize={false}
                onClick={() => {
                  goToPage(page)
                }}
              >
                {page.toString()}
              </Button>
            )
          })}
        </div>
      )}

      {showPageJump && pageCount > 1 && (
        <Formik<PageJumpFormValues>
          initialValues={{
            page: currentPage,
          }}
          enableReinitialize
          onSubmit={submitPageJump}
        >
          <Form>
            <NumberFieldFormik<PageJumpFormValues>
              className={styles.pageJump}
              labelClassName={styles.label}
              inputClassName={styles.input}
              name="page"
              label="Go to"
              min={1}
              max={pageCount}
            />
          </Form>
        </Formik>
      )}
    </div>
  )
}
