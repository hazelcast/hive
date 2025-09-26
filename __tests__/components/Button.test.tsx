import React from 'react'
import { X } from 'react-feather'
import { renderAndCheckA11Y } from '../../src'
import cn from 'classnames'
import { act, fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../../src'
import { testAttribute } from '../helpers'
import { ButtonColor, ButtonVariant } from '../../src/components/Button'

import styles from '../../src/components/Button.module.scss'
import loaderStyles from '../../src/components/Loader.module.scss'
import tooltipStyles from '../../src/components/Tooltip.module.scss'

const label = 'LABEL'
const ariaLabel = 'X Icon'

describe('Button', () => {
  const buttonColorTestData: [ButtonColor, string][] = [
    ['primary', styles.colorPrimary],
    ['secondary', styles.colorSecondary],
    ['warning', styles.colorWarning],
    ['brand', styles.colorBrand],
    ['authPrimary', styles.colorAuthPrimary],
    ['authSecondary', styles.colorAuthSecondary],
    ['light', styles.colorLight],
  ]
  const buttonVariantTestData: [ButtonVariant, string][] = [
    ['contained', `${styles.colorPrimary} ${styles.variantContained}`],
    ['outlined', `${styles.colorPrimary} ${styles.variantOutlined}`],
    ['text', `${styles.colorPrimary} ${styles.variantText}`],
  ]

  it.each(buttonVariantTestData)(
    'Renders Button with correct className which corresponds to button variant and default color',
    async (variant, className) => {
      await renderAndCheckA11Y(<Button variant={variant}>Label</Button>)

      expect(screen.getByTestId('button')).toHaveClass(cn(styles.button, className))
    },
  )

  it.each(buttonColorTestData)('Renders Button with correct className which corresponds to button color', async (color, className) => {
    await renderAndCheckA11Y(<Button color={color}>Label</Button>)

    expect(screen.getByTestId('button')).toHaveClass(cn(styles.button, className))
  })

  const labelTestData: [string][] = [['label'], [label], ['lAbEl']]

  it.each(labelTestData)('Renders Button with correctly capitalized label, when capitalize=true: %s', async (labelRaw) => {
    await renderAndCheckA11Y(<Button>{labelRaw}</Button>)

    expect(screen.queryByText(label)).toBeInTheDocument()
  })

  it('Renders Button', async () => {
    const label = 'label'

    await renderAndCheckA11Y(<Button>{label}</Button>)

    const button = screen.getByTestId('button')
    expect(within(button).queryByText(label.toUpperCase())).toBeInTheDocument()
    expect(button).toHaveClass(cn(styles.button, styles.colorPrimary, styles.variantContained))
    expect(button).toHaveAttribute('type', 'button')
    expect(button).not.toHaveAttribute('aria-describedby')
    expect(button).not.toHaveAttribute('rel')
    expect(button).not.toHaveAttribute('target')
    expect(button).not.toHaveAttribute('disabled')

    expect(within(button).getByTestId('button-outline')).toHaveClass(styles.outline)

    expect(within(button).queryByTestId('button-icon-left')).not.toBeInTheDocument()
    expect(within(button).queryByTestId('button-icon-right')).not.toBeInTheDocument()
  })

  it('Renders Button with original label when capitalize=false', async () => {
    const label = 'label'

    await renderAndCheckA11Y(<Button capitalize={false}>{label}</Button>)

    expect(screen.queryByText(label)).toBeInTheDocument()
  })

  it('Renders button with left icon with proper aria-label', async () => {
    await renderAndCheckA11Y(
      <Button iconLeft={X} iconLeftAriaLabel={ariaLabel}>
        {label}
      </Button>,
    )

    expect(screen.queryByText(label)).toBeInTheDocument()

    // Left
    expect(within(screen.getByTestId('button-icon-left')).queryByLabelText(ariaLabel)).toBeInTheDocument()

    // Right
    expect(screen.queryByTestId('button-icon-right')).not.toBeInTheDocument()
  })

  it('Renders button with right icon with proper aria-label', async () => {
    await renderAndCheckA11Y(
      <Button iconRight={X} iconRightAriaLabel="X Icon">
        {label}
      </Button>,
    )

    expect(screen.queryByText(label)).toBeInTheDocument()

    // Left
    expect(screen.queryByTestId('button-icon-left')).not.toBeInTheDocument()

    // Right
    expect(within(screen.getByTestId('button-icon-right')).queryByLabelText(ariaLabel)).toBeInTheDocument()
  })

  it('Renders button with left and right icons and proper aria-labels', async () => {
    await renderAndCheckA11Y(
      <Button iconLeft={X} iconLeftAriaLabel="X Icon" iconRight={X} iconRightAriaLabel="X Icon">
        {label}
      </Button>,
    )

    expect(screen.queryByText(label)).toBeInTheDocument()

    // Left
    expect(within(screen.getByTestId('button-icon-left')).queryByLabelText(ariaLabel)).toBeInTheDocument()

    // Right
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
    expect(screen.getByTestId('loader')).toHaveClass(cn(styles.iconLeft, loaderStyles.small))
  })

  it('Renders loading animation on right side (only when the right icon is used)', async () => {
    await renderAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button loading iconRight={X} iconRightAriaLabel="X Icon">
          {label}
        </Button>
      </div>,
    )

    expect(screen.getByTestId('loader')).toHaveClass(cn(styles.iconRight, loaderStyles.small))
  })

  it('Renders disabled button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    await renderAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button disabled disabledTooltip={disabledTooltip}>
          {label}
        </Button>
      </div>,
    )

    expect(screen.queryByTestId('tooltip-overlay')).not.toBeInTheDocument()
  })

  it('Renders disabled loading button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    await renderAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button disabled loading disabledTooltip={disabledTooltip} disabledTooltipVisible>
          {label}
        </Button>
      </div>,
    )

    const button = screen.getByTestId('button')
    expect(button).toHaveAttribute('disabled')

    await userEvent.hover(button)
    expect(screen.getByTestId('tooltip-overlay')).toHaveTextContent(disabledTooltip)
  })

  it('Renders disabled button, tooltip is enabled, correct tooltipVisible flag passed to TruncatedText', async () => {
    const disabledTooltip = 'Disabled tooltip'

    await renderAndCheckA11Y(
      <Button disabled disabledTooltip={disabledTooltip} disabledTooltipVisible>
        {label}
      </Button>,
    )

    const tooltip = screen.getByTestId('tooltip-overlay')
    expect(tooltip).toHaveTextContent(disabledTooltip)

    fireEvent.mouseEnter(screen.getByTestId('button'))

    expect(screen.getByTestId('tooltip-overlay')).not.toHaveClass(tooltipStyles.hidden)
  })

  it('Renders disabled button, tooltip is disabled, correct tooltipVisible flag passed to TruncatedText', async () => {
    const disabledTooltip = 'Disabled tooltip'

    await renderAndCheckA11Y(
      <Button disabled disabledTooltip={disabledTooltip} disabledTooltipVisible={false}>
        {label}
      </Button>,
    )

    fireEvent.mouseEnter(screen.getByTestId('button'))

    expect(screen.queryByTestId('tooltip-overlay')).not.toBeInTheDocument()
  })

  it('Renders a button with an inset outline', async () => {
    await renderAndCheckA11Y(<Button outline="inset">{label}</Button>)

    expect(screen.getByTestId('button-outline')).toHaveClass(cn(styles.outline, styles.inset))
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

  it('Renders button with a link semantics, check that noopener attribute is passed to a link by default', async () => {
    const onClick = jest.fn()
    await renderAndCheckA11Y(
      <Button component="a" href="#test" onClick={onClick}>
        {label}
      </Button>,
    )

    expect(screen.getByTestId('button')).toHaveAttribute('rel', 'noopener')
  })
})
