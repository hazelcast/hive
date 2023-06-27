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
      className: cn(styles.link, styles.normal, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener',
      target: '_self',
      'data-test': 'link',
      children: ['Normal Text Link', undefined],
      onClick: undefined,
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
      className: cn(styles.link, styles.normal, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener',
      target: '_self',
    })

    expect(anchor.text()).toBe('Normal Text Link with Icon')
    expect(anchor.find(Icon).props()).toEqual({
      icon: ChevronRight,
      ariaLabel: 'Chevron right',
      size: 'medium',
      bold: false,
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
      className: cn(styles.link, styles.small, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener',
      target: '_self',
      'data-test': 'link',
      children: ['Small Link', undefined],
      onClick: undefined,
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
      className: cn(styles.link, styles.small, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'noopener',
      target: '_self',
      onClick: undefined,
    })

    expect(anchor.text()).toBe('Small Text Link with Icon')
    expect(anchor.find(Icon).props()).toEqual({
      icon: ChevronRight,
      ariaLabel: 'Chevron right',
      size: 'small',
      bold: false,
    })
  })

  it('Renders bold Link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link bold href="https://hazelcast.com/">
        Bold Link
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: cn(styles.link, styles.normal, styles.primary, styles.bold),
      href: 'https://hazelcast.com/',
      rel: 'noopener',
      target: '_self',
      'data-test': 'link',
      children: ['Bold Link', undefined],
      onClick: undefined,
    })
  })

  it('Renders bold Link with Icon with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link bold icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
        Bold Text Link with Icon
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toMatchObject({
      className: cn(styles.link, styles.normal, styles.primary, styles.bold),
      href: 'https://hazelcast.com/',
      rel: 'noopener',
      target: '_self',
      onClick: undefined,
    })

    expect(anchor.text()).toBe('Bold Text Link with Icon')
    expect(anchor.find(Icon).props()).toEqual({
      icon: ChevronRight,
      ariaLabel: 'Chevron right',
      bold: true,
      size: 'medium',
    })
  })

  it('Renders a secondary normal Link with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link kind="secondary" href="https://hazelcast.com/">
        Normal Text Link
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: cn(styles.link, styles.normal, styles.secondary),
      href: 'https://hazelcast.com/',
      rel: 'noopener',
      target: '_self',
      'data-test': 'link',
      children: ['Normal Text Link', undefined],
    })
  })

  it('Allows custom rel and target', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Link href="https://hazelcast.com/" rel={['help', 'noreferrer']} target="_parent">
        Normal Text Link
      </Link>,
    )

    const anchor = wrapper.find('a')
    expect(anchor.props()).toEqual({
      className: cn(styles.link, styles.normal, styles.primary),
      href: 'https://hazelcast.com/',
      rel: 'help noreferrer',
      target: '_parent',
      'data-test': 'link',
      children: ['Normal Text Link', undefined],
    })
  })

  it('Renders Link with button semantics', async () => {
    const onClick = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Link component="button" onClick={onClick}>
        Normal Text Link
      </Link>,
    )

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('Renders Link with button semantics, proper props are passed to a button', async () => {
    const onClick = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Link component="button" onClick={onClick}>
        Normal Text Link
      </Link>,
    )

    const props = wrapper.find('button').props()
    expect(props).toHaveProperty('onClick', onClick)
    expect(props).not.toHaveProperty('rel')
    expect(props).not.toHaveProperty('target')
  })
})
