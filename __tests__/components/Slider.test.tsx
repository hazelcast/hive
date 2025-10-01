import React, { useState } from 'react'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { useUID } from 'react-uid'
import { act, screen, fireEvent } from '@testing-library/react'

import { getMarkMetadata, Slider, SliderValue } from '../../src/components/Slider'
import { testAttribute } from '../helpers'

import sliderClasses from '../../src/components/Slider.module.scss'

jest.mock('react-uid')
const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Slider', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders single value slider, checks that the number of inputs is correct', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={4} min={0} max={10} onChange={onChange} />)

    expect(container.querySelectorAll('input[type="range"]').length).toEqual(1)
  })
  it('Renders range slider, checks that the number of inputs is correct', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={[1, 4]} min={0} max={10} onChange={onChange} />)

    expect(container.querySelectorAll('input[type="range"]')).toHaveLength(2)
  })
  it('Renders single value slider, checks that correct props are passed', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <Slider name="ram" label="RAM" value={4} min={1} max={100} onChange={onChange} disabled />,
    )

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    testAttribute(input, 'aria-errormessage')
    testAttribute(input, 'type', 'range')
    testAttribute(input, 'aria-invalid', 'false')
    testAttribute(input, 'aria-labelledby', 'uuidtest')
    testAttribute(input, 'aria-valuemax', '100')
    testAttribute(input, 'aria-valuemin', '1')
    testAttribute(input, 'aria-valuenow', '4')
    testAttribute(input, 'id', 'uuidtest')
    testAttribute(input, 'name', 'ram')
    testAttribute(input, 'min', '1')
    testAttribute(input, 'max', '100')
    testAttribute(input, 'value', '4')
    testAttribute(input, 'step', '1')
    testAttribute(input, 'disabled', '')
  })

  it('Renders multivalue slider, checks that aria-valuemin and aria-valuemax are correctly set', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <Slider name="ram" label="RAM" value={[4, 10]} min={1} max={100} onChange={onChange} disabled />,
    )
    const inputs = container.querySelectorAll('input')

    expect(inputs).toHaveLength(2)
    // check for aria-valuenow values
    testAttribute(inputs[0], 'aria-valuenow', '4')
    testAttribute(inputs[1], 'aria-valuenow', '10')
    // check for aria-valuemin values
    testAttribute(inputs[0], 'aria-valuemin', '1')
    testAttribute(inputs[1], 'aria-valuemin', '4')
    // check for aria-valuemax values
    testAttribute(inputs[0], 'aria-valuemax', '10')
    testAttribute(inputs[1], 'aria-valuemax', '100')
  })

  it('Renders range slider, checks that the number can be changed', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={1} min={0} max={10} onChange={onChange} />)

    expect(onChange).toHaveBeenCalledTimes(0)

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: '20' } })
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('Renders single value slider, checks that the number can be changed upon clicking a slider', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200,
    })

    const onChange = jest.fn()

    const events: any = {}
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle) => {
      events[event] = handle
    })
    jest.spyOn(window, 'removeEventListener').mockImplementation((event) => {
      events[event] = undefined
    })

    const { container } = await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={1} min={0} max={10} onChange={onChange} />)

    expect(onChange).toHaveBeenCalledTimes(0)

    events['click']({ offsetX: 100, target: container.querySelector("div[role='group']") })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(5, expect.anything())
  })

  it('Renders range slider, checks that the number can be changed upon clicking a slider ', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200,
    })

    const onChange = jest.fn()

    const events: any = {}
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle) => {
      events[event] = handle
    })
    jest.spyOn(window, 'removeEventListener').mockImplementation((event) => {
      events[event] = undefined
    })

    const { container } = await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={[3, 9]} min={0} max={10} onChange={onChange} />)

    expect(onChange).toHaveBeenCalledTimes(0)

    events['click']({ offsetX: 100, target: container.querySelector("div[role='group']") })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([5, 9], expect.anything())
  })

  it('Renders slider with marks, check that marks are rendered', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(
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
    expect(container.querySelector("ul[data-test='marks']")).toBeInTheDocument()
    expect(container.querySelector("ul[data-test='mark-descriptions']")).toBeInTheDocument()

    expect(container.querySelectorAll("ul[data-test='marks'] li")).toHaveLength(2)
    expect(container.querySelectorAll("ul[data-test='mark-descriptions'] li")).toHaveLength(2)
  })

  it('Renders slider with marks, check that value indicator is hidden & mark is highlighted when value is equal to one of the marks', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <Slider
        name="ram"
        label="RAM"
        value={[4, 10]}
        min={2}
        max={100}
        onChange={onChange}
        marks={[
          {
            value: 4,
            label: '4 GB',
          },
          {
            value: 20,
            label: '20 GB',
          },
        ]}
      />,
    )

    expect(screen.queryByTestId('slider-first-value-indicator')).not.toBeInTheDocument()
    expect(screen.queryByTestId('slider-second-value-indicator')).toBeInTheDocument()
    expect(screen.queryByTestId('mark-description-4')).toHaveClass(sliderClasses.activeMarkDescription)
    expect(screen.queryByTestId('mark-description-20')).not.toHaveClass(sliderClasses.activeMarkDescription)
  })

  it('Renders slider without marks, check that marks are not rendered', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={4} min={1} max={100} onChange={onChange} />)

    expect(container.querySelector("ul[data-test='marks']")).not.toBeInTheDocument()
    expect(container.querySelector("ul[data-test='mark-descriptions']")).not.toBeInTheDocument()
  })

  it('Renders slider, check that the first value indicator is present, the second one is hidden', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={4} min={1} max={100} onChange={onChange} />)

    expect(screen.queryByTestId('slider-first-value-indicator')).toBeInTheDocument()
    expect(screen.queryByTestId('slider-second-value-indicator')).not.toBeInTheDocument()
    expect(screen.queryByTestId('slider-first-value-indicator')).toHaveTextContent('4')
  })

  it('Renders range slider, check that both value indicators are present', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(<Slider name="ram" label="RAM" value={[4, 10]} min={1} max={100} onChange={onChange} />)

    expect(screen.queryByTestId('slider-first-value-indicator')).toBeInTheDocument()
    expect(screen.queryByTestId('slider-second-value-indicator')).toBeInTheDocument()
    expect(screen.queryByTestId('slider-first-value-indicator')).toHaveTextContent('4')
    expect(screen.queryByTestId('slider-second-value-indicator')).toHaveTextContent('10')
  })

  it('Renders range slider, check that both value indicators are correct when providing a formatter function', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <Slider name="ram" label="RAM" value={[4, 10]} min={1} max={100} onChange={onChange} formatCurrentValue={(x) => `${x} RAM`} />,
    )

    expect(screen.queryByTestId('slider-first-value-indicator')).toHaveTextContent('4 RAM')
    expect(screen.queryByTestId('slider-second-value-indicator')).toHaveTextContent('10 RAM')
  })

  it('Adjust new value to min and max values', async () => {
    const Wrapper = () => {
      const [value, setValue] = useState<SliderValue>([4, 10])

      return <Slider name="ram" label="RAM" value={value} min={1} max={100} onChange={setValue} formatCurrentValue={(x) => `${x} RAM`} />
    }
    const { container } = await renderAndCheckA11Y(<Wrapper />)

    expect(screen.queryByTestId('slider-first-value-indicator')).toHaveTextContent('4 RAM')
    expect(screen.queryByTestId('slider-second-value-indicator')).toHaveTextContent('10 RAM')

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: '0' } })
    })

    expect(screen.queryByTestId('slider-first-value-indicator')).toHaveTextContent('1 RAM')
    expect(screen.queryByTestId('slider-second-value-indicator')).toHaveTextContent('10 RAM')

    await act(async () => {
      fireEvent.change(container.querySelectorAll('input')[1]!, { target: { value: '1000' } })
    })

    expect(screen.queryByTestId('slider-first-value-indicator')).toHaveTextContent('1 RAM')
    expect(screen.queryByTestId('slider-second-value-indicator')).toHaveTextContent('100 RAM')
  })
})

