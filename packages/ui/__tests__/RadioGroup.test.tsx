import React from 'react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Radio } from '../src/Radio'
import { RadioGroup } from '../src/RadioGroup'
import { testAttribute } from './helpers'

describe('RadioGroup', () => {
  it('Radio is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked value="hello" disabled label="World" />
        <Radio value="world" label="World" />
      </RadioGroup>,
    )

    const input = container.querySelector("input[value='hello']")!

    expect(input).toBeInTheDocument()
    testAttribute(input, 'disabled', '')
  })

  it('Radio is passed onChange handler, this handler is invoked', async () => {
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked value="hello" disabled label="World" />
        <Radio value="world" label="World" />
      </RadioGroup>,
    )

    expect(onChange).toBeCalledTimes(0)

    const input = container.querySelector("input[value='world']")!

    expect(input).toBeInTheDocument()

    await act(() => userEvent.click(input))

    expect(onChange).toBeCalledTimes(1)
  })
})
