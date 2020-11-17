import React from 'react'
import { v4 as uuid } from 'uuid'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { Slider } from '../src/Slider'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

describe('Slider', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => 'uuidtest')
  })
  it('Renders single value slider, checks that the number of inputs is correct', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={4} onChange={onChange} />)

    expect(wrapper.find('input').length).toEqual(1)
  })
  it('Renders range slider, checks that the number of inputs is correct', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={[1, 4]} onChange={onChange} />)

    expect(wrapper.find('input').length).toEqual(2)
  })
  it('Renders single value slider, checks that correct props are passed', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={4} min={1} max={100} onChange={onChange} disabled />)
    expect(wrapper.find('input').props()).toEqual({
      'aria-errormessage': undefined,
      'aria-invalid': false,
      'aria-labelledby': 'uuidtest',
      'aria-valuemax': 100,
      'aria-valuemin': 1,
      'aria-valuenow': 4,
      name: 'ram',
      className: undefined,
      disabled: true,
      max: 100,
      min: 1,
      // This is an internal component function
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
      step: 1,
      type: 'range',
      value: 4,
    })
  })
  it('Renders multivalue slider, checks that aria-valuemin and aria-valuemax are correctly set', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Slider name="ram" label="RAM" value={[4, 10]} min={1} max={100} onChange={onChange} disabled />,
    )
    // check for aria-valuenow values
    expect(wrapper.find('input').at(0).props()).toHaveProperty('aria-valuenow', 4)
    expect(wrapper.find('input').at(1).props()).toHaveProperty('aria-valuenow', 10)
    // check for aria-valuemin values
    expect(wrapper.find('input').at(0).props()).toHaveProperty('aria-valuemin', 1)
    expect(wrapper.find('input').at(1).props()).toHaveProperty('aria-valuemin', 4)
    // check for aria-valuemax values
    expect(wrapper.find('input').at(0).props()).toHaveProperty('aria-valuemax', 10)
    expect(wrapper.find('input').at(1).props()).toHaveProperty('aria-valuemax', 100)
  })
  // TODO - add more tests including the interactive ones
})
