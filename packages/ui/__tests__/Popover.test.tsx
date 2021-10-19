import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Popover } from '../src/Popover'

describe('Popover', () => {
  it('Shows popover by default if "open" prop is true', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Popover open data-test="popover-test" onClose={jest.fn()}>
        <div data-test="popover-test-content">Content</div>
      </Popover>,
    )

    expect(wrapper.children().findDataTest('popover-test').exists()).toBeTruthy()
  })

  it('Should react on open property', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Popover open={false} data-test="popover-test" onClose={jest.fn()}>
        <div data-test="popover-test-content">Content</div>
      </Popover>,
    )

    expect(wrapper.children().findDataTest('popover-test').exists()).toBeFalsy()

    wrapper.setProps({
      open: true,
    })

    expect(wrapper.children().findDataTest('popover-test').exists()).toBeTruthy()
  })
})
