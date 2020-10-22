import { MountRendererProps, mount, ReactWrapper } from 'enzyme'
import { axe, JestAxe, toHaveNoViolations } from 'jest-axe'
import { ReactElement } from 'react'
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

export interface MountOptions {
  mountOptions?: MountRendererProps
  axeOptions?: AxeOptions
  act?: 'sync' | 'async'
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mountAndCheckA11Y = async <P>(
  node: ReactElement<P>,
  { mountOptions, axeOptions = axeDefaultOptions, act: actOption }: MountOptions = {},
) => {
  let wrapper: ReactWrapper<P>

  if (actOption === 'sync') {
    act(() => {
      wrapper = mount(node, mountOptions)
    })
  } else if (actOption === 'async') {
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper = mount(node, mountOptions)
    })
  } else {
    wrapper = mount(node, mountOptions)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const results = await axe(wrapper!.getDOMNode(), axeOptions)

  expect(results).toHaveNoViolations()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapper!
}
