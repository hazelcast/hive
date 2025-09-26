import React from 'react'
import { renderAndCheckA11Y } from '../../src'
import { useUID } from 'react-uid'
import { screen } from '@testing-library/react'

import { Help, Radio, RadioGroup } from '../../src'
import { testAttribute } from '../helpers'

jest.mock('react-uid')
jest.mock('../../src/components/Help', () => {
  return {
    Help: jest.fn(() => null),
    helpTooltipId: jest.fn(() => ''),
  }
})

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Radio', () => {
  it('Renders the default radio', async () => {
    useUIDMock.mockImplementation(() => 'uuidtest')

    const onChange = jest.fn()
    const onBlur = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange} data-test="test-e2e-group">
        <Radio checked disabled value="world" onBlur={onBlur} label="Hello World" data-test="test-e2e" />
      </RadioGroup>,
    )

    expect(screen.queryByTestId('test-e2e-group')).toBeInTheDocument()
    expect(screen.queryByTestId('test-e2e')).toBeInTheDocument()

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()

    testAttribute(input, 'type', 'radio')
    testAttribute(input, 'name', 'hello')
    testAttribute(input, 'value', 'world')
    testAttribute(input, 'checked', '')
    testAttribute(input, 'disabled', '')
    testAttribute(input, 'required')
    testAttribute(input, 'aria-describedby')
    testAttribute(input, 'id', 'uuidtest')
  })

  it('Radio is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked value="hello" disabled label="Hello World" />
      </RadioGroup>,
    )

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    testAttribute(input, 'disabled', '')
  })

  it('Radio is passed helperText, Help component is present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const helperText = 'This is a helper text.'
    await renderAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked disabled value="world" helperText={helperText} onBlur={onBlur} label="Hello World" />
      </RadioGroup>,
    )

    expect(Help).toHaveBeenCalled()
  })

  it('Radio is not passed helperText, Help component is not present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    await renderAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked disabled value="world" onBlur={onBlur} label="Hello World" />
      </RadioGroup>,
    )

    expect(Help).not.toHaveBeenCalled()
  })

  it('Radio is passed a label, label text is present', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    await renderAndCheckA11Y(
      <RadioGroup name="hello" onChange={onChange}>
        <Radio checked disabled value="world" helperText="This is a helper text." onBlur={onBlur} label="Hello World" />
      </RadioGroup>,
    )

    expect(screen.queryByText('Hello World')).toBeInTheDocument()
  })
})
