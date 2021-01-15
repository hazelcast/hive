import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { useUID } from 'react-uid'

import { Radio } from '../src/Radio'
import { Help } from '../src'
import { RadioGroup } from '../src/RadioGroup'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Radio', () => {
  it('Renders the default radio', async () => {
    useUIDMock.mockImplementation(() => 'uuidtest')

    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange} data-test="test-e2e-group">
        <Radio checked disabled value="world" onBlur={onBlur} label="Hello World" data-test="test-e2e" />
      </RadioGroup>,
    )

    // mountAndCheckA11Y wraps the component in its own div
    expect(wrapper.childAt(0).find('div').at(0).props()).toHaveProperty('data-test', 'test-e2e-group')
    expect(wrapper.find('label').props()).toHaveProperty('data-test', 'test-e2e')

    expect(wrapper.find('input').props()).toEqual({
      type: 'radio',
      name: 'hello',
      value: 'world',
      onChange,
      onBlur,
      checked: true,
      'aria-describedby': undefined,
      disabled: true,
      required: undefined,
      id: 'uuidtest',
    })
  })

  it('Radio is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked value="hello" disabled label="Hello World" />
      </RadioGroup>,
    )

    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().disabled).toBe(true)
  })

  it('Radio is passed helperText, Help component is present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked disabled value="world" helperText="This is a helper text." onBlur={onBlur} label="Hello World" />
      </RadioGroup>,
    )
    expect(wrapper.find(Help).props()).toMatchObject({ helperText: 'This is a helper text.' })
  })

  it('Radio is not passed helperText, Help component is not present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked disabled value="world" onBlur={onBlur} label="Hello World" />
      </RadioGroup>,
    )
    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('Radio is passed a label, label text is present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked disabled value="world" helperText="This is a helper text." onBlur={onBlur} label="Hello World" />
      </RadioGroup>,
    )
    expect(wrapper.find('span').contains('Hello World')).toBeTruthy()
  })
})
