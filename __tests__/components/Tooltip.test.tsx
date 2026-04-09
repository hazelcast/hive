import React from 'react'
import { act, screen } from '@testing-library/react'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import cn from 'classnames'

import { Tooltip } from '../../src/components/Tooltip'

import styles from '../../src/components/Tooltip.module.scss'

describe('Tooltip', () => {
  it('Renders correctly if "content" property is defined.', async () => {
    await act(async () => {
      await renderAndCheckA11Y(
        <Tooltip id="tooltip-test" content="Tooltip content" open>
          <button data-test="tooltip-reference">Hover me</button>
        </Tooltip>,
      )
    })

    const tooltipOverlay = screen.queryByTestId('tooltip-overlay')

    expect(screen.queryByTestId('tooltip-reference')).toBeInTheDocument()
    expect(tooltipOverlay).toBeInTheDocument()
    expect(tooltipOverlay).toHaveTextContent('Tooltip content')
    expect(tooltipOverlay).toHaveClass(cn(styles.content))
  })

  it('Does not render tooltip if "content" property is not defined.', async () => {
    await renderAndCheckA11Y(
      <Tooltip content={undefined}>
        <button data-test="tooltip-reference">Hover me</button>
      </Tooltip>,
    )

    expect(screen.queryByTestId('tooltip-overlay')).not.toBeInTheDocument()
  })

  it('Shows tooltip overlay by default if "visible" prop is true.', async () => {
    await act(async () => {
      await renderAndCheckA11Y(
        <Tooltip content="Tooltip content" open>
          <button data-test="tooltip-reference">Hover me</button>
        </Tooltip>,
      )
    })

    expect(screen.queryByTestId('tooltip-overlay')).toBeInTheDocument()
  })
})
