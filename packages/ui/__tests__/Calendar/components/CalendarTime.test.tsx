import { getFixedTimezoneDate } from '@hazelcast/test-helpers'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { CalendarTimeInternal } from '../../../src/Calendar/components/CalendarTime'
import { TimeField } from '../../../src/TimeField'
import { timePoints } from '../../../src/Calendar/helpers/consts'
import { Button } from '../../../src'
import { mount, shallow } from 'enzyme'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = getFixedTimezoneDate(timestamp)
const value = '09:00:00'

describe('CalendarTime', () => {
  it('Renders', () => {
    const onChange = jest.fn()

    const wrapper = shallow(<CalendarTimeInternal date={date} onChange={onChange} value={value} />)

    // Time input
    expect(wrapper.find(TimeField).props()).toMatchObject({
      name: 'time',
      value,
    })

    // Time point buttons
    const timePointsData = wrapper
      .findDataTest('calendar-time-timePoints')
      .children()
      .map((child) => child.text())
    expect(timePointsData).toStrictEqual(timePoints)
  })

  it('Change handler is called on Time Input change', () => {
    const onChange = jest.fn()

    const wrapper = mount(<CalendarTimeInternal date={date} onChange={onChange} value={value} />)

    // Time input
    expect(wrapper.find(TimeField).props()).toMatchObject({
      name: 'time',
      value,
    })

    expect(onChange).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper
        .find(TimeField)
        .find('input')
        .simulate('change', { target: { value: '11:00' } })
    })
    wrapper.update()

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('11:00')
  })

  it('Change handler is called on time point press', () => {
    const onChange = jest.fn()

    const wrapper = shallow(<CalendarTimeInternal date={date} onChange={onChange} value={value} />)

    // Time points
    expect(wrapper.existsDataTest('calendar-time-timePoints'))

    expect(onChange).toHaveBeenCalledTimes(0)

    // Grab a "random" button
    const ninthTimePointButton = wrapper.findDataTest('calendar-time-timePoints').find(Button).at(9)

    expect(ninthTimePointButton.text()).toBe('02:15')

    act(() => {
      ninthTimePointButton.simulate('click')
    })
    wrapper.update()

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('02:15')
  })
})
