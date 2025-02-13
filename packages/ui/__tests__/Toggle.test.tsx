import React from 'react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { useUID } from 'react-uid'
import { render, screen } from '@testing-library/react'

import { helpTooltipId, errorId, Toggle } from '../src'

import styles from '../src/TextField.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Toggle', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'uuidtest')
  })

  it('Renders the default checked Toggle', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Toggle checked name="hello" onChange={onChange} label="Hello World" />)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'checkbox')
    expect(input).toHaveAttribute('name', 'hello')
    expect(input).toHaveAttribute('checked')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('id', 'uuidtest')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).not.toHaveAttribute('aria-describedby')

    const errorEl = screen.queryByTestId('toggle-error')!
    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveTextContent('')

    expect(screen.queryByTestId('toggle-helperText')).not.toBeInTheDocument()
  })

  it('Renders without the label prop', () => {
    const onChange = jest.fn()
    render(<Toggle checked={false} name="hello" onChange={onChange} />)

    expect(screen.queryByTestId('toggle-label')).not.toBeInTheDocument()
  })

  it('Renders an unchecked Toggle', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Toggle checked={false} name="hello" onChange={onChange} label="Hello World" />)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'checkbox')
    expect(input).toHaveAttribute('name', 'hello')
    expect(input).not.toHaveAttribute('checked')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('id', 'uuidtest')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).not.toHaveAttribute('aria-describedby')

    const errorEl = screen.queryByTestId('toggle-error')!
    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveTextContent('')

    expect(screen.queryByTestId('toggle-helperText')).not.toBeInTheDocument()
  })

  it('Renders a disabled Toggle', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Toggle disabled checked={false} name="hello" onChange={onChange} label="Hello World" />)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('disabled')

    const errorEl = screen.queryByTestId('toggle-error')!
    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveTextContent('')

    expect(screen.queryByTestId('toggle-helperText')).not.toBeInTheDocument()
  })

  it('Renders a Toggle with helper text', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Toggle name="hello" onChange={onChange} label="Hello World" helperText="Rocknroll" />)

    expect(container.querySelector('input')!).toHaveAttribute('aria-describedby', helpTooltipId('uuidtest'))

    const helperEl = screen.queryByTestId('toggle-helperText')!

    expect(helperEl).toBeInTheDocument()
    expect(helperEl).toHaveClass(styles.helperText)
    expect(screen.queryByTestId('tooltip-sr')).toHaveAttribute('id', 'uuidtest-help')
    expect(screen.queryByTestId('tooltip-overlay')).toHaveTextContent('Rocknroll')
  })

  it('Renders a Toggle with error', async () => {
    const onChange = jest.fn()
    const { container } = await renderAndCheckA11Y(<Toggle name="hello" onChange={onChange} label="Hello World" error="Unexpected Error" />)

    const input = container.querySelector('input')!

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-errormessage', errorId('uuidtest'))

    const errorEl = screen.queryByTestId('toggle-error')!
    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveTextContent('Unexpected Error')
  })
})
