import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Checkbox } from '../src/Checkbox'
import { Check, Minus } from 'react-feather'

describe('Checkbox', () => {
  it('Renders the default checked checkbox', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Checkbox checked name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find(Check).exists()).toBeTruthy()
    expect(wrapper.find(Minus).exists()).toBeFalsy()
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBeFalsy()
  })
  it('Renders the indeterminate checkbox', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Checkbox checked indeterminate name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find(Check).exists()).toBeFalsy()
    expect(wrapper.find(Minus).exists()).toBeTruthy()
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBe(true)
  })

  it('Checkbox is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Checkbox checked indeterminate name="hello" disabled onChange={onChange} label="Hello World" />,
    )

    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().disabled).toBe(true)
  })

  it('Checkbox has been passed an error property, error message is displayed', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Checkbox name="hello" onChange={onChange} label="Hello World" error="Unexpected Error" />)

    expect(wrapper.find('div').contains('Unexpected Error')).toBeTruthy()
  })
})
