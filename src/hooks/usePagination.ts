import { useMemo } from 'react'
import { range } from '../../src'

export type PaginationItem = number | 'previous' | 'next' | 'ellipsis'

export type UsePaginationProps = {
  pageCount: number
  currentPage: number
  small?: boolean
}

export const getZeroSiblingCountItems = (pageCount: number, currentPage: number): PaginationItem[] => {
  // If there are 3 or less pages we just show them all
  if (pageCount <= 3) {
    return range(1, pageCount)
    // If the current page is near the start
  } else if (currentPage <= 2) {
    return [1, 2, 'ellipsis', pageCount]
    // If the current page is near the end
  } else if (currentPage >= pageCount - 1) {
    return [1, 'ellipsis', pageCount - 1, pageCount]
    // If the current page is somewhere in the middle
  } else {
    return [1, 'ellipsis', currentPage, 'ellipsis', pageCount]
  }
}

export const usePagination = ({ pageCount, currentPage, small = false }: UsePaginationProps) => {
  const currentPageCount = 1
  const boundaryCount = 1
  const siblingCount = 1
  const ellipsis = 2

  const items: PaginationItem[] = useMemo(() => {
    /**
     * Setting maximum number of visible blocks between previous and next buttons:
     * currentPageCount for current page
     * boundaryCount * 2 for first and last page
     * siblingCount * 2 for left and right siblings of current page
     * ellipsis for not shown pages
     */
    const maxVisibleBlocks = currentPageCount + boundaryCount * 2 + siblingCount * 2 + ellipsis

    let paginationItems: PaginationItem[] = []

    // Separate function to handle small pagination
    if (small) {
      paginationItems = getZeroSiblingCountItems(pageCount, currentPage)
    }
    // If page count is equal to or less than maxVisibleBlocks we just show all pages
    else if (pageCount <= maxVisibleBlocks) {
      paginationItems = range(1, pageCount)
    } else {
      const visibleMiddle = Math.ceil(maxVisibleBlocks / 2)
      // If the current page is near the start then show all start blocks without ellipsis
      if (currentPage <= visibleMiddle) {
        paginationItems = [...range(1, visibleMiddle + 1), 'ellipsis', pageCount]
        // If the current page is near the end then show all end blocks without ellipsis
      } else if (currentPage >= pageCount - visibleMiddle + 1) {
        paginationItems = [1, 'ellipsis', ...range(pageCount - visibleMiddle, pageCount)]
        // If the current page is somewhere in the middle then show ellipsis at both sides
      } else {
        paginationItems = [1, 'ellipsis', ...range(currentPage - siblingCount, currentPage + siblingCount), 'ellipsis', pageCount]
      }
    }

    return ['previous', ...paginationItems, 'next']
  }, [pageCount, currentPage, small])

  return items
}
