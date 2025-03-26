import '../../setupTests.base'

import { configure } from '@testing-library/react'
import '@testing-library/jest-dom'
import { queryHelpers } from '@testing-library/dom'

configure({ testIdAttribute: 'data-test' })

// https://github.com/cgood92/enzyme-cleanup/blob/master/index.js
const attachments: HTMLElement[] = []

const cleanup = () => {
  attachments.forEach((node) => {
    // remove earlier created DOM element
    node.remove()
  })
}

jest.mock('react-popper', () => {
  const ReactPopper = jest.requireActual('react-popper')
  const usePopper = jest.fn(() => {
    return {
      styles: {},
      attributes: {},
      state: {},
      update: () => Promise.resolve({}),
      forceUpdate: () => void null,
    }
  })
  return {
    ...ReactPopper,
    usePopper,
  }
})

afterEach(() => {
  cleanup()
})

window.ResizeObserver = class MockResizeObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

export const queryByLabel = queryHelpers.queryByAttribute.bind(null, 'aria-label') as (
  element: HTMLElement | Document,
  label: string,
) => ReturnType<typeof queryHelpers.queryByAttribute>
export const queryAllByLabel = queryHelpers.queryAllByAttribute.bind(null, 'aria-label') as (
  element: HTMLElement | Document,
  label: string,
) => ReturnType<typeof queryHelpers.queryAllByAttribute>
