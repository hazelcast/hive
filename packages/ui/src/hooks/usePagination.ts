import { range } from '@hazelcast/helpers'

export type PaginationItem = number | 'previous' | 'next' | 'ellipsis'

export type UsePaginationProps = {
  count: number
  page: number
}

export const usePagination = ({ count, page }: UsePaginationProps) => {
  const boundaryCount = 2
  const ellipsis = 2
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

  // If count is equalt to or less than maxVisibleBlocks we just show all pages
  if (count <= maxVisibleBlocks) {
    items = ['previous', ...range(1, count), 'next']
  } else {
    const visibleMiddle = Math.ceil(maxVisibleBlocks / 2)
    // If the current page is near the start then show all start blocks without ellipsis
    if (page <= visibleMiddle) {
      items = ['previous', ...range(1, visibleMiddle + 1), 'ellipsis', count, 'next']
      // If the current page is near the end then show all end blocks without ellipsis
    } else if (page >= count - visibleMiddle + 1) {
      items = ['previous', 1, 'ellipsis', ...range(count - visibleMiddle, count), 'next']
      // If the current page is somewhere in the middle then show ellipsis at both sides
    } else {
      items = ['previous', 1, 'ellipsis', ...range(page - siblingCount, page + siblingCount), 'ellipsis', count, 'next']
    }
  }

  return { items }
}
