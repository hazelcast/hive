import React from 'react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import cn from 'classnames'
import { screen } from '@testing-library/react'

import { Tooltip } from '../src/Tooltip'

import styles from '../src/Tooltip.module.scss'

describe('Tooltip', () => {
  it('Renders correctly if "content" property is defined.', async () => {
    await renderAndCheckA11Y(
      <Tooltip id="tooltip-test" content="Tooltip content">
        {(ref) => (
          <button ref={ref} data-test="tooltip-reference">
            Hover me
          </button>
        )}
      </Tooltip>,
    )

    const tooltipOverlay = screen.queryByTestId('tooltip-overlay')

    expect(screen.queryByTestId('tooltip-reference')).toBeInTheDocument()
    expect(tooltipOverlay).toBeInTheDocument()
    expect(tooltipOverlay).toHaveTextContent('Tooltip content')
    expect(tooltipOverlay).toHaveAttribute('aria-hidden', 'true')
    expect(tooltipOverlay).toHaveClass(cn(styles.overlay, styles.hidden))

    const tooltipSr = screen.queryByTestId('tooltip-sr')

    expect(tooltipSr).toBeInTheDocument()
    expect(tooltipSr).toHaveRole('tooltip')
    expect(tooltipSr).toHaveAttribute('id', 'tooltip-test')
    expect(tooltipSr).toHaveClass(styles.tooltipSr)
  })

  it('Does not render tooltip if "content" property is not defined.', async () => {
    await renderAndCheckA11Y(
      <Tooltip content={undefined}>
        {(ref) => (
          <button ref={ref} data-test="tooltip-reference">
            Hover me
          </button>
        )}
      </Tooltip>,
    )

    expect(screen.queryByTestId('tooltip-overlay')).not.toBeInTheDocument()
  })

  it('Shows tooltip overlay by default if "visible" prop is true.', async () => {
    await renderAndCheckA11Y(
      <Tooltip content="Tooltip content" visible>
        {(ref) => (
          <button ref={ref} data-test="tooltip-reference">
            Hover me
          </button>
        )}
      </Tooltip>,
    )

    expect(screen.queryByTestId('tooltip-overlay')).not.toHaveClass(styles.hidden)
  })
})
