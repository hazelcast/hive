import React from 'react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { screen } from '@testing-library/react'

import { Popover } from '../src/Popover'

describe('Popover', () => {
  it('Shows popover by default if "open" prop is true', async () => {
    await renderAndCheckA11Y(
      <Popover open data-test="popover-test" onClose={jest.fn()}>
        <div data-test="popover-test-content">Content</div>
      </Popover>,
    )

    expect(screen.queryByTestId('popover-test')).toBeInTheDocument()
  })

  it('Should react on open property', async () => {
    const { rerender } = await renderAndCheckA11Y(
      <Popover open={false} data-test="popover-test" onClose={jest.fn()}>
        <div data-test="popover-test-content">Content</div>
      </Popover>,
    )

    expect(screen.queryByTestId('popover-test')).not.toBeInTheDocument()

    rerender(
      <Popover open data-test="popover-test" onClose={jest.fn()}>
        <div data-test="popover-test-content">Content</div>
      </Popover>,
    )

    expect(screen.queryByTestId('popover-test')).toBeInTheDocument()
  })
})
