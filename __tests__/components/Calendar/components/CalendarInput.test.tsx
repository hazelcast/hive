import { renderAndCheckA11Y } from '../../../../src'
import React from 'react'
import { screen } from '@testing-library/react'

import { CalendarInputInternal } from '../../../../src/components/Calendar/components/CalendarInput'

const label = 'InputLabel'

describe('CalendarInput', () => {
  it('Renders', async () => {
    const value = '2021-02-08'
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <CalendarInputInternal data-test="test" label={label} value={value} onChange={onChange} />,
    )

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('value', value)
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('name', 'calendar-input')
    expect(screen.queryByText(label)).toBeInTheDocument()
    expect(screen.queryByLabelText('Calendar Icon')).toBeInTheDocument()
  })
})
