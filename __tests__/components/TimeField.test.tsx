import { renderAndCheckA11Y } from '../../src/test-helpers'
import React, { useState } from 'react'
import { act, screen, fireEvent } from '@testing-library/react'
import { useUID } from 'react-uid'

import { TimeField } from '../../src/components/TimeField'

const id = 'id'
const name = 'time'
const label = 'label'
const value = '10:00'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('TimeField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => id)
  })

  it('Renders the default with correct props', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} />,
    )

    const labelEl = screen.queryByTestId('time-field-header-label')!

    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveAttribute('for', 'id')
    expect(labelEl).toHaveTextContent(label)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'id')
    expect(input).toHaveAttribute('value', '10:00')
    expect(input).toHaveAttribute('name', 'time')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('time-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'id-error')
    expect(errorEl).toHaveTextContent('')
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const Wrapper = () => {
      const [inputValue, setInputValue] = useState(value)

      return (
        <TimeField
          name={name}
          onChange={(e) => {
            setInputValue(e.target.value)
            onChange(e)
          }}
          onBlur={onBlur}
          value={inputValue}
          label={label}
        />
      )
    }

    const { container } = await renderAndCheckA11Y(<Wrapper />)

    expect(onChange).toHaveBeenCalledTimes(0)

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: '11:00' } })
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toMatchObject({ target: { value: '11:00' } })
  })

  it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} />,
    )

    expect(onBlur).toHaveBeenCalledTimes(0)

    await act(async () => {
      fireEvent.blur(container.querySelector('input')!)
    })

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('Renders error with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const error = 'Oops'

    const { container } = await renderAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} error={error} />,
    )

    const labelEl = screen.queryByTestId('time-field-header-label')!

    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveAttribute('for', 'id')
    expect(labelEl).toHaveTextContent(label)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'id')
    expect(input).toHaveAttribute('value', '10:00')
    expect(input).toHaveAttribute('name', 'time')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).toHaveAttribute('aria-errormessage', 'id-error')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('time-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'id-error')
    expect(errorEl).toHaveTextContent('Oops')
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} required />,
    )

    const labelEl = screen.queryByTestId('time-field-header-label')!

    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveAttribute('for', 'id')
    expect(labelEl).toHaveTextContent(label)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'id')
    expect(input).toHaveAttribute('value', '10:00')
    expect(input).toHaveAttribute('name', 'time')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('time-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'id-error')
    expect(errorEl).toHaveTextContent('')
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} disabled />,
    )

    const labelEl = screen.queryByTestId('time-field-header-label')!

    expect(labelEl).toBeInTheDocument()
    expect(labelEl).toHaveAttribute('for', 'id')
    expect(labelEl).toHaveTextContent(label)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'id')
    expect(input).toHaveAttribute('value', '10:00')
    expect(input).toHaveAttribute('name', 'time')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('time-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'id-error')
    expect(errorEl).toHaveTextContent('')
  })
})
