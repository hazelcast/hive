import React from 'react'
import cn from 'classnames'
import { ChevronRight } from 'react-feather'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Link } from '../../src/components/Link'
import { testAttribute, testClass, testContent } from '../helpers'

import styles from '../../src/components/Link.module.scss'
import iconStyles from '../../src/components/Icon.module.scss'

describe('Link', () => {
  it('Renders normal Link with correct props', async () => {
    await renderAndCheckA11Y(<Link href="https://hazelcast.com/">Normal Text Link</Link>)

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'noopener')
    testAttribute(link, 'target', '_self')
    testContent(link, 'Normal Text Link')
  })

  it('Renders normal Link with Icon with correct props', async () => {
    await renderAndCheckA11Y(
      <Link icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
        Normal Text Link with Icon
      </Link>,
    )

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'noopener')
    testAttribute(link, 'target', '_self')
    testContent(link, 'Normal Text Link')
    testClass(link, cn(styles.link, styles.normal, styles.primary))

    expect(screen.getByLabelText('Chevron right')).toHaveClass(iconStyles.medium)
  })

  it('Renders small Link with correct props', async () => {
    await renderAndCheckA11Y(
      <Link size="small" href="https://hazelcast.com/">
        Small Link
      </Link>,
    )

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'noopener')
    testAttribute(link, 'target', '_self')
    testContent(link, 'Small Link')
    testClass(link, cn(styles.link, styles.small, styles.primary))
  })

  it('Renders small Link with Icon with correct props', async () => {
    await renderAndCheckA11Y(
      <Link size="small" icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
        Small Text Link with Icon
      </Link>,
    )

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'noopener')
    testAttribute(link, 'target', '_self')
    testContent(link, 'Small Text Link with Icon')
    testClass(link, cn(styles.link, styles.small, styles.primary))

    expect(screen.getByLabelText('Chevron right')).toHaveClass(iconStyles.small)
  })

  it('Renders bold Link with correct props', async () => {
    await renderAndCheckA11Y(
      <Link bold href="https://hazelcast.com/">
        Bold Link
      </Link>,
    )

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'noopener')
    testAttribute(link, 'target', '_self')
    testContent(link, 'Bold Link')
    testClass(link, cn(styles.link, styles.bold, styles.primary))
  })

  it('Renders bold Link with Icon with correct props', async () => {
    await renderAndCheckA11Y(
      <Link bold icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
        Bold Text Link with Icon
      </Link>,
    )

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'noopener')
    testAttribute(link, 'target', '_self')
    testContent(link, 'Bold Text Link with Icon')
    testClass(link, cn(styles.link, styles.bold, styles.primary))
    expect(screen.getByLabelText('Chevron right')).toHaveClass(iconStyles.medium)
  })

  it('Renders a secondary normal Link with correct props', async () => {
    await renderAndCheckA11Y(
      <Link kind="secondary" href="https://hazelcast.com/">
        Normal Text Link
      </Link>,
    )

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'noopener')
    testAttribute(link, 'target', '_self')
    testContent(link, 'Normal Text Link')
    testClass(link, cn(styles.link, styles.normal, styles.secondary))
  })

  it('Allows custom rel and target', async () => {
    await renderAndCheckA11Y(
      <Link href="https://hazelcast.com/" rel={['help', 'noreferrer']} target="_parent">
        Normal Text Link
      </Link>,
    )

    const link = screen.queryByTestId('link')

    expect(link).toBeInTheDocument()
    testAttribute(link, 'href', 'https://hazelcast.com/')
    testAttribute(link, 'rel', 'help noreferrer')
    testAttribute(link, 'target', '_parent')
    testContent(link, 'Normal Text Link')
    testClass(link, cn(styles.link, styles.normal, styles.primary))
  })

  it('Renders Link with button semantics', async () => {
    const onClick = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <Link component="button" onClick={onClick}>
        Normal Text Link
      </Link>,
    )

    expect(container.querySelector('a')).not.toBeInTheDocument()
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it('Renders Link with button semantics, proper props are passed to a button', async () => {
    const onClick = jest.fn()
    const { container } = await renderAndCheckA11Y(
      <Link component="button" onClick={onClick}>
        Normal Text Link
      </Link>,
    )

    expect(onClick).toHaveBeenCalledTimes(0)

    const button = container.querySelector('button') as HTMLElement
    expect(button).not.toHaveAttribute('rel')
    expect(button).not.toHaveAttribute('target')

    await userEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
