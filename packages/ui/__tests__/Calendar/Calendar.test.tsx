import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { act } from 'react-dom/test-utils'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'react-feather'
import { Calendar } from '../../src/Calendar/Calendar'

import styleConsts from '../styles/constants/export.module.scss'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
// TODO: Check potential failures in different timezones
const date = new Date(timestamp)

describe('Calendar', () => {
  it('Renders basic collapsed input', async () => {
    const onDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} />)

    // ReactDatePicker
    expect(wrapper.find(ReactDatePicker).props()).toMatchObject({
      dateFormat: 'yyyy-MM-dd HH:mm',
      disabled: false,
      showPopperArrow: false,
      popperPlacement: 'auto',
      selected: date,
    })

    // Date Input
    expect(wrapper.findDataTest('date-picker-input').at(0).props()).toMatchObject({
      // TODO: The value is incorrect
      value: '2021-02-08 10:00',
      type: 'text',
      name: 'date-picker-input',
      label: 'Date picker input',
      inputTrailingIcon: CalendarIcon,
      inputTrailingIconLabel: 'Calendar Icon',
      inputTrailingIconColor: styleConsts.colorPrimary,
    })

    const datePickerPopperContainer = wrapper.findDataTest('date-picker-popper-container')
    expect(datePickerPopperContainer.exists()).toBeTruthy()
    expect(datePickerPopperContainer.children()).toHaveLength(0)
  })

  it('Renders basic disabled input', async () => {
    const onDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Calendar disabled date={date} onDateChange={onDateChange} />)

    // ReactDatePicker
    expect(wrapper.find(ReactDatePicker).props()).toMatchObject({
      dateFormat: 'yyyy-MM-dd HH:mm',
      disabled: true,
      showPopperArrow: false,
      popperPlacement: 'auto',
      selected: date,
    })

    // Date Input
    expect(wrapper.findDataTest('date-picker-input').at(0).props()).toMatchObject({
      // TODO: The value is incorrect
      value: '2021-02-08 10:00',
      type: 'text',
      name: 'date-picker-input',
      label: 'Date picker input',
      inputTrailingIcon: CalendarIcon,
      inputTrailingIconLabel: 'Calendar Icon',
      inputTrailingIconColor: styleConsts.colorPrimary,
      disabled: true,
    })

    expect(wrapper.findDataTest('date-picker-popper-container').exists()).toBeTruthy()

    expect(wrapper.findDataTest('date-picker-popper-container').children()).toHaveLength(0)

    act(() => {
      wrapper.findDataTest('date-picker-input').find('input').simulate('click')
    })
    wrapper.update()

    expect(wrapper.findDataTest('date-picker-popper-container').children()).toHaveLength(0)
  })

  it('Renders basic expanded input', async () => {
    const onDateChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} />)

    // ReactDatePicker
    expect(wrapper.find(ReactDatePicker).props()).toMatchObject({
      dateFormat: 'yyyy-MM-dd HH:mm',
      disabled: false,
      showPopperArrow: false,
      popperPlacement: 'auto',
      selected: date,
    })

    // Date Input
    expect(wrapper.findDataTest('date-picker-input').at(0).props()).toMatchObject({
      // TODO: The value is incorrect
      value: '2021-02-08 10:00',
      type: 'text',
      name: 'date-picker-input',
      label: 'Date picker input',
      inputTrailingIcon: CalendarIcon,
      inputTrailingIconLabel: 'Calendar Icon',
      inputTrailingIconColor: styleConsts.colorPrimary,
    })

    act(() => {
      wrapper.findDataTest('date-picker-input').find('input').simulate('click')
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
})
