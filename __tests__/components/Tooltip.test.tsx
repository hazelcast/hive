import React from 'react'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { screen } from '@testing-library/react'

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../src/components/Tooltip'

describe('Tooltip', () => {
  it('Renders tooltip content when open.', async () => {
    await renderAndCheckA11Y(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger asChild>
            <button data-test="tooltip-reference">Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    expect(screen.queryByTestId('tooltip-reference')).toBeInTheDocument()
    expect(screen.getByText('Tooltip content')).toBeInTheDocument()
  })

  it('Does not render tooltip content when closed.', async () => {
    await renderAndCheckA11Y(
      <TooltipProvider>
        <Tooltip open={false}>
          <TooltipTrigger asChild>
            <button data-test="tooltip-reference">Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    expect(screen.queryByTestId('tooltip-reference')).toBeInTheDocument()
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })

  it('Renders with placement prop.', async () => {
    await renderAndCheckA11Y(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent placement="bottom-start">Bottom start tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    expect(screen.getByText('Bottom start tooltip')).toBeInTheDocument()
  })
})
