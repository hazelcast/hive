import { MountRendererProps, mount } from 'enzyme'
import { axe, JestAxe, toHaveNoViolations } from 'jest-axe'
import { ReactElement } from 'react'

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

export const mountAndCheckA11Y = async <P, S>(
  node: ReactElement<P>,
  { mountOptions, axeOptions = axeDefaultOptions }: { mountOptions?: MountRendererProps; axeOptions?: AxeOptions },
) => {
  const wrapper = mount(node, mountOptions)

  const results = await axe(wrapper.getDOMNode(), axeOptions)

  expect(results).toHaveNoViolations()

  return wrapper
}
