import { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { axe, JestAxe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

type AxeOptions = Parameters<JestAxe>[1]
const axeDefaultOptions: AxeOptions = {
  rules: {
    // We are testing small units. They might not contain landmarks
    region: {
      enabled: false,
    },
    // We are using chrome-off for SelectField
    'autocomplete-valid': { enabled: false },
    // TODO: Fix later
    'aria-tooltip-name': { enabled: false },
  },
}

export interface RenderAndCheckA11YOptions {
  axeOptions?: AxeOptions
}

export const renderAndCheckA11Y = async <P>(
  node: ReactElement<P>,
  { axeOptions }: RenderAndCheckA11YOptions = {
    axeOptions: axeDefaultOptions,
  },
): Promise<RenderResult> => {
  const result = render(node)

  const results = await axe(result.container, axeOptions)
  expect(results).toHaveNoViolations()

  return result
}
