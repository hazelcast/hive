import React from 'react'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { act, within, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { testAttribute, testClass } from '../helpers'
import { PasswordField } from '../../src/components/PasswordField'

import iconStyles from '../../src/components/Icon.module.scss'
import styles from '../../src/components/PasswordField.module.scss'
import iconButtonStyles from '../../src/components/IconButton.module.scss'

describe('PasswordField', () => {
  it('renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <PasswordField
        name="name"
        value="password"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        className="padme"
        inputClassName="amidala"
      />,
    )

    const input = container.querySelector('input') as HTMLInputElement

    expect(input).toBeInTheDocument()

    testAttribute(input, 'placeholder', 'Enter the name')
    testAttribute(input, 'value', 'password')
    testAttribute(input, 'name', 'name')
    testClass(input, 'amidala')
    testClass(input.parentNode, styles.inputContainer)
    testClass(screen.getByTestId('password-field'), 'padme')
    expect(within(container).queryByText('Wisest jedi')).toBeInTheDocument()

    const toggle = within(container).queryByTestId('password-field-toggle')

    expect(toggle).toBeInTheDocument()
    testAttribute(toggle, 'aria-label', 'Show password')
    testAttribute(toggle, 'type', 'button')
    testAttribute(toggle, 'disabled')
    testClass(toggle, styles.toggle)
    testClass(toggle, iconButtonStyles.primary)

    const icon = toggle!.querySelector('svg')

    expect(icon).toBeInTheDocument()
    testClass(icon, iconStyles.small)
  })

  it('visibility toggle works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <PasswordField name="name" value="password" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    const toggle = within(container).queryByTestId('password-field-toggle')

    expect(toggle).toBeInTheDocument()

    const input = container.querySelector('input')

    expect(input).toBeInTheDocument()
    testAttribute(input, 'type', 'password')
    testAttribute(toggle, 'aria-label', 'Show password')

    await act(() => userEvent.click(toggle!))

    testAttribute(input, 'type', 'text')
    testAttribute(toggle, 'aria-label', 'Hide password')

    await act(() => userEvent.click(toggle!))

    testAttribute(input, 'type', 'password')
    testAttribute(toggle, 'aria-label', 'Show password')
  })

  it('provides overrides for visibility toggle aria labels', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <PasswordField
        name="name"
        value="password"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        hideIconLabel="Hide death star"
        showIconLabel="Show death star"
      />,
    )

    const toggle = within(container).queryByTestId('password-field-toggle')

    expect(toggle).toBeInTheDocument()
    testAttribute(toggle, 'aria-label', 'Show death star')

    await act(() => userEvent.click(toggle!))

    testAttribute(toggle, 'aria-label', 'Hide death star')

    await act(() => userEvent.click(toggle!))

    testAttribute(toggle, 'aria-label', 'Show death star')
  })

  it('visibility toggle is disabled if input is disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <PasswordField
        name="name"
        value="password"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        disabled
      />,
    )

    const toggle = within(container).queryByTestId('password-field-toggle')

    expect(toggle).toBeInTheDocument()
    testAttribute(toggle, 'disabled', '')
  })

  it('hides toggle button', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <PasswordField
        name="name"
        value="password"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        hideToggle
        disabled
      />,
    )

    const toggle = within(container).queryByTestId('password-field-toggle')

    expect(toggle).not.toBeInTheDocument()
  })
})
