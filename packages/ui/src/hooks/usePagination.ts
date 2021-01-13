import { useMemo } from 'react'
import { range } from '@hazelcast/helpers'

export type PaginationItem = number | 'previous' | 'next' | 'ellipsis'

export type UsePaginationProps = {
  pageCount: number
  currentPage: number
  siblingCount?: number
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

export const usePagination = ({ pageCount, currentPage, siblingCount = 1 }: UsePaginationProps) => {
  if (siblingCount < 0) {
    siblingCount = 1
  }

  const ellipsis = 2
  // If a need arises boundaryCount can be parametrized in the future
  const boundaryCount = 2

  const items: PaginationItem[] = useMemo(() => {
    /**
     * Setting maximum number of visible blocks between previous and next buttons:
     * 1 for current page
     * boundaryCount for first and last page
     * siblingCount * 2 for left and right siblings of current page
     * ellipsis for not shown pages
     */
    const maxVisibleBlocks = 1 + boundaryCount + siblingCount * 2 + ellipsis

    let paginationItems: PaginationItem[] = []

    // Zero-based sibling count pagination is a bit specific so we have separate function to handle it
    if (siblingCount === 0) {
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
        paginationItems = [
          1,
          'ellipsis',
          ...(siblingCount === 0 ? [currentPage] : range(currentPage - siblingCount, currentPage + siblingCount)),
          'ellipsis',
          pageCount,
        ]
      }
    }

    return ['previous', ...paginationItems, 'next']
  }, [pageCount, currentPage, siblingCount])

  return items
}
