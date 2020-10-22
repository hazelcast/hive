/* eslint-disable @typescript-eslint/require-await */
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'

import { Tooltip } from '../src/Tooltip'

/**
 * There's a weird issue with react-popper that results in missing act() wrapper error.
 * This is why all mounts are wrapped in act().
 *
 * https://github.com/popperjs/react-popper/issues/368
 */
describe('Tooltip', () => {
  test('Renders correctly if "content" property is defined.', async () => {
    const wrapper = await mountAndCheckA11Y(
      <div>
        <Tooltip id="tooltip-test" content="Tooltip content">
          {(ref) => (
            <button ref={ref} data-test="tooltip-reference">
              Hover me
            </button>
          )}
        </Tooltip>
      </div>,
    )

    const tooltipOverlay = wrapper.find('[data-test="tooltip-overlay"]')

    expect(wrapper.find('[data-test="tooltip-reference"]').exists()).toBeTruthy()
    expect(tooltipOverlay.exists()).toBeTruthy()
    expect(tooltipOverlay.text()).toEqual('Tooltip content')
  })

  test('Does not render tooltip if "content" property is not defined.', async () => {
    const wrapper = await mountAndCheckA11Y(
      <div>
        <Tooltip id="tooltip-test" content={undefined}>
          {(ref) => (
            <button ref={ref} data-test="tooltip-reference">
              Hover me
            </button>
          )}
        </Tooltip>
      </div>,
    )

    expect(wrapper.find('[data-test="tooltip-overlay"]').exists()).toBeFalsy()

    wrapper.find('[data-test="tooltip-reference"]').simulate('mouseenter')

    wrapper.update()

    expect(wrapper.find('[data-test="tooltip-overlay"]').exists()).toBeFalsy()
  })

  test('Shows tooltip overlay on hover of the target element.', async () => {
    const wrapper = await mountAndCheckA11Y(
      <div>
        <Tooltip id="tooltip-test" content="Tooltip content">
          {(ref) => (
            <button ref={ref} data-test="tooltip-reference">
              Hover me
            </button>
          )}
        </Tooltip>
      </div>,
    )

    let tooltipOverlay = wrapper.find('[data-test="tooltip-overlay"]')

    expect(tooltipOverlay.hasClass('hidden')).toBeTruthy()

    wrapper.find('[data-test="tooltip-reference"]').simulate('mouseenter')

    wrapper.update()

    tooltipOverlay = wrapper.find('[data-test="tooltip-overlay"]')

    expect(tooltipOverlay.hasClass('hidden')).toBeTruthy()
    expect(tooltipOverlay.text()).toEqual('Tooltip content')
    expect(tooltipOverlay.prop('id')).toEqual('tooltip-test')

    wrapper.find('[data-test="tooltip-reference"]').simulate('mouseleave')

    setTimeout(() => {
      wrapper.update()
      expect(wrapper.find('[data-test="tooltip-overlay"]')).toBeFalsy()
    }, 100)
  })

  test('Shows tooltip overlay by default if "visible" prop is true.', async () => {
    const wrapper = await mountAndCheckA11Y(
      <div>
        <Tooltip id="tooltip-test" content="Tooltip content" visible>
          {(ref) => (
            <button ref={ref} data-test="tooltip-reference">
              Hover me
            </button>
          )}
        </Tooltip>
      </div>,
    )

    expect(wrapper.find('[data-test="tooltip-overlay"]').hasClass('hidden')).toBeFalsy()
  })
})
