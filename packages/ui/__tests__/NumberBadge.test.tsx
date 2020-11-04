import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { NumberBadge } from '../src/NumberBadge'

describe('NumberBadge', () => {
  it('Renders number lower than 99', async () => {
    const number = 99

    const wrapper = await mountAndCheckA11Y(<NumberBadge number={number} />)

    expect(wrapper.findDataTest('number-badge').text()).toBe(number.toString())
  })

  it('Renders formatted number higher than 99', async () => {
    const number = 100

    const wrapper = await mountAndCheckA11Y(<NumberBadge number={number} />)

    expect(wrapper.findDataTest('number-badge').text()).toBe('+99')
  })
})
