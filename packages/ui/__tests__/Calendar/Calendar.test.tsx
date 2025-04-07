import React from 'react'
import { screen, within, act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { getFixedTimezoneDate, renderAndCheckA11Y } from '@hazelcast/test-helpers'

import { Calendar } from '../../src/Calendar/Calendar'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = getFixedTimezoneDate(timestamp)
const inputLabel = 'Calendar Input'

describe('Calendar', () => {
  it('Renders collapsed Calendar', async () => {
    const onDateChange = jest.fn()
    const date = new Date('2021-02-08')
    const inputLabel = 'Calendar Input'

    await renderAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} />)

    // ReactDatePicker
    const datePicker = screen.getByTestId('calendar-input')
    expect(datePicker).toBeInTheDocument()

    // Date Input
    const input = await within(datePicker).findByRole('textbox')
    expect(input).toHaveAttribute('value', '2021-02-08')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('name', 'calendar-input')
    expect(within(datePicker).getByLabelText(inputLabel)).toBeInTheDocument()

    // Check for Calendar Icon
    expect(screen.getByLabelText(/calendar icon/i)).toBeInTheDocument()

    // Date Picker Popper Container
    expect(screen.queryByTestId('date-picker-popper-container')).not.toBeInTheDocument()
  })

  it('Renders disabled Calendar', async () => {
    const onDateChange = jest.fn()

    await renderAndCheckA11Y(<Calendar disabled date={date} onDateChange={onDateChange} inputLabel={inputLabel} />)

    // ReactDatePicker
    const datePicker = screen.getByTestId('calendar-input')
    expect(datePicker).toBeInTheDocument()

    // Date Input
    const input = await within(datePicker).findByRole('textbox')
    expect(input).toHaveAttribute('value', '2021-02-08')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('name', 'calendar-input')
    expect(within(datePicker).getByLabelText(inputLabel)).toBeInTheDocument()

    // Check for Calendar Icon
    expect(screen.getByLabelText(/calendar icon/i)).toBeInTheDocument()

    // Date Picker Popper Container
    expect(screen.queryByTestId('date-picker-popper-container')).not.toBeInTheDocument()

    await act(async () => {
      await userEvent.click(input)
    })

    expect(screen.queryByTestId('date-picker-popper-container')).not.toBeInTheDocument()
  })

  it('Renders expanded Calendar', async () => {
    const onDateChange = jest.fn()

    await renderAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} />)

    // ReactDatePicker
    const datePicker = screen.getByTestId('calendar-input')
    expect(datePicker).toBeInTheDocument()

    // Date Input
    const input = await within(datePicker).findByRole('textbox')
    expect(input).toHaveAttribute('value', '2021-02-08')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('name', 'calendar-input')
    expect(within(datePicker).getByLabelText(inputLabel)).toBeInTheDocument()

    // Check for Calendar Icon
    expect(screen.getByLabelText(/calendar icon/i)).toBeInTheDocument()

    // Date Picker Popper Container
    expect(screen.queryByTestId('date-picker-popper-container')).not.toBeInTheDocument()

    await act(async () => {
      await userEvent.click(input)
    })

    expect(screen.queryByTestId('date-picker-popper-container')).toBeInTheDocument()

    // Header
    const header = screen.getByTestId('date-picker-header')

    // Previous month icon
    const previousIcon = within(header).getByTestId('date-picker-header-icon-previous')
    expect(previousIcon).toHaveAttribute('aria-label', 'Previous month')

    // Next month icon
    const nextIcon = within(header).getByTestId('date-picker-header-icon-next')
    expect(nextIcon).toHaveAttribute('aria-label', 'Next month')
  })

  it('Renders Calendar with time input', async () => {
    const onDateChange = jest.fn()

    await renderAndCheckA11Y(<Calendar date={date} onDateChange={onDateChange} inputLabel={inputLabel} showTimeInput />)

    // ReactDatePicker
    const datePicker = screen.getByTestId('calendar-input')
    expect(datePicker).toBeInTheDocument()

    // Date Input
    const input = await within(datePicker).findByRole('textbox')
    expect(input).toHaveAttribute('value', '2021-02-08 12:00')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('name', 'calendar-input')
    expect(within(datePicker).getByLabelText(inputLabel)).toBeInTheDocument()

    await act(async () => {
      await userEvent.click(input)
    })

    expect(screen.queryByTestId('date-picker-popper-container')).toBeInTheDocument()

    // Header
    const header = screen.getByTestId('date-picker-header')

    // Previous month icon
    const previousIcon = within(header).getByTestId('date-picker-header-icon-previous')
    expect(previousIcon).toHaveAttribute('aria-label', 'Previous month')

    // Next month icon
    const nextIcon = within(header).getByTestId('date-picker-header-icon-next')
    expect(nextIcon).toHaveAttribute('aria-label', 'Next month')

    // Time input
    expect(screen.queryByTestId('calendar-time')).toBeInTheDocument()
  })
})
