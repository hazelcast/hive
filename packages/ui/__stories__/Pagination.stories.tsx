import React, { useState } from 'react'

import { Pagination } from '../src/Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
}

export const Default = () => {
  const numberOfItems = 100
  const [pageSize, setPageSize] = useState<number>(5)
  const pageSizeOptions = [5, 10]

  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageCount = Math.ceil(numberOfItems / pageSize)
  const canPreviousPage = currentPage !== 1
  const canNextPage = currentPage !== pageCount
  const previousPage = () => {
    setCurrentPage((prevState) => prevState - 1)
  }
  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1)
  }

  return (
    <Pagination
      pageCount={pageCount}
      currentPage={currentPage}
      canPreviousPage={canPreviousPage}
      canNextPage={canNextPage}
      goToPage={setCurrentPage}
      nextPage={nextPage}
      previousPage={previousPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      pageSizeOptions={pageSizeOptions}
      numberOfItems={numberOfItems}
    />
  )
}
