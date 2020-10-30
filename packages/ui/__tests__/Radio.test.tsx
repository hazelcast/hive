import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

describe('Radio', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders the default radio', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Radio checked name="hello" disabled required value="world" onChange={onChange} onBlur={onBlur} label="Hello World" />,
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
    const wrapper = await mountAndCheckA11Y(<Radio checked name="hello" disabled onChange={onChange} label="Hello World" />)

    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().disabled).toBe(true)
  })
})
