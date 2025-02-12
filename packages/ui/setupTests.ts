import '../../setupTests.base'

import { unmountComponentAtNode } from 'react-dom'
import { configure } from '@testing-library/react'
import '@testing-library/jest-dom'
import { queryHelpers } from '@testing-library/dom'

configure({ testIdAttribute: 'data-test' })

// https://github.com/cgood92/enzyme-cleanup/blob/master/index.js
const attachments: HTMLElement[] = []

const cleanup = () => {
  attachments.forEach((node) => {
    // Unmount react component after each test
    unmountComponentAtNode(node)
    // remove earlier created DOM element
    node.remove()
  })
}

afterEach(() => {
  cleanup()
})

declare module 'enzyme' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReactWrapper<P> {
    findDataTest<T = HTMLAttributes>(dataTest: string): ReactWrapper<T>
    findDataTestFirst<T = HTMLAttributes>(dataTest: string): ReactWrapper<T>
    existsDataTest(dataTest: string): boolean
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ShallowWrapper<P> {
    findDataTest<T = HTMLAttributes>(dataTest: string): ShallowWrapper<T>
    existsDataTest(dataTest: string): boolean
  }
}

export const queryByLabel = queryHelpers.queryByAttribute.bind(null, 'aria-label') as (
  element: HTMLElement | Document,
  label: string,
) => ReturnType<typeof queryHelpers.queryByAttribute>
export const queryAllByLabel = queryHelpers.queryAllByAttribute.bind(null, 'aria-label') as (
  element: HTMLElement | Document,
  label: string,
) => ReturnType<typeof queryHelpers.queryAllByAttribute>
