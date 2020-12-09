import React, { FC, useCallback } from 'react'
import { Form, Formik } from 'formik'
import { ChevronLeft, ChevronRight } from 'react-feather'
import cn from 'classnames'

import { usePagination } from './hooks/usePagination'
import { SelectField, SelectFieldOption } from './SelectField'
import { Button } from './Button'
import { NumberFieldFormik } from './NumberFieldFormik'

import styles from './Pagination.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

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

  const lastShownItemNumber = currentPage * pageSize
  const firstShownItemNumber = lastShownItemNumber - pageSize + 1

  const options: SelectFieldOption<number>[] = pageSizeOptions.map((opt) => ({ value: opt, label: opt.toString() }))
  const value: SelectFieldOption<number> = { value: pageSize, label: pageSize.toString() }
  const onPageSizeChange = useCallback(
    (newValue: SelectFieldOption<number>) => {
      setPageSize(newValue.value)
    },
    [setPageSize],
  )

  return (
    <div className={styles.container}>
      {showRowsSelect && (
        <SelectField
          className={styles.rowsPerPage}
          name="rowsPerPage"
          value={value}
          label="Rows per page"
          options={options}
          onChange={onPageSizeChange}
        />
      )}

      <span
        data-test="pagination-range-of-shown-items"
        className={styles.shownItems}
      >{`${firstShownItemNumber} - ${lastShownItemNumber} of ${numberOfItems}`}</span>

      <div className={styles.buttons}>
        {pages.map((page, i) => {
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
                iconLeftColor={styleConsts.colorPrimary}
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
                iconRightColor={styleConsts.colorPrimary}
                iconRightAriaLabel="Next page"
                onClick={nextPage}
              >
                Next
              </Button>
            ) : null
          }
          if (page === 'ellipsis') {
            return <span key={`ellipsis-${i}`}>&#8208;</span>
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
            <NumberFieldFormik<PageJumpFormValues> className={styles.pageJump} name="page" label="Go to" min={1} max={pageCount} />
          </Form>
        </Formik>
      )}
    </div>
  )
}
