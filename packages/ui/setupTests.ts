import '../../setupTests.base'

import Enzyme, { ReactWrapper, ShallowWrapper } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { unmountComponentAtNode } from 'react-dom'
import { configure } from '@testing-library/react'
import '@testing-library/jest-dom'
import { queryHelpers } from '@testing-library/dom'

configure({ testIdAttribute: 'data-test' })

// https://github.com/cgood92/enzyme-cleanup/blob/master/index.js
const attachments: HTMLElement[] = []

// eslint-disable-next-line
const createMountRendererOriginal: any = (Adapter.prototype as any).createMountRenderer

// eslint-disable-next-line
;(Adapter.prototype as any).createMountRenderer = function (options: object) {
  const attachTo = document.createElement('div')
  attachTo.id = 'enzymeContainer'
  // create a DOM element and mount component onto that element
  document.body.appendChild(attachTo)

  attachments.push(attachTo)

  // eslint-disable-next-line
  return createMountRendererOriginal.call(this, {
    ...options,
    attachTo: attachTo,
  })
}

const cleanup = () => {
  attachments.forEach((node) => {
    // Unmount react component after each test
    unmountComponentAtNode(node)
    // remove earlier created DOM element
    node.remove()
  })
}

// https://github.com/cgood92/enzyme-cleanup
Enzyme.configure({ adapter: new Adapter() })

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

ReactWrapper.prototype.findDataTest = function <T>(this: ReactWrapper, dataTest: string) {
  return this.find(`[data-test="${dataTest}"]`) as unknown as ReactWrapper<T>
}
ReactWrapper.prototype.findDataTestFirst = function <T>(this: ReactWrapper, dataTest: string) {
  return this.findDataTest<T>(dataTest).first()
}
ReactWrapper.prototype.existsDataTest = function (this: ReactWrapper, dataTest: string) {
  return this.exists(`[data-test="${dataTest}"]`)
}
ShallowWrapper.prototype.findDataTest = function <T>(this: ShallowWrapper, dataTest: string) {
  return this.find(`[data-test="${dataTest}"]`) as unknown as ShallowWrapper<T>
}
ShallowWrapper.prototype.existsDataTest = function (this: ShallowWrapper, dataTest: string) {
  return this.exists(`[data-test="${dataTest}"]`)
}

export const queryByLabel = queryHelpers.queryByAttribute.bind(null, 'aria-label') as (
  element: HTMLElement | Document,
  label: string,
) => ReturnType<typeof queryHelpers.queryByAttribute>
export const queryAllByLabel = queryHelpers.queryAllByAttribute.bind(null, 'aria-label') as (
  element: HTMLElement | Document,
  label: string,
) => ReturnType<typeof queryHelpers.queryAllByAttribute>
