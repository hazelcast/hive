import { getFixedTimezoneDate } from '../../../../src/test-helpers'
import React from 'react'
import { render, act, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CalendarTimeInternal } from '../../../../src/components/Calendar/components/CalendarTime'
import { timePoints } from '../../../../src/components/Calendar/helpers/consts'

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const date = getFixedTimezoneDate(timestamp)
const value = '09:00:00'

describe('CalendarTime', () => {
  it('Renders', () => {
    const onChange = jest.fn()

    render(<CalendarTimeInternal date={date} onChange={onChange} value={value} />)

    // Time input
    const timeField = screen.queryByTestId('calendar-time-input')!

    expect(timeField).toBeInTheDocument()

    const input = timeField.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'time')
    expect(input).toHaveAttribute('value', '09:00')

    // Time point buttons
    const timePointsData = [...screen.queryByTestId('calendar-time-timePoints')!.children].map((item) => item.textContent)!
    expect(timePointsData).toStrictEqual(timePoints)
  })

  it('Change handler is called on Time Input change', async () => {
    const onChange = jest.fn()

    const { container } = render(<CalendarTimeInternal date={date} onChange={onChange} value={value} />)

    // Time input
    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'time')
    expect(input).toHaveAttribute('value', '09:00')

    expect(onChange).toHaveBeenCalledTimes(0)

    await act(async () => {
      fireEvent.change(input, { target: { value: '11:00' } })
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('11:00')
  })

  it('Change handler is called on time point press', async () => {
    const onChange = jest.fn()

    render(<CalendarTimeInternal date={date} onChange={onChange} value={value} />)

    // Time points
    expect(screen.queryByTestId('calendar-time-timePoints')).toBeInTheDocument()

    expect(onChange).toHaveBeenCalledTimes(0)

    // Grab a "random" button
    const ninthTimePointButton = screen.queryByTestId('calendar-time-timePoints')!.children[9]

    expect(ninthTimePointButton).toHaveTextContent('02:15')

    await act(() => userEvent.click(ninthTimePointButton))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('02:15')
  })
})
