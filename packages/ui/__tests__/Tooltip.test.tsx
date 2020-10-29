import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Tooltip } from '../src/Tooltip'

/**
 * There's a weird issue with react-popper that results in missing act() wrapper error.
 * This is why all mounts are wrapped in act().
 *
 * https://github.com/popperjs/react-popper/issues/368
 */
describe('Tooltip', () => {
  it('Renders correctly if "content" property is defined.', async () => {
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

    const tooltipOverlay = wrapper.findDataTest('tooltip-overlay')

    expect(wrapper.findDataTest('tooltip-reference').exists()).toBeTruthy()
    expect(tooltipOverlay.exists()).toBeTruthy()
    expect(tooltipOverlay.text()).toEqual('Tooltip content')
    expect(tooltipOverlay.prop('id')).toEqual('tooltip-test')
  })

  it('Does not render tooltip if "content" property is not defined.', async () => {
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

    expect(wrapper.findDataTest('tooltip-overlay').exists()).toBeFalsy()
  })

  it('Shows tooltip overlay by default if "visible" prop is true.', async () => {
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

    expect(wrapper.findDataTest('tooltip-overlay').hasClass('hidden')).toBeFalsy()
  })
})
