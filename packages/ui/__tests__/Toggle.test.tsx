import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { useUID } from 'react-uid'

import { Toggle } from '../src/Toggle'
import { Error } from '../src/Error'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Toggle', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders the default checked Toggle', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle checked name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find('.toggleTrack').exists()).toBeTruthy()
    expect(wrapper.find('input').props()).toMatchObject({
      type: 'checkbox',
      name: 'hello',
      checked: true,
      disabled: undefined,
      id: 'uuidtest',
    })
    expect(wrapper.find('.toggleTrack').props()).toMatchObject({
      'aria-invalid': false,
    })
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBeFalsy()
  })

  it('Renders a disabled and unchecked Toggle', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle disabled checked={false} name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find('.toggleTrack').exists()).toBeTruthy()
    expect(wrapper.find('input').props()).toMatchObject({
      type: 'checkbox',
      name: 'hello',
      disabled: true,
      checked: false,
      id: 'uuidtest',
    })
    expect(wrapper.find('.toggleTrack').props()).toMatchObject({
      'aria-invalid': false,
    })
    expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBeFalsy()
  })

  it('Renders a Toggle with .error prop', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle name="hello" onChange={onChange} label="Hello World" error="Unexpected Error" />)

    expect(wrapper.find(Error).exists()).toBe(true)
    expect(wrapper.find('div').contains('Unexpected Error')).toBeTruthy()
  })
})
