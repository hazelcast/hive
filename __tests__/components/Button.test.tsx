import React from 'react'
import { X } from 'react-feather'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../../src'
import { testAttribute } from '../helpers'
import { ButtonColor, ButtonVariant } from '../../src/components/Button'

const label = 'LABEL'
const ariaLabel = 'X Icon'

describe('Button', () => {
  it('Renders Button', async () => {
    const labelRaw = 'label'

    await renderAndCheckA11Y(<Button>{labelRaw}</Button>)

    const button = screen.getByTestId('button')
    expect(within(button).queryByText(labelRaw.toUpperCase())).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
    expect(button).not.toHaveAttribute('aria-describedby')
    expect(button).not.toHaveAttribute('rel')
    expect(button).not.toHaveAttribute('target')
    expect(button).not.toHaveAttribute('disabled')

    expect(within(button).queryByTestId('button-icon-left')).not.toBeInTheDocument()
    expect(within(button).queryByTestId('button-icon-right')).not.toBeInTheDocument()
  })

  it.each<ButtonVariant>(['contained', 'outlined', 'text'])('Renders Button with variant: %s', async (variant) => {
    await renderAndCheckA11Y(<Button variant={variant}>Label</Button>)

    expect(screen.getByTestId('button')).toBeInTheDocument()
  })

  it.each<ButtonColor>(['primary', 'secondary', 'warning', 'brand', 'authPrimary', 'authSecondary', 'light'])(
    'Renders Button with color: %s',
    async (color) => {
      await renderAndCheckA11Y(<Button color={color}>Label</Button>)

      expect(screen.getByTestId('button')).toBeInTheDocument()
    },
  )

  it('Renders Button with original label when capitalize=false', async () => {
    const labelRaw = 'label'

    await renderAndCheckA11Y(<Button capitalize={false}>{labelRaw}</Button>)

    expect(screen.queryByText(labelRaw)).toBeInTheDocument()
  })

  it('Renders button with left icon with proper aria-label', async () => {
    await renderAndCheckA11Y(
      <Button iconLeft={X} iconLeftAriaLabel={ariaLabel}>
        {label}
      </Button>,
    )

    expect(screen.queryByText(label)).toBeInTheDocument()
    expect(within(screen.getByTestId('button-icon-left')).queryByLabelText(ariaLabel)).toBeInTheDocument()
    expect(screen.queryByTestId('button-icon-right')).not.toBeInTheDocument()
  })

  it('Renders button with right icon with proper aria-label', async () => {
    await renderAndCheckA11Y(
      <Button iconRight={X} iconRightAriaLabel="X Icon">
        {label}
      </Button>,
    )

    expect(screen.queryByText(label)).toBeInTheDocument()
    expect(screen.queryByTestId('button-icon-left')).not.toBeInTheDocument()
    expect(within(screen.getByTestId('button-icon-right')).queryByLabelText(ariaLabel)).toBeInTheDocument()
  })

  it('Renders button with left and right icons and proper aria-labels', async () => {
    await renderAndCheckA11Y(
      <Button iconLeft={X} iconLeftAriaLabel="X Icon" iconRight={X} iconRightAriaLabel="X Icon">
        {label}
      </Button>,
    )

    expect(screen.queryByText(label)).toBeInTheDocument()
    expect(within(screen.getByTestId('button-icon-left')).queryByLabelText(ariaLabel)).toBeInTheDocument()
    expect(within(screen.getByTestId('button-icon-right')).queryByLabelText(ariaLabel)).toBeInTheDocument()
  })

  it('Renders loading button', async () => {
    await renderAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button loading>{label}</Button>
      </div>,
    )

    expect(screen.getByTestId('button')).toHaveAttribute('disabled')
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('Renders disabled button with a disabled tooltip (hidden by default)', async () => {
    const disabledTooltip = 'Disabled tooltip'

    await renderAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button disabled disabledTooltip={disabledTooltip}>
          {label}
        </Button>
      </div>,
    )

    // Tooltip is hover-controlled when disabledTooltipVisible is not set
    expect(screen.queryByText(disabledTooltip)).not.toBeInTheDocument()
  })

  it('Renders disabled button, tooltip is force-shown via disabledTooltipVisible', async () => {
    const disabledTooltip = 'Disabled tooltip'

    await renderAndCheckA11Y(
      <Button disabled disabledTooltip={disabledTooltip} disabledTooltipVisible>
        {label}
      </Button>,
    )

    expect(screen.getByText(disabledTooltip)).toBeInTheDocument()
  })

  it('Renders disabled button, tooltip is force-hidden via disabledTooltipVisible=false', async () => {
    const disabledTooltip = 'Disabled tooltip'

    await renderAndCheckA11Y(
      <Button disabled disabledTooltip={disabledTooltip} disabledTooltipVisible={false}>
        {label}
      </Button>,
    )

    expect(screen.queryByText(disabledTooltip)).not.toBeInTheDocument()
  })

  it('Renders button with data-active attribute when active=true', async () => {
    await renderAndCheckA11Y(<Button active>{label}</Button>)

    expect(screen.getByTestId('button')).toHaveAttribute('data-active')
  })

  it('Does not render data-active attribute when active=false', async () => {
    await renderAndCheckA11Y(<Button active={false}>{label}</Button>)

    expect(screen.getByTestId('button')).not.toHaveAttribute('data-active')
  })

  it('Renders button with a link semantics', async () => {
    await renderAndCheckA11Y(
      <Button component="a" href="#test">
        {label}
      </Button>,
    )

    expect(screen.getByTestId('button')).toHaveAttribute('href', '#test')
  })

  it('Renders button with a link semantics, proper parameters are passed to an anchor', async () => {
    const onClick = jest.fn()
    await renderAndCheckA11Y(
      <Button component="a" href="#test" onClick={onClick} rel={['noopener', 'noreferrer']} target="_blank">
        {label}
      </Button>,
    )

    expect(onClick).toHaveBeenCalledTimes(0)

    const link = screen.getByTestId('button')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', '#test')
    testAttribute(link, 'target', '_blank')
    testAttribute(link, 'rel', 'noopener noreferrer')

    await act(async () => await userEvent.click(link))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('Renders button with a default button semantics, link specific params are undefined', async () => {
    await renderAndCheckA11Y(<Button>{label}</Button>)

    const button = screen.getByTestId('button')
    expect(button).not.toHaveAttribute('rel')
    expect(button).not.toHaveAttribute('target')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('Renders button with a link semantics, noopener attribute is passed by default', async () => {
    const onClick = jest.fn()
    await renderAndCheckA11Y(
      <Button component="a" href="#test" onClick={onClick}>
        {label}
      </Button>,
    )

    expect(screen.getByTestId('button')).toHaveAttribute('rel', 'noopener')
  })
})
