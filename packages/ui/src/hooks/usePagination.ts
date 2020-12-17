import { range } from '@hazelcast/helpers'

export type PaginationItem = number | 'previous' | 'next' | 'ellipsis'

export type UsePaginationProps = {
  pageCount: number
  currentPage: number
}

export const usePagination = ({ pageCount, currentPage }: UsePaginationProps) => {
  const ellipsis = 2
  // If a need arises boundaryCount and siblingCount can be parametrized in the future
  const boundaryCount = 2
  const siblingCount = 1
  /**
   * Setting maximum number of visible blocks between previous and next buttons:
   * 1 for current page
   * boundaryCount for first and last page
   * siblingCount * 2 for left and right siblings of current page
   * ellipsis for not shown pages
   */
  const maxVisibleBlocks = 1 + boundaryCount + siblingCount * 2 + ellipsis

  let items: PaginationItem[] = []

  // If page count is equalt to or less than maxVisibleBlocks we just show all pages
  if (pageCount <= maxVisibleBlocks) {
    items = ['previous', ...range(1, pageCount), 'next']
  } else {
    const visibleMiddle = Math.ceil(maxVisibleBlocks / 2)
    // If the current page is near the start then show all start blocks without ellipsis
    if (currentPage <= visibleMiddle) {
      items = ['previous', ...range(1, visibleMiddle + 1), 'ellipsis', pageCount, 'next']
      // If the current page is near the end then show all end blocks without ellipsis
    } else if (currentPage >= pageCount - visibleMiddle + 1) {
      items = ['previous', 1, 'ellipsis', ...range(pageCount - visibleMiddle, pageCount), 'next']
      // If the current page is somewhere in the middle then show ellipsis at both sides
    } else {
      items = ['previous', 1, 'ellipsis', ...range(currentPage - siblingCount, currentPage + siblingCount), 'ellipsis', pageCount, 'next']
    }
  }

  return items
}
