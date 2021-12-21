import React from 'react'
import { getFixedTimezoneDate, mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { CalendarHeader, CalendarHeaderProps } from '../../../src/Calendar/components/CalendarHeader'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { act } from 'react-dom/test-utils'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = getFixedTimezoneDate(timestamp)
const monthDate = getFixedTimezoneDate(timestamp)

const calendarHeaderIntrinsicProps: Omit<CalendarHeaderProps, 'date' | 'monthDate' | 'increaseMonth' | 'decreaseMonth'> = {
  changeYear: jest.fn(),
  changeMonth: jest.fn(),
  prevMonthButtonDisabled: false,
  nextMonthButtonDisabled: false,
  decreaseYear: jest.fn(),
  increaseYear: jest.fn(),
  prevYearButtonDisabled: false,
  customHeaderCount: 0,
  nextYearButtonDisabled: false,
}

describe('CalendarHeader', () => {
  it('Renders', async () => {
    const increaseMonth = jest.fn()
    const decreaseMonth = jest.fn()

    const props: CalendarHeaderProps = {
      ...calendarHeaderIntrinsicProps,
      date,
      monthDate,
      increaseMonth,
      decreaseMonth,
    }

    const wrapper = await mountAndCheckA11Y(<CalendarHeader {...props} />)

    expect(wrapper.existsDataTest('date-picker-header')).toBeTruthy()
    expect(wrapper.findDataTest('date-picker-header-icon-previous').at(0).props()).toMatchObject({
      icon: ChevronLeft,
      ariaLabel: 'Previous month',
      onClick: decreaseMonth,
    })
    expect(wrapper.findDataTest('date-picker-header-icon-next').at(0).props()).toMatchObject({
      icon: ChevronRight,
      ariaLabel: 'Next month',
      onClick: increaseMonth,
    })
  })

  it('Decrease month handler is called when "Previous" is pressed', async () => {
    const increaseMonth = jest.fn()
    const decreaseMonth = jest.fn()

    const props: CalendarHeaderProps = {
      ...calendarHeaderIntrinsicProps,
      date,
      monthDate,
      increaseMonth,
      decreaseMonth,
    }

    const wrapper = await mountAndCheckA11Y(<CalendarHeader {...props} />)

    expect(decreaseMonth).toHaveBeenCalledTimes(0)
    expect(increaseMonth).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.findDataTest('date-picker-header-icon-previous').at(0).simulate('click')
    })
    wrapper.update()

    expect(decreaseMonth).toHaveBeenCalledTimes(1)
    expect(increaseMonth).toHaveBeenCalledTimes(0)
  })

  it('Increase month handler is called when "Next" is pressed', async () => {
    const increaseMonth = jest.fn()
    const decreaseMonth = jest.fn()

    const props: CalendarHeaderProps = {
      ...calendarHeaderIntrinsicProps,
      date,
      monthDate,
      increaseMonth,
      decreaseMonth,
    }

    const wrapper = await mountAndCheckA11Y(<CalendarHeader {...props} />)

    expect(decreaseMonth).toHaveBeenCalledTimes(0)
    expect(increaseMonth).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.findDataTest('date-picker-header-icon-next').at(0).simulate('click')
    })
    wrapper.update()

    expect(decreaseMonth).toHaveBeenCalledTimes(0)
    expect(increaseMonth).toHaveBeenCalledTimes(1)
  })
})
