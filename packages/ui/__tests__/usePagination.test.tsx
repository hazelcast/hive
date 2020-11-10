import { testHook, getHookRes } from '@hazelcast/test-helpers'
import { PaginationItem, usePagination, UsePaginationProps } from '../src/hooks/usePagination'

describe('usePagination', () => {
  const data: [UsePaginationProps, PaginationItem[]][] = [
    // for small number of pages all of them are returned
    [{ page: 1, count: 1 }, ['previous', 1, 'next']],
    [{ page: 1, count: 3 }, ['previous', 1, 2, 3, 'next']],
    [{ page: 1, count: 5 }, ['previous', 1, 2, 3, 4, 5, 'next']],

    // 7, 8 and 9 are corner cases
    [{ page: 1, count: 7 }, ['previous', 1, 2, 3, 4, 5, 6, 7, 'next']],
    [{ page: 4, count: 7 }, ['previous', 1, 2, 3, 4, 5, 6, 7, 'next']],
    [{ page: 7, count: 7 }, ['previous', 1, 2, 3, 4, 5, 6, 7, 'next']],

    [{ page: 1, count: 8 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 8, 'next']],
    [{ page: 4, count: 8 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 8, 'next']],
    [{ page: 5, count: 8 }, ['previous', 1, 'ellipsis', 4, 5, 6, 7, 8, 'next']],
    [{ page: 8, count: 8 }, ['previous', 1, 'ellipsis', 4, 5, 6, 7, 8, 'next']],

    [{ page: 1, count: 9 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 9, 'next']],
    [{ page: 4, count: 9 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 9, 'next']],
    [{ page: 5, count: 9 }, ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 9, 'next']],
    [{ page: 6, count: 9 }, ['previous', 1, 'ellipsis', 5, 6, 7, 8, 9, 'next']],
    [{ page: 9, count: 9 }, ['previous', 1, 'ellipsis', 5, 6, 7, 8, 9, 'next']],

    // let's add a high number of pages
    [{ page: 1, count: 100 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 100, 'next']],
    [{ page: 4, count: 100 }, ['previous', 1, 2, 3, 4, 5, 'ellipsis', 100, 'next']],
    [{ page: 5, count: 100 }, ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 100, 'next']],
    [{ page: 25, count: 100 }, ['previous', 1, 'ellipsis', 24, 25, 26, 'ellipsis', 100, 'next']],
    [{ page: 50, count: 100 }, ['previous', 1, 'ellipsis', 49, 50, 51, 'ellipsis', 100, 'next']],
    [{ page: 75, count: 100 }, ['previous', 1, 'ellipsis', 74, 75, 76, 'ellipsis', 100, 'next']],
    [{ page: 100, count: 100 }, ['previous', 1, 'ellipsis', 96, 97, 98, 99, 100, 'next']],
  ]

  it.each(data)('for %p returns %p', (hookArgs, expectedHookRes) => {
    const { spyHookRes } = testHook(() => usePagination(hookArgs))
    const { items } = getHookRes(spyHookRes)

    expect(items).toStrictEqual(expectedHookRes)
  })
})
