import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import cn from 'classnames'

import { Tooltip } from '../src/Tooltip'
import styles from '../src/Tooltip.module.scss'

describe('Tooltip', () => {
  it('Renders correctly if "content" property is defined.', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Tooltip id="tooltip-test" content="Tooltip content">
        {(ref) => (
          <button ref={ref} data-test="tooltip-reference">
            Hover me
          </button>
        )}
      </Tooltip>,
    )

    const tooltipOverlay = wrapper.findDataTest('tooltip-overlay')

    expect(wrapper.findDataTest('tooltip-reference').exists()).toBeTruthy()

    expect(tooltipOverlay.exists()).toBeTruthy()
    expect(tooltipOverlay.text()).toEqual('Tooltip content')
    expect(tooltipOverlay.props()).toMatchObject({
      className: cn(styles.overlay, styles.hidden),
      'aria-hidden': true,
    })

    expect(wrapper.findDataTest('tooltip-sr').props()).toMatchObject({
      id: 'tooltip-test',
      className: styles.tooltipSr,
      role: 'tooltip',
    })
  })

  it('Does not render tooltip if "content" property is not defined.', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Tooltip content={undefined}>
        {(ref) => (
          <button ref={ref} data-test="tooltip-reference">
            Hover me
          </button>
        )}
      </Tooltip>,
    )

    expect(wrapper.findDataTest('tooltip-overlay').exists()).toBeFalsy()
  })

  it('Shows tooltip overlay by default if "visible" prop is true.', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Tooltip content="Tooltip content" visible>
        {(ref) => (
          <button ref={ref} data-test="tooltip-reference">
            Hover me
          </button>
        )}
      </Tooltip>,
    )

    expect(wrapper.findDataTest('tooltip-overlay').hasClass(styles.hidden)).toBeFalsy()
  })
})
