import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { ChevronRight } from 'react-feather'

import { Link } from '../src/Link'
import { Tooltip } from '../src/Tooltip'
import { Icon } from '../src/Icon'

import styles from '../src/Link.module.scss'

describe('Link', () => {
  it('Renders the default Link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link type="primary" href="https://hazelcast.com/">
        Primary Link
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: styles.primary,
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      children: 'Primary Link',
    })

    expect(anchor.find('span').find(Icon).exists()).toBeFalsy()
  })

  it('Renders the standalone link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link type="primary" standalone href="https://hazelcast.com/">
        Primary Link
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toMatchObject({
      className: styles.primary,
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
    })

    expect(anchor.find('span').text()).toBe('Primary Link')

    expect(anchor.find('span').find(Icon).props()).toEqual({
      ariaLabel: 'Link',
      icon: ChevronRight,
    })
  })

  it('Renders the Tooltip with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link type="tooltip" tooltip="Check our website" href="https://hazelcast.com/">
        Tooltip Link
      </Link>,
    )

    const tooltip = wrapper.find(Tooltip)

    expect(tooltip.props()).toMatchObject({
      placement: 'top',
      overlay: 'Check our website',
    })

    const anchor = tooltip.find('a')
    // We use toMatchObject here because Tooltip injects additional props into its child
    expect(anchor.props()).toMatchObject({
      className: styles.tooltip,
      href: 'https://hazelcast.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      children: 'Tooltip Link',
    })

    expect(anchor.find('span').find(Icon).exists()).toBeFalsy()
  })
})
