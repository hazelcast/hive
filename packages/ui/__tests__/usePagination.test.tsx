import { testHook, getHookRes } from '@hazelcast/test-helpers'
import { getZeroSiblingCountItems, PaginationItem, usePagination, UsePaginationProps } from '../src/hooks/usePagination'

describe('usePagination', () => {
  const data: [UsePaginationProps, PaginationItem[]][] = [
    // For small number of pages all of them are returned
    [{ currentPage: 1, pageCount: 1 }, ['previous', 1, 'next']],
    [{ currentPage: 1, pageCount: 3 }, ['previous', 1, 2, 3, 'next']],
    [{ currentPage: 1, pageCount: 5 }, ['previous', 1, 2, 3, 4, 5, 'next']],

    // 7, 8 and 9 are corner cases for our implementation of usePagination hook.
    // If we decide to have dynamic boundaryCount and siblingCount the corner cases will change.
    [{ currentPage: 1, pageCount: 7 }, ['previous', 1, 2, 3, 4, 5, 6, 7, 'next']],
    [{ currentPage: 4, pageCount: 7 }, ['previous', 1, 2, 3, 4, 5, 6, 7, 'next']],
    [{ currentPage: 7, pageCount: 7 }, ['previous', 1, 2, 3, 4, 5, 6, 7, 'next']],

    [{ currentPage: 1, pageCount: 8 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 8, 'next']],
    [{ currentPage: 4, pageCount: 8 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 8, 'next']],
    [{ currentPage: 5, pageCount: 8 }, ['previous', 1, 'ellipsis', 4, 5, 6, 7, 8, 'next']],
    [{ currentPage: 8, pageCount: 8 }, ['previous', 1, 'ellipsis', 4, 5, 6, 7, 8, 'next']],

    [{ currentPage: 1, pageCount: 9 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 9, 'next']],
    [{ currentPage: 4, pageCount: 9 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 9, 'next']],
    [{ currentPage: 5, pageCount: 9 }, ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 9, 'next']],
    [{ currentPage: 6, pageCount: 9 }, ['previous', 1, 'ellipsis', 5, 6, 7, 8, 9, 'next']],
    [{ currentPage: 9, pageCount: 9 }, ['previous', 1, 'ellipsis', 5, 6, 7, 8, 9, 'next']],

    // Let's add a high number of pages
    [{ currentPage: 1, pageCount: 100 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 100, 'next']],
    [{ currentPage: 4, pageCount: 100 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 100, 'next']],
    [{ currentPage: 5, pageCount: 100 }, ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 100, 'next']],
    [{ currentPage: 25, pageCount: 100 }, ['previous', 1, 'ellipsis', 24, 25, 26, 'ellipsis', 100, 'next']],
    [{ currentPage: 50, pageCount: 100 }, ['previous', 1, 'ellipsis', 49, 50, 51, 'ellipsis', 100, 'next']],
    [{ currentPage: 75, pageCount: 100 }, ['previous', 1, 'ellipsis', 74, 75, 76, 'ellipsis', 100, 'next']],
    [{ currentPage: 100, pageCount: 100 }, ['previous', 1, 'ellipsis', 96, 97, 98, 99, 100, 'next']],
  ]

  it.each(data)('for %p returns %p', (hookArgs, expectedHookRes) => {
    const { spyHookRes } = testHook(() => usePagination(hookArgs))
    const items = getHookRes(spyHookRes)

    expect(items).toEqual(expectedHookRes)
  })

  const zeroSiblingCountData: [UsePaginationProps['pageCount'], UsePaginationProps['currentPage'], PaginationItem[]][] = [
    // Show everything
    [1, 1, [1]],
    [2, 1, [1, 2]],
    [3, 1, [1, 2, 3]],
    [3, 2, [1, 2, 3]],
    [3, 3, [1, 2, 3]],

    // Show max 3 pages (+ ellipsis)
    [5, 1, [1, 2, 'ellipsis', 5]],
    [5, 3, [1, 'ellipsis', 3, 'ellipsis', 5]],
    [5, 5, [1, 'ellipsis', 4, 5]],

    // A high number of pages
    [100, 1, [1, 2, 'ellipsis', 100]],
    [100, 2, [1, 2, 'ellipsis', 100]],
    [100, 3, [1, 'ellipsis', 3, 'ellipsis', 100]],
    [100, 25, [1, 'ellipsis', 25, 'ellipsis', 100]],
    [100, 75, [1, 'ellipsis', 75, 'ellipsis', 100]],
    [100, 98, [1, 'ellipsis', 98, 'ellipsis', 100]],
    [100, 99, [1, 'ellipsis', 99, 100]],
    [100, 100, [1, 'ellipsis', 99, 100]],
  ]

  it.each(zeroSiblingCountData)('for page count %p and current pge %p returns %p', (currentPage, pageCount, expectedRes) => {
    const items = getZeroSiblingCountItems(currentPage, pageCount)

    expect(items).toEqual(expectedRes)
  })
})
