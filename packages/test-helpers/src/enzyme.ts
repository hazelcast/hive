import { MountRendererProps, mount as mountEnzyme, ReactWrapper } from 'enzyme'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ReactElement } from 'react'
import { act } from 'react-dom/test-utils'

import { axeDefaultOptions, AxeOptions } from './axe'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let getAxeNodeDefault: (wrapper: ReactWrapper<any>) => Element = () => document.body
/**
 * Use it to set the DOM node passed to Axe
 * @default getAxeNodeDefault: () => document.body
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAxeNodeGlobal = (newGetAxeNode: (wrapper: ReactWrapper<any>) => Element) => {
  getAxeNodeDefault = newGetAxeNode
}

export interface MountAndCheckA11YOptions<P> {
  mountOptions?: MountRendererProps
  act?: 'sync' | 'async'
  axeOptions?: AxeOptions
  getAxeNode?: (wrapper: ReactWrapper<P>) => Element
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mountAndCheckA11Y = async <P>(
  node: ReactElement<P>,
  { axeOptions = axeDefaultOptions, mountOptions, getAxeNode, act: actOption = 'async' }: MountAndCheckA11YOptions<P> = {},
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let wrapper!: ReactWrapper<P>

  if (actOption === 'sync') {
    act(() => {
      wrapper = mountEnzyme(node, mountOptions)
      wrapper.update()
    })
  } else if (actOption === 'async') {
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper = mountEnzyme(node, mountOptions)
    })
    wrapper.update()
  } else {
    wrapper = mountEnzyme(node, mountOptions)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const results = await axe((getAxeNode ?? getAxeNodeDefault)(wrapper), axeOptions)
  expect(results).toHaveNoViolations()

  return wrapper
}
