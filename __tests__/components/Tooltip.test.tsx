import React from 'react'
import { act, screen } from '@testing-library/react'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import cn from 'classnames'
import userEvent from '@testing-library/user-event'

import { Tooltip } from '../../src/components/Tooltip'

import styles from '../../src/components/Tooltip.module.css'

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

  it('Shows a tooltip for a disabled native trigger on pointer hover and keyboard focus', async () => {
    const user = userEvent.setup()
    await renderAndCheckA11Y(
      <Tooltip content="Unavailable action">
        <button disabled data-test="disabled-trigger">
          Save
        </button>
      </Tooltip>,
    )

    const trigger = screen.getByTestId('disabled-trigger')
    const wrapper = trigger.parentElement!
    expect(wrapper).toHaveAttribute('tabindex', '0')
    await user.hover(trigger)
    expect(await screen.findByTestId('tooltip-overlay')).toHaveTextContent('Unavailable action')

    await user.unhover(trigger)
    await user.tab()
    expect(wrapper).toHaveFocus()
    expect(await screen.findByTestId('tooltip-overlay')).toHaveTextContent('Unavailable action')
  })

  it('Passes a ref setter to render-prop triggers', async () => {
    const receivedNode = jest.fn()

    await renderAndCheckA11Y(
      <Tooltip content="Tooltip content">
        {(ref) => (
          <button
            ref={(node) => {
              ref(node)
              receivedNode(node)
            }}
          >
            Render prop trigger
          </button>
        )}
      </Tooltip>,
    )

    expect(receivedNode).toHaveBeenCalledWith(screen.getByRole('button'))
  })
})
