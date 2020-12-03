import React from 'react'
import cn from 'classnames'
import { ChevronRight } from 'react-feather'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Link } from '../src/Link'
import { Icon } from '../src/Icon'

import styles from '../src/Link.module.scss'

describe('Link', () => {
  it('Renders normal Link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(<Link href="https://hazelcast.com/">Normal Text Link</Link>)

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: cn(styles.normal, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      children: ['Normal Text Link', undefined],
    })
  })

  it('Renders normal Link with Icon with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
        Normal Text Link with Icon
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toMatchObject({
      className: cn(styles.normal, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
    })

    expect(anchor.text()).toBe('Normal Text Link with Icon')
    expect(anchor.find(Icon).props()).toEqual({
      icon: ChevronRight,
      ariaLabel: 'Chevron right',
      size: 'normal',
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
      className: cn(styles.small, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      children: ['Small Link', undefined],
    })
  })

  it('Renders small Link with Icon with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link size="small" icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
        Small Text Link with Icon
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toMatchObject({
      className: cn(styles.small, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
    })

    expect(anchor.text()).toBe('Small Text Link with Icon')
    expect(anchor.find(Icon).props()).toEqual({
      icon: ChevronRight,
      ariaLabel: 'Chevron right',
      size: 'small',
    })
  })

  it('Renders a secondary normal Link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(<Link kind="secondary" href="https://hazelcast.com/">Normal Text Link</Link>)

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: cn(styles.normal, styles.secondary),
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      children: ['Normal Text Link', undefined],
    })
  })

})
