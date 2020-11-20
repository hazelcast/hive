import React, { FC, useCallback } from 'react'
import { Form, Formik } from 'formik'
import { ChevronLeft, ChevronRight } from 'react-feather'

import { usePagination } from './hooks/usePagination'
import { Button } from './Button'
import { NumberFieldFormik } from './NumberFieldFormik'
import styles from './Pagination.module.scss'

type PageJumpFormValues = {
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
}) => {
  const pages = usePagination({ pageCount, currentPage })

  const submitPageJump = useCallback(
    (values: PageJumpFormValues) => {
      console.log(values)
      goToPage(values.page)
    },
    [goToPage],
  )

  const lastShownItemNumber = currentPage * pageSize
  const firstShownItemNumber = lastShownItemNumber - pageSize + 1

  return (
    <div className={styles.container}>
      <div>
        Rows per page
        <select
          value={pageSize}
          onBlur={(e) => {
            if (Number(e.target.value) !== pageSize) {
              setPageSize(Number(e.target.value))
            }
          }}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div>{`${firstShownItemNumber} - ${lastShownItemNumber} of ${numberOfItems}`}</div>

      <div className={styles.buttons}>
        {pages.map((page) => {
          if (page === 'previous') {
            return (
              <Button
                type="button"
                kind="secondary"
                iconLeft={ChevronLeft}
                iconLeftAriaLabel="Previous page"
                onClick={previousPage}
                disabled={!canPreviousPage}
                disabledTooltip="No previous page"
              >
                Previous
              </Button>
            )
          }
          if (page === 'next') {
            return (
              <Button
                type="button"
                kind="secondary"
                iconRight={ChevronRight}
                iconRightAriaLabel="Next page"
                onClick={nextPage}
                disabled={!canNextPage}
                disabledTooltip="No next page"
              >
                Next
              </Button>
            )
          }
          if (page === 'ellipsis') {
            return <span>&#8208;</span>
          }

          return (
            <Button
              key={page}
              className={styles.numberButton}
              bodyClassName={styles.numberButtonBody}
              type="button"
              kind="secondary"
              onClick={() => {
                goToPage(page)
              }}
            >
              {page.toString()}
            </Button>
          )
        })}
      </div>

      <div className={styles.pageJump}>
        <Formik<PageJumpFormValues>
          initialValues={{
            page: currentPage,
          }}
          enableReinitialize
          onSubmit={submitPageJump}
        >
          <Form>
            <NumberFieldFormik<PageJumpFormValues> name="page" placeholder="Page" label="Go to" min={1} max={pageCount} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}
