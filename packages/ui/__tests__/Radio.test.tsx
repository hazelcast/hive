import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'
import { Help } from '../src'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

describe('Radio', () => {
  it('Renders the default radio', async () => {
    uuidMock.mockImplementation(() => 'uuidtest')

    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Radio checked name="hello" disabled value="world" onChange={onChange} onBlur={onBlur} label="Hello World" />,
    )
    expect(wrapper.find('input').props()).toEqual({
      type: 'radio',
      name: 'hello',
      value: 'world',
      onChange,
      onBlur,
      checked: true,
      'aria-describedby': undefined,
      disabled: true,
      id: 'uuidtest',
    })
  })

  it('Radio is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Radio checked name="hello" value="hello" disabled onChange={onChange} label="Hello World" />)

    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().disabled).toBe(true)
  })

  it('Radio is passed helperText, Help component is present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Radio
        checked
        name="hello"
        disabled
        value="world"
        helperText="This is a helper text."
        onChange={onChange}
        onBlur={onBlur}
        label="Hello World"
      />,
    )
    expect(wrapper.find(Help).props()).toMatchObject({ helperText: 'This is a helper text.' })
  })

  it('Radio is not passed helperText, Help component is not present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Radio checked name="hello" disabled value="world" onChange={onChange} onBlur={onBlur} label="Hello World" />,
    )
    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('Radio is passed a label, label text is present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Radio
        checked
        name="hello"
        disabled
        value="world"
        helperText="This is a helper text."
        onChange={onChange}
        onBlur={onBlur}
        label="Hello World"
      />,
    )
    expect(wrapper.find('span').contains('Hello World')).toBeTruthy()
  })
})
