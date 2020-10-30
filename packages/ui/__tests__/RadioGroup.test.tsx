import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Radio } from '../src/Radio'
import { RadioGroup } from '../src/RadioGroup'
import { act } from 'react-dom/test-utils'

describe('RadioGroup', () => {
  it('Radio is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()
    const onChange2 = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <RadioGroup>
        <Radio checked name="hello" value="hello" disabled onChange={onChange} label="World" />
        <Radio name="hello" value="world" onChange={onChange2} label="World" />
      </RadioGroup>,
    )

    expect(wrapper.find("input[value='hello']").getDOMNode<HTMLInputElement>().disabled).toBe(true)
    expect(wrapper.find("input[value='world']").getDOMNode<HTMLInputElement>().disabled).toBe(false)
  })

  it('Radio is passed onChange handler, this handler is invoked', async () => {
    const onChange = jest.fn()
    const onChange2 = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <RadioGroup>
        <Radio checked name="hello" value="hello" disabled onChange={onChange} label="World" />
        <Radio name="hello" value="world" onChange={onChange2} label="World" />
      </RadioGroup>,
    )

    expect(onChange2).toBeCalledTimes(0)

    act(() => {
      wrapper.find("input[value='world']").simulate('change')
    })

    expect(onChange2).toBeCalledTimes(1)
  })
})
