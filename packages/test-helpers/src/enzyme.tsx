import { MountRendererProps, mount as mountEnzyme, ReactWrapper } from 'enzyme'
import { axe, JestAxe, toHaveNoViolations } from 'jest-axe'
import React, { ReactElement } from 'react'
import { act } from 'react-dom/test-utils'

expect.extend(toHaveNoViolations)

type AxeOptions = Parameters<JestAxe>[1]
export const axeDefaultOptions: AxeOptions = {
  rules: {
    // We are testing small units. They might not contain landmarks
    region: {
      enabled: false,
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let beforeAxeGlobal: ((wrapper: ReactWrapper<any>) => void | Promise<void>) | undefined
/**
 * Use it to attach modal
 *
 * @example
 *
 * import { setAppElement } from 'react-modal'
 * ...
 * await mountAndCheckA11Y(<App />, { beforeAxe: (wrapper) => setAppElement(wrapper.getDOMNode()) })
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setBeforeAxeGlobal = (newBeforeAxeGlobal: (wrapper: ReactWrapper<any>) => void | Promise<void>) => {
  beforeAxeGlobal = newBeforeAxeGlobal
}

export interface MountAndCheckA11YOptions<P> {
  mountOptions?: MountRendererProps
  act?: 'sync' | 'async'
  axeOptions?: AxeOptions
  /**
   * Use it to attach modal
   * Overrides `setBeforeAxeGlobal`
   */
  beforeAxe?: (wrapper: ReactWrapper<P>) => void | Promise<void>
  /**
   * Wrap node with `div` to handle Fragments and Portals
   * As jest-axe expects a valid HTML string
   */
  wrap?: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mountAndCheckA11Y = async <P,>(
  node: ReactElement<P>,
  { axeOptions = axeDefaultOptions, beforeAxe, mountOptions, act: actOption = 'async', wrap = true }: MountAndCheckA11YOptions<P> = {},
) => {
  if (wrap) {
    node = <div>{node}</div>
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let wrapper!: ReactWrapper<P>

  if (actOption === 'sync') {
    act(() => {
      wrapper = mountEnzyme(node, mountOptions)
    })
  } else if (actOption === 'async') {
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper = mountEnzyme(node, mountOptions)
    })
  } else {
    wrapper = mountEnzyme(node, mountOptions)
  }

  await (beforeAxeGlobal ?? beforeAxe)?.(wrapper)
  const results = await axe(wrapper.getDOMNode(), axeOptions)
  expect(results).toHaveNoViolations()

  return wrapper
}
