import { mountAndCheckA11Y, getFixedTimezoneDate } from '@hazelcast/test-helpers'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { act } from 'react-dom/test-utils'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'react-feather'
import { Calendar } from '../../src/Calendar/Calendar'

import styleConsts from '../styles/constants/export.module.scss'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = getFixedTimezoneDate(timestamp)
const inputLabel = 'Calendar Input'

describe('Calendar', () => {
  it('Renders collapsed Calendar', async () => {
    const onDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} />)

    // ReactDatePicker
    expect(wrapper.find(ReactDatePicker).props()).toMatchObject({
      dateFormat: 'yyyy-MM-dd',
      disabled: false,
      showPopperArrow: false,
      selected: date,
    })

    // Date Input
    expect(wrapper.findDataTest('calendar-input').at(0).props()).toMatchObject({
      value: '2021-02-08',
      type: 'text',
      name: 'calendar-input',
      label: 'Calendar Input',
      inputTrailingIcon: CalendarIcon,
      inputTrailingIconLabel: 'Calendar Icon',
    })

    const datePickerPopperContainer = wrapper.findDataTest('date-picker-popper-container')
    expect(datePickerPopperContainer.exists()).toBeTruthy()
    expect(datePickerPopperContainer.children()).toHaveLength(0)
  })

  it('Renders disabled Calendar', async () => {
    const onDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Calendar disabled date={date} onDateChange={onDateChange} inputLabel={inputLabel} />)

    // ReactDatePicker
    expect(wrapper.find(ReactDatePicker).props()).toMatchObject({
      dateFormat: 'yyyy-MM-dd',
      disabled: true,
      showPopperArrow: false,
      selected: date,
    })

    // Date Input
    expect(wrapper.findDataTest('calendar-input').at(0).props()).toMatchObject({
      value: '2021-02-08',
      type: 'text',
      name: 'calendar-input',
      label: 'Calendar Input',
      inputTrailingIcon: CalendarIcon,
      inputTrailingIconLabel: 'Calendar Icon',
      disabled: true,
    })

    expect(wrapper.findDataTest('date-picker-popper-container').exists()).toBeTruthy()

    expect(wrapper.findDataTest('date-picker-popper-container').children()).toHaveLength(0)

    act(() => {
      wrapper.findDataTest('calendar-input').find('input').simulate('click')
    })
    wrapper.update()

    expect(wrapper.findDataTest('date-picker-popper-container').children()).toHaveLength(0)
  })

  it('Renders expanded Calendar', async () => {
    const onDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} />)

    // ReactDatePicker
    expect(wrapper.find(ReactDatePicker).props()).toMatchObject({
      dateFormat: 'yyyy-MM-dd',
      disabled: false,
      showPopperArrow: false,
      selected: date,
    })

    // Date Input
    expect(wrapper.findDataTest('calendar-input').at(0).props()).toMatchObject({
      value: '2021-02-08',
      type: 'text',
      name: 'calendar-input',
      label: 'Calendar Input',
      inputTrailingIcon: CalendarIcon,
      inputTrailingIconLabel: 'Calendar Icon',
    })

    act(() => {
      wrapper.findDataTest('calendar-input').find('input').simulate('click')
    })
    wrapper.update()

    const datePickerPopperContainer = wrapper.findDataTest('date-picker-popper-container')
    expect(datePickerPopperContainer.exists()).toBeTruthy()
    expect(datePickerPopperContainer.children()).not.toHaveLength(0)

    // Header
    expect(wrapper.existsDataTest('date-picker-header')).toBeTruthy()
    expect(wrapper.findDataTest('date-picker-header-icon-previous').at(0).props()).toMatchObject({
      icon: ChevronLeft,
      ariaLabel: 'Previous month',
      iconColor: styleConsts.colorPrimary,
    })
    expect(wrapper.findDataTest('date-picker-header-icon-next').at(0).props()).toMatchObject({
      icon: ChevronRight,
      ariaLabel: 'Next month',
      iconColor: styleConsts.colorPrimary,
    })
  })

  it('Renders Calendar with time input', async () => {
    const onDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} showTimeInput />)

    // ReactDatePicker
    expect(wrapper.find(ReactDatePicker).props()).toMatchObject({
      dateFormat: 'yyyy-MM-dd hh:mm a',
      disabled: false,
      showPopperArrow: false,
      selected: date,
    })

    // Date Input
    expect(wrapper.findDataTest('calendar-input').at(0).props()).toMatchObject({
      value: '2021-02-08 12:00 PM',
      type: 'text',
      name: 'calendar-input',
      label: 'Calendar Input',
      inputTrailingIcon: CalendarIcon,
      inputTrailingIconLabel: 'Calendar Icon',
    })

    act(() => {
      wrapper.findDataTest('calendar-input').find('input').simulate('click')
    })
    wrapper.update()

    const datePickerPopperContainer = wrapper.findDataTest('date-picker-popper-container')
    expect(datePickerPopperContainer.exists()).toBeTruthy()
    expect(datePickerPopperContainer.children()).not.toHaveLength(0)

    // Header
    expect(wrapper.existsDataTest('date-picker-header')).toBeTruthy()
    expect(wrapper.findDataTest('date-picker-header-icon-previous').at(0).props()).toMatchObject({
      icon: ChevronLeft,
      ariaLabel: 'Previous month',
      iconColor: styleConsts.colorPrimary,
    })
    expect(wrapper.findDataTest('date-picker-header-icon-next').at(0).props()).toMatchObject({
      icon: ChevronRight,
      ariaLabel: 'Next month',
      iconColor: styleConsts.colorPrimary,
    })

    // Time input
    expect(wrapper.existsDataTest('calendar-time')).toBeTruthy()
  })
})
