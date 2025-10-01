import React from 'react'
import { X } from 'react-feather'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { screen, within } from '@testing-library/react'

import { IconButtonKind } from '../../src/components/IconButton'
import { IconButton } from '../../src'
import { testAttribute, testClass } from '../helpers'

import iconStyles from '../../src/components/Icon.module.scss'
import styles from '../../src/components/IconButton.module.scss'
import userEvent from '@testing-library/user-event'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const ariaLabel = 'X Icon'
const id = 'luke'

describe('IconButton', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => id)
  })

  const buttonKindTestData: [IconButtonKind, string][] = [
    ['primary', styles.primary],
    ['transparent', styles.transparent],
  ]

  it.each(buttonKindTestData)('Renders Button with correct className which corresponds to button kind', async (kind, className) => {
    const { container } = await renderAndCheckA11Y(<IconButton kind={kind} icon={X} ariaLabel={ariaLabel} />)

    expect(container.querySelector('button')).toHaveClass(cn(styles.iconButton, className))
  })

  it('Renders button with proper aria-label', async () => {
    await renderAndCheckA11Y(<IconButton kind="primary" icon={X} ariaLabel={ariaLabel} />)

    expect(screen.queryByLabelText(ariaLabel)).toBeInTheDocument()
  })

  it('Renders icon with proper size and iconClassName', async () => {
    const { container } = await renderAndCheckA11Y(
      <IconButton kind="primary" icon={X} ariaLabel={ariaLabel} size="xlarge" iconClassName="yoda" />,
    )

    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()

    testAttribute(icon, 'aria-hidden', 'true')
    testClass(icon, `yoda ${iconStyles.xlarge}`)
  })

  it('Renders loading button', async () => {
    const { container } = await renderAndCheckA11Y(<IconButton kind="primary" icon={X} ariaLabel={ariaLabel} loading />)

    expect(container.querySelector('button')!).toHaveAttribute('disabled')
    expect(screen.queryByTestId('tooltip-overlay')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loader')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-button-icon')).not.toBeInTheDocument()
  })

  it('Renders disabled button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const { container } = await renderAndCheckA11Y(
      <IconButton kind="primary" icon={X} ariaLabel={ariaLabel} disabled disabledTooltip={disabledTooltip} disabledTooltipVisible />,
    )

    expect(container.querySelector('button')!).toHaveAttribute('disabled')
    expect(within(screen.getByTestId('tooltip-overlay')).queryByText(disabledTooltip)).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-button-icon')).toBeInTheDocument()
  })

  it('Renders disabled loading button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const { container } = await renderAndCheckA11Y(
      <IconButton
        kind="primary"
        icon={X}
        ariaLabel={ariaLabel}
        disabled
        disabledTooltip={disabledTooltip}
        disabledTooltipVisible
        loading
      />,
    )

    expect(container.querySelector('button')!).toHaveAttribute('disabled')
    expect(within(screen.getByTestId('tooltip-overlay')).queryByText(disabledTooltip)).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-button-icon')).not.toBeInTheDocument()
  })

  it('Renders disabled loading button with a disabled tooltip and combined aria-labelledby', async () => {
    const disabledTooltip = 'Disabled tooltip'
    const ariaLabelledBy = 'darth'

    const { container } = await renderAndCheckA11Y(
      <IconButton
        kind="primary"
        icon={X}
        ariaLabelledBy={ariaLabelledBy}
        disabled
        disabledTooltip={disabledTooltip}
        disabledTooltipVisible
      />,
    )

    expect(container.querySelector('button')!).toHaveAttribute('aria-labelledby', `${ariaLabelledBy} ${id}`)
  })

  it('Renders button with a link semantics', async () => {
    const onClick = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <IconButton
        kind="primary"
        component="a"
        href="#"
        icon={X}
        ariaLabel={ariaLabel}
        onClick={onClick}
        rel={['noopener', 'noreferrer']}
        target="_blank"
      />,
    )

    expect(container.querySelector('button')).not.toBeInTheDocument()
    const link = container.querySelector('a')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', '#')
    testAttribute(link, 'target', '_blank')
    testAttribute(link, 'aria-label', ariaLabel)
    testAttribute(link, 'rel', 'noopener noreferrer')
  })

  it('Renders with a tooltip', async () => {
    const tooltip = 'Tooltip'

    await renderAndCheckA11Y(
      <IconButton kind="primary" icon={X} ariaLabel={ariaLabel} tooltip={tooltip} tooltipPlacement="bottom" tooltipVisible />,
    )

    const button = screen.getByTestId('icon-button')

    await userEvent.hover(button)
    expect(within(screen.getByTestId('tooltip-overlay')).queryByText(tooltip)).toBeInTheDocument()
  })
})
