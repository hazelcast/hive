import React from 'react'
import cn from 'classnames'
import userEvent from '@testing-library/user-event'
import { act, screen, within } from '@testing-library/react'
import { renderAndCheckA11Y } from '../../src'
import { SiFigma } from '@icons-pack/react-simple-icons'

import { LinkRel } from '../../src/components/Link'
import { EmptyState } from '../../src/components/EmptyState'

import styles from '../../src/components/EmptyState.module.scss'
import iconStyles from '../../src/components/Icon.module.scss'

// Common
const title = 'Figma'
const description =
  'Figma is a vector graphics editor and prototyping tool, with additional offline features enabled by desktop applications for macOS and Windows.'
// Icon
const icon = SiFigma
const iconLabel = 'Icon Figma'
// Action
const action = 'Cool!'
const actionHref = ''
const actionTarget = '_blank'
const actionRel: LinkRel[] = ['noopener', 'noreferrer']

describe('EmptyState', () => {
  it('Renders', async () => {
    const actionOnClick = jest.fn()

    await renderAndCheckA11Y(<EmptyState title={title} icon={icon} iconLabel={iconLabel} action={action} actionOnClick={actionOnClick} />)

    expect(screen.getByTestId('empty-state-container')).toHaveClass(cn(styles.container))

    const iconEl = screen.getByTestId('empty-state-icon')
    expect(within(iconEl).queryByLabelText(iconLabel)).toBeInTheDocument()
    expect(iconEl.querySelector('svg')!).toHaveClass(iconStyles.large)

    expect(screen.getByTestId('empty-state-title')).toHaveTextContent(title)
    expect(screen.queryByTestId('empty-state-description')).not.toBeInTheDocument()
    expect(screen.queryByTestId('empty-state-link')).not.toBeInTheDocument()

    expect(actionOnClick).toHaveBeenCalledTimes(0)

    await act(async () => userEvent.click(screen.getByTestId('empty-state-button')))

    expect(actionOnClick).toHaveBeenCalledTimes(1)
  })

  it('Renders description', async () => {
    const actionOnClick = jest.fn()

    await renderAndCheckA11Y(
      <EmptyState
        title={title}
        icon={icon}
        description={description}
        iconLabel={iconLabel}
        action={action}
        actionOnClick={actionOnClick}
      />,
    )

    expect(screen.getByTestId('empty-state-container')).toHaveClass(cn(styles.container))

    const iconEl = screen.getByTestId('empty-state-icon')
    expect(within(iconEl).queryByLabelText(iconLabel)).toBeInTheDocument()
    expect(iconEl.querySelector('svg')!).toHaveClass(iconStyles.large)

    expect(screen.getByTestId('empty-state-title')).toHaveTextContent(title)
    expect(screen.queryByTestId('empty-state-description')).toBeInTheDocument()
    expect(screen.queryByTestId('empty-state-link')).not.toBeInTheDocument()

    expect(actionOnClick).toHaveBeenCalledTimes(0)

    await act(async () => userEvent.click(screen.getByTestId('empty-state-button')))

    expect(actionOnClick).toHaveBeenCalledTimes(1)
  })

  it('Renders large size', async () => {
    const actionOnClick = jest.fn()

    await renderAndCheckA11Y(
      <EmptyState title={title} icon={icon} size="large" iconLabel={iconLabel} action={action} actionOnClick={actionOnClick} />,
    )

    expect(screen.getByTestId('empty-state-container')).toHaveClass(cn(styles.container))

    const iconEl = screen.getByTestId('empty-state-icon')
    expect(within(iconEl).queryByLabelText(iconLabel)).toBeInTheDocument()
    expect(iconEl.querySelector('svg')!).toHaveClass(iconStyles.xlarge)

    expect(screen.getByTestId('empty-state-title')).toHaveTextContent(title)
    expect(screen.queryByTestId('empty-state-description')).not.toBeInTheDocument()
    expect(screen.queryByTestId('empty-state-link')).not.toBeInTheDocument()

    expect(actionOnClick).toHaveBeenCalledTimes(0)

    await act(async () => userEvent.click(screen.getByTestId('empty-state-button')))

    expect(actionOnClick).toHaveBeenCalledTimes(1)
  })

  it('Renders horizontal', async () => {
    await renderAndCheckA11Y(
      <EmptyState
        title={title}
        icon={icon}
        direction="horizontal"
        iconLabel={iconLabel}
        action={action}
        actionHref={actionHref}
        actionTarget={actionTarget}
        actionRel={actionRel}
      />,
    )

    expect(screen.getByTestId('empty-state-container')).toHaveClass(cn(styles.container))

    const iconEl = screen.getByTestId('empty-state-icon')
    expect(within(iconEl).queryByLabelText(iconLabel)).toBeInTheDocument()
    expect(iconEl.querySelector('svg')!).toHaveClass(iconStyles.large)

    expect(screen.getByTestId('empty-state-title')).toHaveTextContent(title)
    expect(screen.queryByTestId('empty-state-description')).not.toBeInTheDocument()
    expect(screen.queryByTestId('empty-state-link')).toBeInTheDocument()
    expect(screen.queryByTestId('empty-statue-button')).not.toBeInTheDocument()
  })
})
