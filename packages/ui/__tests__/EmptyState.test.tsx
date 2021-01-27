import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { Figma } from '@icons-pack/react-simple-icons'
import React from 'react'
import cn from 'classnames'

import { LinkRel } from '../src/Link'
import { EmptyState } from '../src/EmptyState'
import { ChevronRight } from 'react-feather'

import styles from '../src/EmptyState.module.scss'

// Common
const title = 'Figma'
const description =
  'Figma is a vector graphics editor and prototyping tool, with additional offline features enabled by desktop applications for macOS and Windows.'
// Icon
const icon = Figma
const iconLabel = 'Icon Figma'
// Action
const action = 'Cool!'
const actionHref = ''
const actionTarget = '_blank'
const actionRel: LinkRel[] = ['noopener', 'noreferrer']

describe('EmptyState', () => {
  it('Renders', async () => {
    const actionOnClick = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <EmptyState title={title} icon={icon} iconLabel={iconLabel} action={action} actionOnClick={actionOnClick} />,
    )

    expect(wrapper.findDataTest('empty-state-container').prop('className')).toBe(cn(styles.container))
    expect(wrapper.findDataTest('empty-state-icon').props()).toMatchObject({
      icon,
      ariaLabel: iconLabel,
      size: 'large',
    })
    expect(wrapper.findDataTest('empty-state-title').text()).toBe(title)
    expect(wrapper.existsDataTest('empty-state-description')).toBeFalsy()
    expect(wrapper.existsDataTest('empty-state-link')).toBeFalsy()
    expect(wrapper.findDataTest('empty-state-button').at(0).props()).toMatchObject({
      onClick: actionOnClick,
    })
  })

  it('Renders description', async () => {
    const actionOnClick = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <EmptyState
        title={title}
        icon={icon}
        description={description}
        iconLabel={iconLabel}
        action={action}
        actionOnClick={actionOnClick}
      />,
    )

    expect(wrapper.findDataTest('empty-state-container').prop('className')).toBe(cn(styles.container))
    expect(wrapper.findDataTest('empty-state-icon').props()).toMatchObject({
      icon,
      ariaLabel: iconLabel,
      size: 'large',
    })
    expect(wrapper.findDataTest('empty-state-title').text()).toBe(title)
    expect(wrapper.findDataTest('empty-state-description').text()).toBe(description)
    expect(wrapper.existsDataTest('empty-state-link')).toBeFalsy()
    expect(wrapper.findDataTest('empty-state-button').at(0).props()).toMatchObject({
      onClick: actionOnClick,
    })
  })

  it('Renders large size', async () => {
    const actionOnClick = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <EmptyState title={title} icon={icon} size="large" iconLabel={iconLabel} action={action} actionOnClick={actionOnClick} />,
    )

    expect(wrapper.findDataTest('empty-state-container').prop('className')).toBe(cn(styles.container, styles.large))
    expect(wrapper.findDataTest('empty-state-icon').props()).toMatchObject({
      icon,
      ariaLabel: iconLabel,
      size: 'xlarge',
    })
    expect(wrapper.findDataTest('empty-state-title').text()).toBe(title)
    expect(wrapper.existsDataTest('empty-state-description')).toBeFalsy()
    expect(wrapper.existsDataTest('empty-state-link')).toBeFalsy()
    expect(wrapper.findDataTest('empty-state-button').at(0).props()).toMatchObject({
      onClick: actionOnClick,
    })
  })

  it('Renders horizontal', async () => {
    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.findDataTest('empty-state-container').prop('className')).toBe(cn(styles.container, styles.horizontal))
    expect(wrapper.findDataTest('empty-state-icon').props()).toMatchObject({
      icon,
      ariaLabel: iconLabel,
      size: 'large',
    })
    expect(wrapper.findDataTest('empty-state-title').text()).toBe(title)
    expect(wrapper.existsDataTest('empty-state-description')).toBeFalsy()
    expect(wrapper.findDataTest('empty-state-link').props()).toMatchObject({
      icon: ChevronRight,
      ariaLabel: 'Icon Chevron Right',
      href: actionHref,
      target: actionTarget,
      rel: actionRel,
      size: 'small',
    })
    expect(wrapper.existsDataTest('empty-state-button')).toBeFalsy()
  })
})
