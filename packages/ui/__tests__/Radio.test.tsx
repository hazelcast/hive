import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Checkbox } from '../src/Checkbox'
import { Check, Minus } from 'react-feather'
import { Error, errorId } from '../src'
import { v4 as uuid } from 'uuid'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

describe('Radio', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders the default radio', async () => {
    // const onChange = jest.fn()
    // const wrapper = await mountAndCheckA11Y(<Checkbox checked name="hello" onChange={onChange} label="Hello World" />)
    // expect(wrapper.find(Check).exists()).toBeTruthy()
    // expect(wrapper.find(Minus).exists()).toBeFalsy()
    // expect(wrapper.find('input').getDOMNode<HTMLInputElement>().indeterminate).toBeFalsy()
  })
})
