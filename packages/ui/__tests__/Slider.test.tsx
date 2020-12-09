import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { useUID } from 'react-uid'

import { getMarkMetadata, Slider } from '../src/Slider'

jest.mock('react-uid')
const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Slider', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders single value slider, checks that the number of inputs is correct', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={4} min={0} max={10} onChange={onChange} />)

    expect(wrapper.find('input[type="range"]').length).toEqual(1)
  })
  it('Renders range slider, checks that the number of inputs is correct', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={[1, 4]} min={0} max={10} onChange={onChange} />)

    expect(wrapper.find('input[type="range"]').length).toEqual(2)
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
      id: 'uuidtest',
      name: 'ram',
      className: undefined,
      disabled: true,
      max: 100,
      min: 1,
      // This is an internal component function
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.any(Function),
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

  it('Renders range slider, checks that the number can be changed', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={1} min={0} max={10} onChange={onChange} />)

    wrapper.find('input').simulate('change', 20)
    wrapper.update()
    expect(onChange).toBeCalledTimes(1)
  })

  it('Renders single value slider, checks that the number can be changed upon clicking a slider', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200,
    })

    const onChange = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any = {}
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      events[event] = handle
    })
    jest.spyOn(window, 'removeEventListener').mockImplementation((event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      events[event] = undefined
    })

    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={1} min={0} max={10} onChange={onChange} />)

    expect(onChange).toBeCalledTimes(0)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    events['click']({ offsetX: 100, target: wrapper.find("div[role='group']").instance() })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(5, expect.anything())
  })

  it('Renders range slider, checks that the number can be changed upon clicking a slider ', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200,
    })

    const onChange = jest.fn()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any = {}
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      events[event] = handle
    })
    jest.spyOn(window, 'removeEventListener').mockImplementation((event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      events[event] = undefined
    })

    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={[3, 9]} min={0} max={10} onChange={onChange} />)

    expect(onChange).toBeCalledTimes(0)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    events['click']({ offsetX: 100, target: wrapper.find("div[role='group']").instance() })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith([5, 9], expect.anything())
  })

  it('Renders slider with marks, check that marks are rendered', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Slider
        name="ram"
        label="RAM"
        value={4}
        min={1}
        max={100}
        onChange={onChange}
        marks={[
          {
            value: 1,
            label: '1 GB',
          },
          {
            value: 20,
            label: '20 GB',
          },
        ]}
      />,
    )
    expect(wrapper.find("ul[data-test='marks']").exists()).toBeTruthy()
    expect(wrapper.find("ul[data-test='mark-descriptions']").exists()).toBeTruthy()

    expect(wrapper.find("ul[data-test='marks'] li").length).toEqual(2)
    expect(wrapper.find("ul[data-test='mark-descriptions'] li").length).toEqual(2)
  })

  it('Renders slider without marks, check that marks are not rendered', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={4} min={1} max={100} onChange={onChange} />)
    expect(wrapper.find("ul[data-test='marks']").exists()).toBeFalsy()
    expect(wrapper.find("ul[data-test='mark-descriptions']").exists()).toBeFalsy()
  })

  it('Renders slider, check that the first value indicator is present, the second one is hidden', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={4} min={1} max={100} onChange={onChange} />)
    expect(wrapper.findDataTest('slider-first-value-indicator').exists()).toBeTruthy()
    expect(wrapper.findDataTest('slider-second-value-indicator').exists()).toBeFalsy()
    expect(wrapper.findDataTest('slider-first-value-indicator').text()).toEqual('4')
  })

  it('Renders range slider, check that both value indicators are present', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(<Slider name="ram" label="RAM" value={[4, 10]} min={1} max={100} onChange={onChange} />)
    expect(wrapper.findDataTest('slider-first-value-indicator').exists()).toBeTruthy()
    expect(wrapper.findDataTest('slider-second-value-indicator').exists()).toBeTruthy()
    expect(wrapper.findDataTest('slider-first-value-indicator').text()).toEqual('4')
    expect(wrapper.findDataTest('slider-second-value-indicator').text()).toEqual('10')
  })

  it('Renders range slider, check that both value indicators are correct when providing a formatter function', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Slider name="ram" label="RAM" value={[4, 10]} min={1} max={100} onChange={onChange} formatCurrentValue={(x) => `${x} RAM`} />,
    )
    expect(wrapper.findDataTest('slider-first-value-indicator').text()).toEqual('4 RAM')
    expect(wrapper.findDataTest('slider-second-value-indicator').text()).toEqual('10 RAM')
  })
})

describe('Slider helper functions', () => {
  /**
   * Internal function tests
   */
  it('single value mode: getMarkMetadata returns correct metadata for the mark, given the thumb is before the mark', () => {
    const { left, isActive } = getMarkMetadata(3, 10, [1, 10], false)
    expect(left).toEqual(30)
    expect(isActive).toBe(false)
  })
  it('single value mode: getMarkMetadata returns correct metadata for the mark, given the thumb is after the mark', () => {
    const { left, isActive } = getMarkMetadata(5, 10, [6, 10], false)
    expect(left).toEqual(50)
    expect(isActive).toBe(true)
  })
  it('multi values mode: getMarkMetadata returns correct metadata for the mark, given the mark is after the active range', () => {
    const { left, isActive } = getMarkMetadata(3, 20, [5, 10], true)
    expect(left).toEqual(15)
    expect(isActive).toBe(false)
  })
  it('multi values mode: getMarkMetadata returns correct metadata for the mark, given the mark is within active range', () => {
    const { left, isActive } = getMarkMetadata(7, 20, [5, 10], true)
    expect(left).toEqual(35)
    expect(isActive).toBe(true)
  })
  it('multi values mode: getMarkMetadata returns correct metadata for the mark, given the mark is before the active range', () => {
    const { left, isActive } = getMarkMetadata(12, 20, [5, 10], true)
    expect(left).toEqual(60)
    expect(isActive).toBe(false)
  })
})
