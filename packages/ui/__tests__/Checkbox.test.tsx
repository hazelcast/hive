import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Checkbox } from '../src/Checkbox'
import { Check, Minus } from 'react-feather'
import { Error, errorId } from '../src'
import { v4 as uuid } from 'uuid'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

describe('Checkbox', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders the default checked checkbox', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Checkbox checked name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find(Check).exists()).toBeTruthy()
    expect(wrapper.find(Minus).exists()).toBeFalsy()
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBeFalsy()
  })

  it('Renders a checkbox, checks that properties are passed to an underlying input', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Checkbox
        checked
        name="hello"
        data-test="test-e2e"
        disabled
        required
        value="world"
        onChange={onChange}
        onBlur={onBlur}
        label="Hello World"
      />,
    )

    expect(wrapper.find('div').at(0).props()).toHaveProperty('data-test', 'test-e2e')

    expect(wrapper.find('input').props()).toEqual({
      type: 'checkbox',
      name: 'hello',
      value: 'world',
      onChange,
      onBlur,
      checked: true,
      'aria-checked': 'true',
      'aria-invalid': false,
      'aria-required': true,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: true,
      id: 'uuidtest',
    })
  })

  it('Renders an invalid checkbox, checks that properties are passed to an underlying input', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Checkbox checked error="test" name="hello" disabled value="world" onChange={onChange} onBlur={onBlur} label="Hello World" />,
    )
    expect(wrapper.find('input').props()).toEqual({
      type: 'checkbox',
      name: 'hello',
      value: 'world',
      onChange,
      onBlur,
      checked: true,
      'aria-checked': 'true',
      'aria-invalid': true,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': errorId('uuidtest'),
      disabled: true,
      id: 'uuidtest',
    })
  })

  it('Renders the indeterminate checkbox', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Checkbox checked indeterminate name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find(Check).exists()).toBeFalsy()
    expect(wrapper.find(Minus).exists()).toBeTruthy()
    expect(wrapper.find('input').props()).toHaveProperty('aria-checked', 'mixed')
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

    expect(wrapper.find(Error).exists()).toBe(true)
    expect(wrapper.find('div').contains('Unexpected Error')).toBeTruthy()
  })

  it('Checkbox has not been passed an error property, error message is not present', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Checkbox name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find(Error).exists()).toBe(true)
    expect(wrapper.find('div').contains('Unexpected Error')).toBeFalsy()
  })
})
