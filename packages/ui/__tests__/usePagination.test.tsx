import { testHook, getHookRes } from '@hazelcast/test-helpers'
import { PaginationItem, usePagination, UsePaginationProps } from '../src/hooks/usePagination'

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

    expect(items).toStrictEqual(expectedHookRes)
  })
})
