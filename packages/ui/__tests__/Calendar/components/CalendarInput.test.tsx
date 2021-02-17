import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { Calendar } from 'react-feather'
import { TextField } from '../../../src'
import { CalendarInputInternal } from '../../../src/Calendar/components/CalendarInput'

const label = 'InputLabel'

// TODO: Add change handler test
describe('CalendarInput', () => {
  it('Renders', async () => {
    const value = '2021-02-08'
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<CalendarInputInternal label={label} value={value} onChange={onChange} />)

    expect(wrapper.find(TextField).props()).toMatchObject({
      value,
      type: 'text',
      name: 'calendar-input',
      label,
      inputTrailingIcon: Calendar,
      inputTrailingIconLabel: 'Calendar Icon',
    })
  })
})
