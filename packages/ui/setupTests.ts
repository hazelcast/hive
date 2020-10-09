import '../../setupTests.base'

import Enzyme, { ReactWrapper, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { unmountComponentAtNode } from 'react-dom'

// https://github.com/cgood92/enzyme-cleanup/blob/master/index.js
const attachments: HTMLElement[] = []

const createMountRendererOriginal = (Adapter.prototype as any).createMountRenderer

// eslint-disable-next-line func-names
;(Adapter.prototype as any).createMountRenderer = function (options: object) {
  const attachTo = document.createElement('div')

  attachments.push(attachTo)

  return createMountRendererOriginal.call(this, {
    ...options,
    attachTo,
  })
}

const cleanup = () => {
  attachments.forEach((node) => {
    // Unmount react component after each test
    unmountComponentAtNode(node)
  })
}

// https://github.com/cgood92/enzyme-cleanup
Enzyme.configure({ adapter: new Adapter() })

afterEach(() => {
  cleanup()
})

// https://stackoverflow.com/questions/42213522/mocking-document-createrange-for-jest
document.createRange = () =>
  ({
    setStart: () => {},
    setEnd: () => {},
    getBoundingClientRect: () => {
      return { right: 0 }
    },
    getClientRects: () => [],
    createContextualFragment: jest.fn(),
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  } as any)
document.getSelection = () =>
  ({
    addRange: () => {},
    removeAllRanges: () => {},
  } as any)

declare module 'enzyme' {
  interface ReactWrapper<P> {
    findDataTest<T = HTMLAttributes>(dataTest: string): ReactWrapper<T>
    existsDataTest(dataTest: string): boolean
  }

  interface ShallowWrapper<P> {
    findDataTest<T = HTMLAttributes>(dataTest: string): ShallowWrapper<T>
    existsDataTest(dataTest: string): boolean
  }
}

ReactWrapper.prototype.findDataTest = function <T>(this: ReactWrapper, dataTest: string) {
  return (this.find(`[data-test="${dataTest}"]`) as unknown) as ReactWrapper<T>
}
ReactWrapper.prototype.existsDataTest = function (this: ReactWrapper, dataTest: string) {
  return this.exists(`[data-test="${dataTest}"]`)
}
ShallowWrapper.prototype.findDataTest = function <T>(this: ShallowWrapper, dataTest: string) {
  return (this.find(`[data-test="${dataTest}"]`) as unknown) as ShallowWrapper<T>
}
ShallowWrapper.prototype.existsDataTest = function (this: ShallowWrapper, dataTest: string) {
  return this.exists(`[data-test="${dataTest}"]`)
}
