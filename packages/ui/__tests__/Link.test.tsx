import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { ChevronRight } from 'react-feather'

import { Link } from '../src/Link'

import styles from '../src/Link.module.scss'

describe('Link', () => {
  it('Renders regular Link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(<Link href="https://hazelcast.com/">Regular Link</Link>)

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: styles.regular,
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      children: 'Regular Link',
    })
  })

  it('Renders regular Link with Icon with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/">
        Regular Link with Icon
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toMatchObject({
      className: styles.regular,
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
    })

    expect(anchor.text()).toBe('Regular Link with Icon')
    expect(anchor.find(ChevronRight).props()).toEqual({
      'aria-label': 'Chevron right',
      className: styles.icon,
    })
  })

  it('Renders small Link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link size="small" href="https://hazelcast.com/">
        Small Link
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: styles.small,
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      children: 'Small Link',
    })
  })

  it('Renders small Link with Icon with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link size="small" Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/">
        Small Link with Icon
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toMatchObject({
      className: styles.small,
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
    })

    expect(anchor.text()).toBe('Small Link with Icon')
    expect(anchor.find(ChevronRight).props()).toEqual({
      'aria-label': 'Chevron right',
      className: styles.icon,
    })
  })
})
