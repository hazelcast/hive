import React from 'react'
import { renderAndCheckA11Y } from '../../src'
import { useUID } from 'react-uid'
import { screen } from '@testing-library/react'

import { Checkbox } from '../../src/components/Checkbox'
import { errorId } from '../../src/components/Error'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Checkbox', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders the default checked checkbox', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Checkbox checked name="hello" onChange={onChange} label="Hello World" />)

    expect(screen.queryByTestId('checkbox-check')).toBeInTheDocument()
    expect(screen.queryByTestId('checkbox-minus')).not.toBeInTheDocument()

    const input = container.querySelector('input') as HTMLElement
    expect(input).toBeInTheDocument()
    expect(input).toHaveProperty('indeterminate')
  })

  it('Renders a checkbox, checks that properties are passed to an underlying input', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <Checkbox
        checked
        name="hello"
        data-test="test-e2e"
        disabled
        required
        value="world"
        onChange={onChange}
        onBlur={onBlur}
        label="Hello World"
      />,
    )

    const input = container.querySelector('input') as HTMLElement
    expect(input).toHaveAttribute('type', 'checkbox')
    expect(input).toHaveAttribute('name', 'hello')
    expect(input).toHaveAttribute('value', 'world')
    expect(input).toHaveAttribute('id', 'uuidtest')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(input).toHaveAttribute('disabled')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-errormessage')
  })

  it('Renders an invalid checkbox, checks that properties are passed to an underlying input', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <Checkbox checked error="test" name="hello" disabled value="world" onChange={onChange} onBlur={onBlur} label="Hello World" />,
    )

    const input = container.querySelector('input') as HTMLElement
    expect(input).toHaveAttribute('type', 'checkbox')
    expect(input).toHaveAttribute('name', 'hello')
    expect(input).toHaveAttribute('value', 'world')
    expect(input).toHaveAttribute('id', 'uuidtest')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-errormessage', errorId('uuidtest'))
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-required')
  })

  it('Renders the indeterminate checkbox', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(<Checkbox checked indeterminate name="hello" onChange={onChange} label="Hello World" />)

    expect(screen.queryByTestId('checkbox-check')).not.toBeInTheDocument()
    expect(screen.queryByTestId('checkbox-minus')).toBeInTheDocument()
  })

  it('Checkbox is passed a disabled property, input contains disabled property', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <Checkbox checked indeterminate name="hello" disabled onChange={onChange} label="Hello World" />,
    )

    expect(container.querySelector('input')!).toHaveAttribute('disabled')
  })

  it('Checkbox has been passed an error property, error message is displayed', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(<Checkbox name="hello" onChange={onChange} label="Hello World" error="Unexpected Error" />)

    expect(screen.queryByText('Unexpected Error')).toBeInTheDocument()
  })

  it('Checkbox has not been passed an error property, error message is not present', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(<Checkbox name="hello" onChange={onChange} label="Hello World" />)

    expect(screen.queryByText('Unexpected Error')).not.toBeInTheDocument()
  })
})
