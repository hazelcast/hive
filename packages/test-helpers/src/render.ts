import { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { axeDefaultOptions } from './axe'

expect.extend(toHaveNoViolations)

export const renderAndCheckA11Y = async <P>(node: ReactElement<P>): Promise<RenderResult> => {
  const result = render(node)

  const results = await axe(result.container, axeDefaultOptions)
  expect(results).toHaveNoViolations()

  return result
}
