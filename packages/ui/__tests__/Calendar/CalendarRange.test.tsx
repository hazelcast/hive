import { getFixedTimezoneDate, mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { ArrowRight } from 'react-feather'
import { CalendarRange } from '../../src/Calendar/CalendarRange'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = getFixedTimezoneDate(timestamp)

describe('CalendarRange', () => {
  it('Renders', async () => {
    const onStartDateChange = jest.fn()
    const onEndDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <CalendarRange startDate={date} onStartDateChange={onStartDateChange} endDate={date} onEndDateChange={onEndDateChange} />,
    )

    // Start
    expect(wrapper.findDataTest('calendar-range-start').at(0).props()).toMatchObject({
      date,
      onDateChange: onStartDateChange,
      selectsStart: true,
      startDate: date,
      endDate: date,
      inputLabel: 'From',
      open: undefined,
    })

    // Icon
    expect(wrapper.findDataTest('calendar-range-icon').props()).toMatchObject({
      icon: ArrowRight,
      ariaLabel: 'Arrow Right',
    })

    // End
    expect(wrapper.findDataTest('calendar-range-end').at(0).props()).toMatchObject({
      date,
      onDateChange: onEndDateChange,
      startDate: date,
      endDate: date,
      minDate: date,
      inputLabel: 'To',
      open: undefined,
    })
  })

  it('Renders with time inputs', async () => {
    const onStartDateChange = jest.fn()
    const onEndDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <CalendarRange
        startDate={date}
        onStartDateChange={onStartDateChange}
        endDate={date}
        onEndDateChange={onEndDateChange}
        showTimeInput
      />,
    )

    // Start
    expect(wrapper.findDataTest('calendar-range-start').at(0).props()).toMatchObject({
      date,
      onDateChange: onStartDateChange,
      selectsStart: true,
      startDate: date,
      endDate: date,
      inputLabel: 'From',
      showTimeInput: true,
      open: undefined,
    })

    // Icon
    expect(wrapper.findDataTest('calendar-range-icon').props()).toMatchObject({
      icon: ArrowRight,
      ariaLabel: 'Arrow Right',
    })

    // End
    expect(wrapper.findDataTest('calendar-range-end').at(0).props()).toMatchObject({
      date,
      onDateChange: onEndDateChange,
      selectsEnd: true,
      startDate: date,
      endDate: date,
      minDate: date,
      inputLabel: 'To',
      showTimeInput: true,
      open: undefined,
    })
  })
})
