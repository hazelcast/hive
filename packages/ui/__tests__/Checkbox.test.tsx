import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Checkbox } from '../src/Checkbox'
import { Check, Minus } from 'react-feather'
import { act } from 'react-dom/test-utils'

describe('Checkbox', () => {
  it('Renders the default checked checkbox', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Checkbox id={'test'} checked name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find(Check).exists()).toBeTruthy()
    expect(wrapper.find(Minus).exists()).toBeFalsy()
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBeFalsy()
  })
  it('Renders the indeterminate checkbox', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Checkbox id={'test'} checked indeterminate name="hello" onChange={onChange} label="Hello World" />,
    )

    expect(wrapper.find(Check).exists()).toBeFalsy()
    expect(wrapper.find(Minus).exists()).toBeTruthy()
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBe(true)
  })

  it('Checkbox is rendered, user clicks on a text, checkbox is changed', async () => {
    const onChange = jest.fn()
    const onFocus = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Checkbox id={'test'} checked name="hello" onChange={onChange} onFocus={onFocus} label="Hello World" />,
    )
    const spanEl = wrapper.find('span').at(0)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('label').simulate('click')
      wrapper.find('label').at(0).getDOMNode().dispatchEvent(new MouseEvent('click'))
      wrapper.find('span').at(0).getDOMNode().dispatchEvent(new MouseEvent('click'))
      wrapper.find('input').at(0).getDOMNode().dispatchEvent(new MouseEvent('click'))
      wrapper.simulate('click')
    })

    // wrapper.getDOMNode().dispatchEvent(new MouseEvent('click'))

    spanEl.contains('Hello World')
    expect(onChange).toHaveBeenCalled()
  })
})
