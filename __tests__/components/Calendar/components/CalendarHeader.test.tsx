import React from 'react'
import { getFixedTimezoneDate, renderAndCheckA11Y } from '../../../../src'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CalendarHeader, CalendarHeaderProps } from '../../../../src/components/Calendar/components/CalendarHeader'

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

    await renderAndCheckA11Y(<CalendarHeader {...props} />)

    expect(screen.queryByTestId('date-picker-header')).toBeInTheDocument()
    expect(screen.queryByLabelText('Previous month')).toBeInTheDocument()
    expect(screen.queryByLabelText('Next month')).toBeInTheDocument()
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

    await renderAndCheckA11Y(<CalendarHeader {...props} />)

    expect(decreaseMonth).toHaveBeenCalledTimes(0)
    expect(increaseMonth).toHaveBeenCalledTimes(0)

    await act(() => userEvent.click(screen.getByTestId('date-picker-header-icon-previous')))

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

    await renderAndCheckA11Y(<CalendarHeader {...props} />)

    expect(decreaseMonth).toHaveBeenCalledTimes(0)
    expect(increaseMonth).toHaveBeenCalledTimes(0)

    await act(() => userEvent.click(screen.getByTestId('date-picker-header-icon-next')))

    expect(decreaseMonth).toHaveBeenCalledTimes(0)
    expect(increaseMonth).toHaveBeenCalledTimes(1)
  })
})
