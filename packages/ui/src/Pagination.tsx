import React, { FC, useCallback } from 'react'
import { Form, Formik } from 'formik'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useUID } from 'react-uid'
import cn from 'classnames'

import { usePagination } from './hooks/usePagination'
import { Button } from './Button'
import { NumberFieldFormik } from './NumberFieldFormik'
import { Label } from './Label'

import styles from './Pagination.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

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
  showPageJump = true,
  showRowsSelect = true,
}) => {
  const pages = usePagination({ pageCount, currentPage })

  const submitPageJump = useCallback(
    ({ page }: PageJumpFormValues) => {
      goToPage(page)
    },
    [goToPage],
  )

  const id = useUID()

  const lastShownItemNumber = currentPage * pageSize
  const firstShownItemNumber = lastShownItemNumber - pageSize + 1

  return (
    <div className={styles.container}>
      {showRowsSelect && (
        <div className={styles.rows}>
          <Label id={id} label="Rows per page" />
          <select
            id={id}
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
      )}

      <span className={styles.shownItems}>{`${firstShownItemNumber} - ${lastShownItemNumber} of ${numberOfItems}`}</span>

      <div className={styles.buttons}>
        {pages.map((page) => {
          if (page === 'previous') {
            return canPreviousPage ? (
              <Button
                key="previous"
                type="button"
                kind="transparent"
                className={styles.button}
                bodyClassName={styles.body}
                outlineClassName={styles.outline}
                capitalize={false}
                iconLeft={ChevronLeft}
                iconLeftColor={canPreviousPage ? styleConsts.colorPrimary : undefined}
                iconLeftAriaLabel="Previous page"
                onClick={previousPage}
              >
                Previous
              </Button>
            ) : null
          }
          if (page === 'next') {
            return canNextPage ? (
              <Button
                key="next"
                type="button"
                kind="transparent"
                className={styles.button}
                bodyClassName={styles.body}
                outlineClassName={styles.outline}
                capitalize={false}
                iconRight={ChevronRight}
                iconRightColor={canNextPage ? styleConsts.colorPrimary : undefined}
                iconRightAriaLabel="Next page"
                onClick={nextPage}
              >
                Next
              </Button>
            ) : null
          }
          if (page === 'ellipsis') {
            return <span key="ellipsis">&#8208;</span>
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

      {showPageJump && (
        <Formik<PageJumpFormValues>
          initialValues={{
            page: currentPage,
          }}
          enableReinitialize
          onSubmit={submitPageJump}
        >
          <Form>
            <NumberFieldFormik<PageJumpFormValues>
              name="page"
              placeholder="Page"
              label="Go to"
              min={1}
              max={pageCount}
              className={styles.pageJump}
            />
          </Form>
        </Formik>
      )}
    </div>
  )
}
