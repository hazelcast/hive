import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Radio } from '../src/Radio'
import { RadioGroup } from '../src/RadioGroup'
import { act } from 'react-dom/test-utils'

describe('RadioGroup', () => {
  it('Radio is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked value="hello" disabled label="World" />
        <Radio value="world" label="World" />
      </RadioGroup>,
    )

    expect(wrapper.find("input[value='hello']").getDOMNode<HTMLInputElement>().disabled).toBe(true)
  })

  it('Radio is passed onChange handler, this handler is invoked', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked value="hello" disabled label="World" />
        <Radio value="world" label="World" />
      </RadioGroup>,
    )

    expect(onChange).toBeCalledTimes(0)

    act(() => {
      wrapper.find("input[value='world']").simulate('change')
    })

    expect(onChange).toBeCalledTimes(1)
  })
})