describe('Slider helper functions', () => {
  /**
   * Internal function tests
   */
  it('single value mode: getMarkMetadata returns correct metadata for the mark, given the thumb is before the mark', () => {
    const { left, isActive } = getMarkMetadata(3, 0, 10, [1, 10], false)
    expect(left).toEqual(30)
    expect(isActive).toBe(false)
  })
  it('single value mode: getMarkMetadata returns correct metadata for the mark, given the thumb is after the mark', () => {
    const { left, isActive } = getMarkMetadata(5, 0, 10, [6, 10], false)
    expect(left).toEqual(50)
    expect(isActive).toBe(true)
  })
  it('multi values mode: getMarkMetadata returns correct metadata for the mark, given the mark is after the active range', () => {
    const { left, isActive } = getMarkMetadata(3, 0, 20, [5, 10], true)
    expect(left).toEqual(15)
    expect(isActive).toBe(false)
  })
  it('multi values mode: getMarkMetadata returns correct metadata for the mark, given the mark is within active range', () => {
    const { left, isActive } = getMarkMetadata(7, 0, 20, [5, 10], true)
    expect(left).toEqual(35)
    expect(isActive).toBe(true)
  })
  it('multi values mode: getMarkMetadata returns correct metadata for the mark, given the mark is before the active range', () => {
    const { left, isActive } = getMarkMetadata(12, 0, 20, [5, 10], true)
    expect(left).toEqual(60)
    expect(isActive).toBe(false)
  })
  it('single value mode: getMarkMetadata returns correct left value for the mark, given the min value is bigger than 0', () => {
    const { left, isActive } = getMarkMetadata(3, 3, 10, [4, 10], false)
    expect(left).toEqual(0)
    expect(isActive).toBe(true)
  })
})
