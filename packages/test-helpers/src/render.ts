import { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { axeDefaultOptions, AxeOptions } from './axe'

expect.extend(toHaveNoViolations)

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
