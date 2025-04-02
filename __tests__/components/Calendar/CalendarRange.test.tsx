import { getFixedTimezoneDate, renderAndCheckA11Y } from '../../../src'
import React from 'react'
import { screen, within } from '@testing-library/react'

import { CalendarRange } from '../../../src/components/Calendar/CalendarRange'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = getFixedTimezoneDate(timestamp)

describe('CalendarRange', () => {
  it('Renders', async () => {
    const onStartDateChange = jest.fn()
    const onEndDateChange = jest.fn()

    await renderAndCheckA11Y(
      <CalendarRange startDate={date} onStartDateChange={onStartDateChange} endDate={date} onEndDateChange={onEndDateChange} />,
    )

    // Start
    const start = screen.getByTestId('calendar-range-start-input')!

    expect(start).toBeInTheDocument()
    expect(within(start).queryByText('From')).toBeInTheDocument()
    expect(within(start).queryByDisplayValue('2021-02-08')).toBeInTheDocument()

    // Icon
    const icon = screen.queryByTestId('calendar-range-icon')!

    expect(icon).toBeInTheDocument()
    expect(icon.querySelector('svg')).toHaveAttribute('aria-label', 'Arrow Right')

    // End
    const end = screen.queryByTestId('calendar-range-end-input')!

    expect(end).toBeInTheDocument()
    expect(within(end).queryByText('To')).toBeInTheDocument()
    expect(within(end).queryByDisplayValue('2021-02-08')).toBeInTheDocument()
  })

  it('Renders with time inputs', async () => {
    const onStartDateChange = jest.fn()
    const onEndDateChange = jest.fn()

    await renderAndCheckA11Y(
      <CalendarRange
        startDate={date}
        onStartDateChange={onStartDateChange}
        endDate={date}
        onEndDateChange={onEndDateChange}
        showTimeInput
      />,
    )

    // Start
    const start = screen.getByTestId('calendar-range-start-input')!

    expect(start).toBeInTheDocument()
    expect(within(start).queryByText('From')).toBeInTheDocument()
    expect(within(start).queryByDisplayValue('2021-02-08 12:00')).toBeInTheDocument()

    // Icon
    const icon = screen.queryByTestId('calendar-range-icon')!

    expect(icon).toBeInTheDocument()
    expect(icon.querySelector('svg')).toHaveAttribute('aria-label', 'Arrow Right')

    // End
    const end = screen.queryByTestId('calendar-range-end-input')!

    expect(end).toBeInTheDocument()
    expect(within(end).queryByText('To')).toBeInTheDocument()
    expect(within(start).queryByDisplayValue('2021-02-08 12:00')).toBeInTheDocument()
  })
})
