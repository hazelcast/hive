import React from 'react'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import postcss from 'postcss'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { useUID } from 'react-uid'
import { render, screen } from '@testing-library/react'

import { helpTooltipId, errorId, Toggle } from '../../src'

import styles from '../../src/components/Toggle.module.css'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('Toggle', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'uuidtest')
  })

  it('keeps the thumb visible against the dark-mode track', () => {
    const css = readFileSync(join(__dirname, '../../src/components/Toggle.module.css'), 'utf8')
    const rules = postcss.parse(css).nodes.filter((node) => node.type === 'rule')
    const wrapperRule = rules.find((node) => node.selector === '.wrapper')
    const thumbRule = rules.find((node) => node.selector === '.toggleTrack::before')
    const disabledTrackRule = rules.find((node) => node.selector?.includes('input:disabled + label .toggleTrack,'))
    const disabledThumbRule = rules.find(
      (node) => node.selector?.includes('input:disabled + label .toggleTrack::before'),
    )
    const trackBackground = wrapperRule?.nodes?.find((node) => node.type === 'decl' && node.prop === '--toggle-track-bg')
    const thumbBackground = wrapperRule?.nodes?.find((node) => node.type === 'decl' && node.prop === '--toggle-thumb-bg')
    const thumbBorder = thumbRule?.nodes?.find((node) => node.type === 'decl' && node.prop === 'border')
    const disabledTrackBackground = disabledTrackRule?.nodes?.find((node) => node.type === 'decl' && node.prop === 'background')
    const disabledThumbBackground = disabledThumbRule?.nodes?.find((node) => node.type === 'decl' && node.prop === 'background')

    expect(trackBackground?.value).toBe('light-dark(var(--hive-color-neutral-v4-light-mode), var(--hive-color-border-v4-dark-mode))')
    expect(thumbBackground?.value).toBe('var(--hive-color-neutral-white-v4-light-mode)')
    expect(thumbBorder?.value).toBe('var(--hive-border-width) solid var(--hive-color-neutral-white-v4-light-mode)')
    expect(disabledTrackBackground?.value).toBe('var(--toggle-track-bg)')
    expect(disabledThumbBackground?.value).toBe('var(--hive-color-neutral-white-v4-light-mode)')
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
