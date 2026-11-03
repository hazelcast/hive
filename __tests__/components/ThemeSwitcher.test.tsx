import React, { useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { ThemeSwitcher } from '../../src/components/ThemeSwitcher'
import { ThemePreference } from '../../src/utils/colorScheme'

describe('ThemeSwitcher', () => {
  it('has no detected accessibility violations while open', async () => {
    const user = userEvent.setup()
    render(<ThemeSwitcher value="system" onChange={jest.fn()} />)
    await user.click(screen.getByRole('button'))
    const results = await axe(document.body, { rules: { region: { enabled: false } } })
    expect(results.violations).toEqual([])
  })

  it('opens a single-choice menu and emits the selected preference', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<ThemeSwitcher value="system" onChange={onChange} />)
    const trigger = screen.getByRole('button', { name: 'Color theme: System' })
    await user.click(trigger)
    expect(screen.getByRole('menuitemradio', { name: 'System' })).toHaveAttribute('aria-checked', 'true')
    await user.click(screen.getByRole('menuitemradio', { name: 'Dark' }))
    expect(onChange).toHaveBeenCalledWith('dark')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('focuses the selected option without scrolling the page', async () => {
    const user = userEvent.setup()
    const focus = jest.spyOn(HTMLElement.prototype, 'focus')
    render(<ThemeSwitcher value="system" onChange={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Color theme: System' }))

    expect(focus).toHaveBeenCalledWith({ preventScroll: true })
    focus.mockRestore()
  })

  it('supports arrows, selection and Escape with focus return', async () => {
    const user = userEvent.setup()
    const Controlled = () => {
      const [value, onChange] = useState<ThemePreference>('light')
      return <ThemeSwitcher value={value} onChange={onChange} />
    }
    render(<Controlled />)
    const trigger = screen.getByRole('button', { name: 'Color theme: Light' })
    trigger.focus()
    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(screen.getByRole('menuitemradio', { name: 'Light' })).toHaveFocus())
    await user.keyboard('{ArrowDown}{Enter}')
    expect(trigger).toHaveAccessibleName('Color theme: Dark')
    await user.click(trigger)
    await user.keyboard('{End}')
    expect(screen.getByRole('menuitemradio', { name: 'System' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('does not open when disabled', () => {
    render(<ThemeSwitcher value="light" onChange={jest.fn()} disabled />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
