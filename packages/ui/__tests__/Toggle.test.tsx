import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { useUID } from 'react-uid'

import { Toggle } from '../src/Toggle'
import { Error, errorId } from '../src/Error'
import { Help, helpTooltipId } from '../src'
import { shallow } from 'enzyme'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Toggle', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders the default checked Toggle', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle checked name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find('input').props()).toMatchObject({
      type: 'checkbox',
      name: 'hello',
      checked: true,
      disabled: undefined,
      id: 'uuidtest',
      'aria-invalid': false,
      'aria-errormessage': undefined,
      'aria-describedby': undefined,
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error: undefined,
      inputId: 'uuidtest',
    })

    expect(wrapper.exists(Help)).toBeFalsy()
  })

  it('Renders without the label prop', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<Toggle checked={false} name="hello" onChange={onChange} />)

    expect(wrapper.existsDataTest('label-data-test')).toBeFalsy()
  })

  it('Renders an unchecked Toggle', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle checked={false} name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find('input').props()).toMatchObject({
      type: 'checkbox',
      name: 'hello',
      disabled: undefined,
      checked: false,
      id: 'uuidtest',
      'aria-invalid': false,
      'aria-errormessage': undefined,
      'aria-describedby': undefined,
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error: undefined,
      inputId: 'uuidtest',
    })

    expect(wrapper.exists(Help)).toBeFalsy()
  })

  it('Renders a disabled Toggle', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle disabled checked={false} name="hello" onChange={onChange} label="Hello World" />)

    expect(wrapper.find('input').props()).toMatchObject({
      disabled: true,
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error: undefined,
      inputId: 'uuidtest',
    })

    expect(wrapper.exists(Help)).toBeFalsy()
  })

  it('Renders a Toggle with helper text', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle name="hello" onChange={onChange} label="Hello World" helperText="Rocknroll" />)

    expect(wrapper.find('input').props()).toMatchObject({
      'aria-describedby': helpTooltipId('uuidtest'),
    })

    expect(wrapper.find(Help).props()).toMatchObject({
      parentId: 'uuidtest',
      helperText: 'Rocknroll',
    })
  })

  it('Renders a Toggle with error', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Toggle name="hello" onChange={onChange} label="Hello World" error="Unexpected Error" />)

    expect(wrapper.find('input').props()).toMatchObject({
      'aria-invalid': true,
      'aria-errormessage': errorId('uuidtest'),
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error: 'Unexpected Error',
      inputId: 'uuidtest',
    })
  })
})
